export interface Source {
  title: string;
  url: string;
}

export interface DebatePosition {
  argument: string;
  perspective: string;
}

export interface VerifyResponse {
  claim: string;
  verdict: string;
  confidence: number;
  conclusion: string;
  sources?: Source[];
  debate?: DebatePosition[];
  questions?: string[];
  agreement_score?: number;
  evidence_strength?: number;
  consistency_score?: number;
}

export interface HistoryEntry {
  id: string;
  claim: string;
  verdict: string;
  confidence: number;
  conclusion: string;
  createdAt: string;
  sources?: Source[];
}
