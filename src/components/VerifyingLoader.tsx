import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"

const catchphrases = [
  "Fetching resources from NASA…",
  "Asking the Illuminati for confirmation…",
  "Calling Mr. Donald Trump for more info…",
  "Checking WhatsApp University archives…",
  "Verifying vibes vs facts…",
  "Asking Elon Musk if this is real…",
  "Teaching AI to not believe everything…",
  "Running lie detectors on text…",
  "Consulting the shadow government…",
  "Googling harder than your relatives did…",
  "Looking for receipts 🧾",
  'Checking if this came from "source: trust me bro"',
  "Applying common sense (beta feature)",
  "Asking journalists who read sources…",
  "Checking if context went missing…",
  "Detecting fake news particles…",
  "Asking world leaders politely…",
  "Making sure this isn't rage-bait…",
  "Verifying before it goes viral…",
  'Asking the AI: "are you sure?"',
  "Cross-checking multiple realities…",
  "Checking if this aged badly…",
  "Separating facts from feelings…",
  "Calling experts, not influencers…",
  "Fact-checking before outrage…",
  "Searching for actual evidence…",
  "Reading beyond the headline…",
  "Protecting you from misinformation…",
  "Running logic.exe…",
  "Truth loading… please wait",
  "Debunking at unsafe speeds…",
  "Checking if this was taken out of context…",
  "Confirming with credible sources…",
  "Asking secret underground sources…",
  "Asking pigeons to verify facts…",
  "Almost there… uncovering the truth",
  "Because facts > drama",
  "Loading facts, not rumours",
  'Asking "many people" who are "saying this"…',
]

export function VerifyingLoader() {
  const [currentPhrase, setCurrentPhrase] = useState("")
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set())

  useEffect(() => {
    const getRandomPhrase = () => {
      let availableIndices = catchphrases
        .map((_, i) => i)
        .filter((i) => !usedIndices.has(i))

      if (availableIndices.length === 0) {
        setUsedIndices(new Set())
        availableIndices = catchphrases.map((_, i) => i)
      }

      const randomIndex =
        availableIndices[Math.floor(Math.random() * availableIndices.length)]
      setUsedIndices((prev) => new Set([...prev, randomIndex]))
      return catchphrases[randomIndex]
    }

    setCurrentPhrase(getRandomPhrase())

    const interval = setInterval(() => {
      setCurrentPhrase(getRandomPhrase())
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative p-8 md:p-12 rounded-3xl bg-card/80 border border-border backdrop-blur-xl overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-pulse" />
        
        {/* Spinning orb container */}
        <div className="relative flex flex-col items-center gap-8">
          {/* Main loader orb */}
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 rounded-full border-4 border-border border-t-primary"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl animate-pulse" />
          </div>

          {/* Catchphrase */}
          <div className="h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPhrase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-lg md:text-xl text-center text-muted-foreground font-medium px-4"
              >
                {currentPhrase}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-3 h-3 rounded-full bg-primary"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
