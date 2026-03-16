"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Zap, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import { Particles } from "@/components/ui/particles"
import { OrbInput } from "@/components/ui/orb-input"
import { FactCheckResult } from "@/components/FactCheckResult"
import { VerifyingLoader } from "@/components/VerifyingLoader"
import { useFactCheck } from "@/hooks/useFactCheck"
import { useAuth, useClerk, SignInButton, Show } from "@clerk/nextjs"

const features = [
  {
    icon: Shield,
    title: "Verified Sources",
    description: "Cross-referenced with trusted databases and fact-checking organizations.",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Get results in seconds with our advanced AI-powered verification.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Fact-check claims from around the world in multiple languages.",
  },
]

const Index = () => {
  const [inputValue, setInputValue] = useState("")
  const [submittedClaim, setSubmittedClaim] = useState("")
  const { result, isLoading, error, checkFact, reset } = useFactCheck()
  const { theme } = useTheme()
  const { isLoaded } = useAuth()
  const { openSignIn } = useClerk()

  useEffect(() => {
    console.log("CLERK AUTH STATE:", { isLoaded });
  }, [isLoaded]);

  const handleSubmit = async () => {
    if (inputValue.trim()) {
      setSubmittedClaim(inputValue)
      await checkFact(inputValue)
    }
  }

  const handleNewCheck = () => {
    setInputValue("")
    setSubmittedClaim("")
    reset()
  }

  const particleColor = theme === "dark" ? "#ffffff" : "#000000"

  return (
    <div className="relative min-h-screen overflow-hidden bg-background transition-colors duration-300">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={100}
        staticity={50}
        ease={50}
        color={particleColor}
        size={0.4}
      />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-32">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <AnimatePresence mode="wait">
            {!isLoading && !result && (
              <motion.div
                key="hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6">
                  <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-center font-semibold leading-none text-transparent">
                    Satya 2.0
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Combat misinformation with AI-powered fact-checking.
                  Enter any claim and get verified results in seconds.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Section - Only for SignedIn users */}
          <AnimatePresence mode="wait">
            {!isLoading && !result && (
              <motion.div
                key="input-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-30 mb-8 w-full max-w-lg mx-auto"
              >
                {isLoaded ? (
                  <>
                    <Show when="signed-in">
                      <OrbInput
                        value={inputValue}
                        onChange={setInputValue}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                      />
                    </Show>
                    <Show when="signed-out">
                      <div className="p-12 rounded-3xl bg-card border border-border shadow-xl backdrop-blur-md">
                        <Shield className="w-12 h-12 mx-auto mb-4 text-primary opacity-50" />
                        <h2 className="text-2xl font-bold mb-3">Sign in to start verifying</h2>
                        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                          Satya 2.0 requires authentication to provide secure, personalized fact-checking results.
                        </p>
                        <SignInButton mode="modal" />
                      </div>
                    </Show>
                  </>
                ) : (
                  <div className="h-40 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>



          {/* Loading State */}
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-8"
              >
                <VerifyingLoader />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          {error && !result && !isLoading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-destructive text-sm mb-4"
            >
              {error}
            </motion.p>
          )}

          {/* Result Section */}
          <AnimatePresence mode="wait">
            {result && !isLoading && (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-8"
              >
                <FactCheckResult result={result} claim={submittedClaim} />
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={handleNewCheck}
                  className="mt-8 px-8 py-4 text-base font-semibold text-primary-foreground bg-primary rounded-full hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
                >
                  Check Another Claim
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>


          {/* Features Section - Only show when no result and not loading */}
          <AnimatePresence mode="wait">
            {!result && !isLoading && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm hover:border-primary/30 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                      <feature.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-0 py-6 text-center pointer-events-none">
        <p className="text-xs text-muted-foreground">
          Powered by AI • Verified by humans • Built for truth
        </p>
      </footer>
    </div>
  )
}

export default Index
