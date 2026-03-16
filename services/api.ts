import { VerifyResponse, HistoryEntry } from "../types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function verifyClaim(text: string, token: string | null): Promise<VerifyResponse> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/verify`, {
    method: "POST",
    headers,
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized: Please sign in to verify claims.");
    }
    if (response.status === 422) {
      throw new Error("Invalid request: Please provide a valid claim text.");
    }
    if (response.status >= 500) {
      throw new Error("Satya server error: Our AI is currently busy, please try again later.");
    }
    const errText = await response.text();
    throw new Error(`Error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  if (data.results && Array.isArray(data.results)) {
    return data.results[0];
  }
  return data;
}

export async function getHistory(token: string | null): Promise<HistoryEntry[]> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/history`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized: Please sign in to view history.");
    }
    const errText = await response.text();
    throw new Error(`Error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : data.results || [];
}

