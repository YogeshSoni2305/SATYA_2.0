"use client"

import { motion } from "framer-motion"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  ExternalLink,
  Copy,
  Check,
  Scale,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { VerifyResponse } from "@/types/api"

export interface FactCheckResultProps {
  result: VerifyResponse
  claim?: string // Accommodate the current Index.tsx usage
}

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

export function FactCheckResult({ result, claim }: FactCheckResultProps) {
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
      `Claim: ${result.claim || claim}
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
        "w-full max-w-3xl mx-auto rounded-3xl border-2 overflow-hidden backdrop-blur-xl bg-card/80 text-left",
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
            title="Copy Result"
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
        
        {/* Scores */}
        {(result.agreement_score !== undefined || result.evidence_strength !== undefined || result.consistency_score !== undefined) && (
          <div className="grid grid-cols-3 gap-4">
             {result.agreement_score !== undefined && (
               <div className="p-4 rounded-xl bg-secondary/30 border border-border text-center">
                 <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Agreement</p>
                 <p className="text-xl font-bold">{Math.round(result.agreement_score * 100)}%</p>
               </div>
             )}
             {result.evidence_strength !== undefined && (
               <div className="p-4 rounded-xl bg-secondary/30 border border-border text-center">
                 <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Evidence</p>
                 <p className="text-xl font-bold">{Math.round(result.evidence_strength * 100)}%</p>
               </div>
             )}
             {result.consistency_score !== undefined && (
               <div className="p-4 rounded-xl bg-secondary/30 border border-border text-center">
                 <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Consistency</p>
                 <p className="text-xl font-bold">{Math.round(result.consistency_score * 100)}%</p>
               </div>
             )}
          </div>
        )}

        {/* Claim */}
        <div className="p-4 rounded-2xl bg-secondary/50 border border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
            Analyzed Claim
          </p>
          <p className="text-foreground font-medium break-words whitespace-pre-wrap overflow-hidden">{result.claim || claim}</p>
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

        {/* Debate */}
        {result.debate && result.debate.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-3 flex items-center gap-2">
              <Scale className="w-4 h-4" /> Debate
            </p>
            <div className="space-y-3">
              {result.debate.map((pos, i) => (
                <div key={i} className="p-4 rounded-xl bg-secondary/30 border border-border">
                  <p className="text-sm font-semibold mb-1 text-foreground/90">{pos.perspective}</p>
                  <p className="text-sm text-muted-foreground">{pos.argument}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Questions */}
        {result.questions && result.questions.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4" /> Remaining Questions
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {result.questions.map((q, i) => (
                <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                  <span className="text-primary mt-1">•</span> <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

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
