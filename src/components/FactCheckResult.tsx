// import { motion } from "framer-motion"
// import { CheckCircle, XCircle, AlertTriangle, Info, ExternalLink, Copy, Check } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { useState } from "react"

// export interface FactCheckResponse {
//   verdict: "true" | "false" | "partially_true" | "unverifiable"
//   confidence: number
//   explanation: string
//   sources?: string[]
// }

// interface FactCheckResultProps {
//   result: FactCheckResponse
//   claim: string
// }

// const verdictConfig = {
//   true: {
//     icon: CheckCircle,
//     label: "Verified True",
//     colorClass: "text-success",
//     bgClass: "bg-success/10",
//     borderClass: "border-success/30",
//     gradientClass: "from-success/20 to-transparent",
//   },
//   false: {
//     icon: XCircle,
//     label: "False",
//     colorClass: "text-destructive",
//     bgClass: "bg-destructive/10",
//     borderClass: "border-destructive/30",
//     gradientClass: "from-destructive/20 to-transparent",
//   },
//   partially_true: {
//     icon: AlertTriangle,
//     label: "Partially True",
//     colorClass: "text-warning",
//     bgClass: "bg-warning/10",
//     borderClass: "border-warning/30",
//     gradientClass: "from-warning/20 to-transparent",
//   },
//   unverifiable: {
//     icon: Info,
//     label: "Unverifiable",
//     colorClass: "text-muted-foreground",
//     bgClass: "bg-muted/50",
//     borderClass: "border-border",
//     gradientClass: "from-muted/30 to-transparent",
//   },
// }

// export function FactCheckResult({ result, claim }: FactCheckResultProps) {
//   const config = verdictConfig[result.verdict]
//   const Icon = config.icon
//   const [copied, setCopied] = useState(false)

//   const handleCopy = () => {
//     navigator.clipboard.writeText(`Claim: ${claim}\nVerdict: ${config.label}\nConfidence: ${Math.round(result.confidence * 100)}%\nExplanation: ${result.explanation}`)
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2000)
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//       className={cn(
//         "w-full max-w-3xl mx-auto rounded-3xl border-2 overflow-hidden backdrop-blur-xl bg-card/80",
//         config.borderClass
//       )}
//     >
//       {/* Gradient Header */}
//       <div className={cn("relative p-6 md:p-8 bg-gradient-to-br", config.gradientClass)}>
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80" />
        
//         <div className="relative flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//               className={cn("p-4 rounded-2xl shadow-lg", config.bgClass)}
//             >
//               <Icon className={cn("w-10 h-10", config.colorClass)} />
//             </motion.div>
//             <div>
//               <motion.h3
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className={cn("text-3xl font-heading font-bold", config.colorClass)}
//               >
//                 {config.label}
//               </motion.h3>
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.4 }}
//                 className="flex items-center gap-2 mt-1"
//               >
//                 <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
//                   <motion.div
//                     initial={{ width: 0 }}
//                     animate={{ width: `${result.confidence * 100}%` }}
//                     transition={{ delay: 0.5, duration: 0.8 }}
//                     className={cn("h-full rounded-full", config.colorClass.replace("text-", "bg-"))}
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-muted-foreground">
//                   {Math.round(result.confidence * 100)}% confident
//                 </span>
//               </motion.div>
//             </div>
//           </div>
          
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleCopy}
//             className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
//           >
//             {copied ? (
//               <Check className="w-5 h-5 text-success" />
//             ) : (
//               <Copy className="w-5 h-5 text-muted-foreground" />
//             )}
//           </motion.button>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-6 md:p-8 space-y-6">
//         {/* Original Claim */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="p-4 rounded-2xl bg-secondary/50 border border-border"
//         >
//           <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
//             Analyzed Claim
//           </p>
//           <p className="text-foreground font-medium leading-relaxed">{claim}</p>
//         </motion.div>

//         {/* Explanation */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//         >
//           <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
//             Analysis
//           </p>
//           <p className="text-muted-foreground leading-relaxed text-lg">{result.explanation}</p>
//         </motion.div>

//         {/* Sources */}
//         {result.sources && result.sources.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//           >
//             <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
//               Sources ({result.sources.length})
//             </p>
//             <div className="space-y-2">
//               {result.sources.map((source, index) => (
//                 <motion.a
//                   key={index}
//                   href={source}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.7 + index * 0.1 }}
//                   className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-border hover:border-primary/30 transition-all group"
//                 >
//                   <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
//                   <span className="text-sm text-foreground truncate group-hover:text-primary transition-colors">
//                     {source}
//                   </span>
//                 </motion.a>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   )
// }






import { motion } from "framer-motion"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

/* ✅ Match BACKEND exactly */
export interface FactCheckResponse {
  claim: string
  verdict: string
  confidence: number
  conclusion: string
  sources?: {
    title: string
    url: string
  }[]
}

interface FactCheckResultProps {
  result: FactCheckResponse
}

/* ✅ Verdict config (lowercase keys) */
const verdictConfig = {
  true: {
    icon: CheckCircle,
    label: "Verified True",
    colorClass: "text-success",
    bgClass: "bg-success/10",
    borderClass: "border-success/30",
    gradientClass: "from-success/20 to-transparent",
  },
  false: {
    icon: XCircle,
    label: "False",
    colorClass: "text-destructive",
    bgClass: "bg-destructive/10",
    borderClass: "border-destructive/30",
    gradientClass: "from-destructive/20 to-transparent",
  },
  partially_true: {
    icon: AlertTriangle,
    label: "Partially True",
    colorClass: "text-warning",
    bgClass: "bg-warning/10",
    borderClass: "border-warning/30",
    gradientClass: "from-warning/20 to-transparent",
  },
  unverifiable: {
    icon: Info,
    label: "Unverifiable",
    colorClass: "text-muted-foreground",
    bgClass: "bg-muted/50",
    borderClass: "border-border",
    gradientClass: "from-muted/30 to-transparent",
  },
} as const

export function FactCheckResult({ result }: FactCheckResultProps) {
  /* ✅ Normalize verdict + SAFE fallback */
  const normalizedVerdict =
    result.verdict?.toLowerCase() ?? "unverifiable"

  const config =
    verdictConfig[
      normalizedVerdict as keyof typeof verdictConfig
    ] ?? verdictConfig.unverifiable

  const Icon = config.icon
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Claim: ${result.claim}
Verdict: ${config.label}
Confidence: ${Math.round(result.confidence * 100)}%
Conclusion: ${result.conclusion}`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "w-full max-w-3xl mx-auto rounded-3xl border-2 overflow-hidden backdrop-blur-xl bg-card/80",
        config.borderClass
      )}
    >
      {/* Header */}
      <div className={cn("relative p-6 md:p-8 bg-gradient-to-br", config.gradientClass)}>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn("p-4 rounded-2xl shadow-lg", config.bgClass)}>
              <Icon className={cn("w-10 h-10", config.colorClass)} />
            </div>
            <div>
              <h3 className={cn("text-3xl font-bold", config.colorClass)}>
                {config.label}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {Math.round(result.confidence * 100)}% confident
              </p>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
          >
            {copied ? (
              <Check className="w-5 h-5 text-success" />
            ) : (
              <Copy className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Claim */}
        <div className="p-4 rounded-2xl bg-secondary/50 border border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
            Analyzed Claim
          </p>
          <p className="text-foreground font-medium">{result.claim}</p>
        </div>

        {/* Conclusion */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">
            Analysis
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {result.conclusion}
          </p>
        </div>

        {/* Sources */}
        {result.sources && result.sources.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">
              Sources ({result.sources.length})
            </p>
            <div className="space-y-2">
              {result.sources.map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-border transition"
                >
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm truncate">{src.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
