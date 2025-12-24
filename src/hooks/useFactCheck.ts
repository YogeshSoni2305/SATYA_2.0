

import { useState, useRef } from "react"

/* Match EXACT backend response */
export interface FactCheckResponse {
  claim: string
  verdict: string
  confidence: number
  conclusion: string
  sources: {
    title: string
    url: string
  }[]
}

interface ApiResponse {
  status: string
  results: FactCheckResponse[]
}

interface UseFactCheckReturn {
  result: FactCheckResponse | null
  isLoading: boolean
  error: string | null
  checkFact: (text: string) => Promise<void>
  reset: () => void
}

const MIN_LOADING_TIME = 3000 // 3 seconds

export function useFactCheck(): UseFactCheckReturn {
  const [result, setResult] = useState<FactCheckResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const startTimeRef = useRef<number>(0)

  const checkFact = async (text: string) => {
    setIsLoading(true)
    setError(null)
    setResult(null)
    startTimeRef.current = Date.now()

    try {
      const formData = new FormData()
      formData.append("text", text)

      const response = await fetch(
        "https://satya-pdiq.onrender.com/fact-check",
      
        {
          method: "POST",
          body: formData
        }
      )

      if (!response.ok) {
        const errText = await response.text()
        throw new Error(`Server error ${response.status}: ${errText}`)
      }

      const data: ApiResponse = await response.json()
      console.log("API RESPONSE:", data)

      if (data.results?.length > 0) {
        setResult(data.results[0])
      } else {
        setError("No verifiable claims found")
      }

    } catch (err) {
      console.error("FACT CHECK ERROR:", err)
      setError(
        err instanceof Error
          ? err.message
          : "Failed to check fact"
      )
    } finally {
      const elapsed = Date.now() - startTimeRef.current
      const remaining = MIN_LOADING_TIME - elapsed
      if (remaining > 0) {
        await new Promise(res => setTimeout(res, remaining))
      }
      setIsLoading(false)
    }
  }

  const reset = () => {
    setResult(null)
    setError(null)
  }

  return { result, isLoading, error, checkFact, reset }
}
