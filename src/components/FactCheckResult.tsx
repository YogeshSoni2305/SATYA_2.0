import { motion } from "framer-motion"
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FactCheckResponse {
  verdict: "true" | "false" | "partially_true" | "unverifiable"
  confidence: number
  explanation: string
  sources?: string[]
}

interface FactCheckResultProps {
  result: FactCheckResponse
  claim: string
}

const verdictConfig = {
  true: {
    icon: CheckCircle,
    label: "Verified True",
    colorClass: "text-success",
    bgClass: "bg-success/10",
    borderClass: "border-success/30",
    glowClass: "box-glow-success",
  },
  false: {
    icon: XCircle,
    label: "False",
    colorClass: "text-destructive",
    bgClass: "bg-destructive/10",
    borderClass: "border-destructive/30",
    glowClass: "box-glow-destructive",
  },
  partially_true: {
    icon: AlertTriangle,
    label: "Partially True",
    colorClass: "text-warning",
    bgClass: "bg-warning/10",
    borderClass: "border-warning/30",
    glowClass: "box-glow-warning",
  },
  unverifiable: {
    icon: Info,
    label: "Unverifiable",
    colorClass: "text-muted-foreground",
    bgClass: "bg-muted/50",
    borderClass: "border-border",
    glowClass: "",
  },
}

export function FactCheckResult({ result, claim }: FactCheckResultProps) {
  const config = verdictConfig[result.verdict]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "w-full max-w-3xl mx-auto rounded-2xl border p-6 md:p-8 backdrop-blur-xl",
        config.bgClass,
        config.borderClass,
        config.glowClass
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className={cn("p-3 rounded-xl", config.bgClass)}>
          <Icon className={cn("w-8 h-8", config.colorClass)} />
        </div>
        <div className="flex-1">
          <h3 className={cn("text-2xl font-heading font-bold", config.colorClass)}>
            {config.label}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Confidence: {Math.round(result.confidence * 100)}%
          </p>
        </div>
      </div>

      {/* Original Claim */}
      <div className="mb-6 p-4 rounded-xl bg-background/50 border border-border">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
          Analyzed Claim
        </p>
        <p className="text-foreground font-medium">{claim}</p>
      </div>

      {/* Explanation */}
      <div className="mb-6">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
          Analysis
        </p>
        <p className="text-foreground/90 leading-relaxed">{result.explanation}</p>
      </div>

      {/* Sources */}
      {result.sources && result.sources.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
            Sources
          </p>
          <ul className="space-y-2">
            {result.sources.map((source, index) => (
              <li key={index}>
                <a
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm break-all"
                >
                  {source}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  )
}
