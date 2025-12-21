import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Zap, Globe, Home, Info, History } from "lucide-react"
import { Particles } from "@/components/ui/particles"
import { OrbInput } from "@/components/ui/orb-input"
import { NavBar } from "@/components/ui/navbar"
import { FactCheckResult } from "@/components/FactCheckResult"
import { useFactCheck } from "@/hooks/useFactCheck"

const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "About", url: "/about", icon: Info },
  { name: "History", url: "/history", icon: History },
]

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

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={120}
        staticity={40}
        ease={60}
        color="#00d4ff"
        size={0.6}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-[1]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl z-[1]" />

      {/* Navigation */}
      <NavBar items={navItems} />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-32">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6">
              <span className="text-foreground">Verify </span>
              <span className="gradient-text">Truth</span>
              <span className="text-foreground"> Instantly</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Combat misinformation with AI-powered fact-checking. 
              Enter any claim and get verified results in seconds.
            </p>
          </motion.div>

          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <OrbInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </motion.div>

          {/* Error Message */}
          {error && !result && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-destructive text-sm mb-4"
            >
              {error}
            </motion.p>
          )}

          {/* Result Section */}
          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <FactCheckResult result={result} claim={submittedClaim} />
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={handleNewCheck}
                className="mt-6 px-6 py-3 text-sm font-medium text-primary border border-primary/30 rounded-full hover:bg-primary/10 transition-colors"
              >
                Check Another Claim
              </motion.button>
            </motion.div>
          )}

          {/* Features Section - Only show when no result */}
          {!result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
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
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          Powered by AI • Verified by humans • Built for truth
        </p>
      </footer>
    </div>
  )
}

export default Index
