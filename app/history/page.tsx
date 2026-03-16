"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Particles } from "@/components/ui/particles"
import { useTheme } from "next-themes"
import { Shield, Clock, History } from "lucide-react"
import { getHistory } from "@/services/api"
import { useAuth, useClerk, SignInButton, Show } from "@clerk/nextjs"
import { HistoryEntry } from "@/types/api"

export default function HistoryPage() {
  const { theme } = useTheme()
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const { openSignIn } = useClerk()
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("CLERK HISTORY AUTH STATE:", { isLoaded, isSignedIn });
  }, [isLoaded, isSignedIn]);
  
  // Provide fallback or exact match vs Index.tsx for particles. Note: theme may initially be undefined
  const particleColor = theme === "dark" ? "#ffffff" : "#000000"

  useEffect(() => {
    async function fetchHistory() {
      if (!isLoaded || !isSignedIn) {
        setIsLoading(false)
        return
      }
      try {
        const token = await getToken();
        console.log("Token:", token)
        const data = await getHistory(token).catch(err => {
            console.warn("API Error, utilizing fallback empty list", err);
            return [];
        });
        setHistory(data);
      } catch (err) {
        console.error("HISTORY FETCH ERROR:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch history")
      } finally {
        setIsLoading(false)
      }
    }

    if (isLoaded) {
      fetchHistory()
    }
  }, [getToken, isLoaded, isSignedIn])


  return (
    <div className="relative min-h-screen overflow-hidden bg-background transition-colors duration-300">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={60}
        color={particleColor}
      />

      <main className="relative z-20 flex flex-col items-center min-h-screen px-4 pt-32 pb-32">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Check History</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              View your past verifications and stay informed with previously fact-checked claims.
            </p>
          </motion.div>

          {!isLoaded ? (
            <div className="flex justify-center mt-20">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : isSignedIn ? (
            isLoading ? (
              <div className="flex justify-center mt-20">
                <div className="animate-pulse flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 rounded-full border-4 border-border border-t-primary animate-spin" />
                  <p className="text-muted-foreground text-sm uppercase tracking-wide">Loading history...</p>
                </div>
              </div>
            ) : error ? (
              <div className="p-6 text-center text-destructive bg-destructive/10 rounded-2xl border border-destructive/20 relative">
                <p>{error}</p>
              </div>
            ) : history.length === 0 ? (
              <div className="text-center p-12 bg-card/10 rounded-2xl border border-border backdrop-blur-sm">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No history found</h3>
                <p className="text-muted-foreground">You haven't checked any claims yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {history.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-card/60 border border-border rounded-2xl backdrop-blur-md"
                  >
                    <p className="text-xs font-semibold text-muted-foreground mb-2">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-lg font-medium mb-3">{item.claim}</p>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase">
                        {item.verdict}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        {Math.round(item.confidence * 100)}% confident
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )
          ) : (
            <>
              <Show when="signed-in">
                {isLoading ? (
                  <div className="flex justify-center mt-20">
                    <div className="animate-pulse flex flex-col items-center space-y-4">
                      <div className="w-12 h-12 rounded-full border-4 border-border border-t-primary animate-spin" />
                      <p className="text-muted-foreground text-sm uppercase tracking-wide">Loading history...</p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="p-6 text-center text-destructive bg-destructive/10 rounded-2xl border border-destructive/20 relative">
                    <p>{error}</p>
                  </div>
                ) : history.length === 0 ? (
                  <div className="text-center p-12 bg-card/10 rounded-2xl border border-border backdrop-blur-sm">
                    <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">No history found</h3>
                    <p className="text-muted-foreground">You haven't checked any claims yet.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {history.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 bg-card/60 border border-border rounded-2xl backdrop-blur-md"
                      >
                        <p className="text-xs font-semibold text-muted-foreground mb-2">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-lg font-medium mb-3">{item.claim}</p>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase">
                            {item.verdict}
                          </span>
                          <span className="text-sm font-medium text-muted-foreground">
                            {Math.round(item.confidence * 100)}% confident
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </Show>
              <Show when="signed-out">
                <div className="text-center p-12 bg-card/10 rounded-3xl border border-border backdrop-blur-md">
                  <History className="h-16 w-16 mx-auto mb-6 text-muted-foreground opacity-30" />
                  <h2 className="text-3xl font-bold mb-4">View your history</h2>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Sign in to see all your past AI-verified fact checks and track trends over time.
                  </p>
                  <SignInButton mode="modal" />
                </div>
              </Show>
            </>
          )}


        </div>
      </main>
    </div>
  )
}
