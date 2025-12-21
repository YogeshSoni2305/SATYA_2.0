import { useState } from "react"
import { FactCheckResponse } from "@/components/FactCheckResult"

interface UseFactCheckReturn {
  result: FactCheckResponse | null
  isLoading: boolean
  error: string | null
  checkFact: (text: string) => Promise<void>
  reset: () => void
}

export function useFactCheck(): UseFactCheckReturn {
  const [result, setResult] = useState<FactCheckResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkFact = async (text: string) => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append("text", text)

      const response = await fetch("http://localhost:8000/fact-check", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to check fact"
      setError(errorMessage)
      
      // For demo purposes, show a mock result when the API is unavailable
      if (errorMessage.includes("Failed to fetch") || errorMessage.includes("NetworkError")) {
        setError("API unavailable - showing demo result")
        setResult({
          verdict: "partially_true",
          confidence: 0.75,
          explanation: "This is a demo result. Connect to the fact-checking API at http://localhost:8000/fact-check to see real results. The API accepts POST requests with multipart/form-data containing a 'text' field.",
          sources: ["https://example.com/source1", "https://example.com/source2"],
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setResult(null)
    setError(null)
  }

  return { result, isLoading, error, checkFact, reset }
}
