"use client"

import { useState, useRef } from "react"
import { verifyClaim } from "@/services/api"
import { VerifyResponse } from "@/types/api"
import { useAuth } from "@clerk/nextjs"

const MIN_LOADING_TIME = 3000 // 3 seconds

interface UseFactCheckReturn {
  result: VerifyResponse | null
  isLoading: boolean
  error: string | null
  checkFact: (text: string) => Promise<void>
  reset: () => void
}

export function useFactCheck(): UseFactCheckReturn {
  const [result, setResult] = useState<VerifyResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const startTimeRef = useRef<number>(0)
  const { getToken, isLoaded, isSignedIn } = useAuth()

  const checkFact = async (text: string) => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setError("Please sign in to verify claims.");
      return;
    }

    setIsLoading(true)
    setError(null)
    setResult(null)
    startTimeRef.current = Date.now()

    try {
      // getToken() doesn't have a default timeout that would affect the 45s backend wait
      const token = await getToken()
      console.log("Token:", token)
      const data = await verifyClaim(text, token)
      setResult(data)
    } catch (err) {
      console.error("FACT CHECK ERROR:", err)
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while verifying the claim."
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

