"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface OrbInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  isLoading?: boolean
  className?: string
}

export function OrbInput({ value, onChange, onSubmit, isLoading = false, className }: OrbInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const placeholders = useMemo(
    () => [
      "Enter a claim to fact-check...",
      "Is this statement true?",
      "Verify any claim instantly...",
      "Paste text to analyze...",
    ],
    []
  )

  const CHAR_DELAY = 75
  const IDLE_DELAY_AFTER_FINISH = 2200

  const intervalRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    const current = placeholders[placeholderIndex]
    if (!current) {
      setDisplayedText("")
      setIsTyping(false)
      return
    }

    const chars = Array.from(current)
    setDisplayedText("")
    setIsTyping(true)

    let charIndex = 0

    intervalRef.current = window.setInterval(() => {
      if (charIndex < chars.length) {
        const next = chars.slice(0, charIndex + 1).join("")
        setDisplayedText(next)
        charIndex += 1
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        setIsTyping(false)

        timeoutRef.current = window.setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
        }, IDLE_DELAY_AFTER_FINISH)
      }
    }, CHAR_DELAY)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [placeholderIndex, placeholders])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSubmit && value.trim()) {
      onSubmit()
    }
  }

  return (
    <div className={cn("relative w-full max-w-3xl mx-auto", className)}>
      <div
        className={cn(
          "flex items-center gap-4 p-4 md:p-6 bg-card/80 backdrop-blur-xl transition-all duration-300 ease-out rounded-full border border-border",
          isFocused ? "shadow-xl scale-[1.02] border-primary/50 box-glow-primary" : "shadow-lg",
          isLoading && "opacity-80"
        )}
      >
        <div className="relative flex-shrink-0">
          <div className={cn(
            "w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden transition-all duration-300",
            isLoading && "animate-pulse-glow"
          )}>
            <div className="w-full h-full bg-gradient-to-br from-primary via-accent to-primary rounded-full animate-glow-pulse" 
                 style={{
                   background: `radial-gradient(circle at 30% 30%, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))`,
                 }} 
            />
          </div>
        </div>

        <div className="w-px h-10 md:h-12 bg-border" />

        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder={`${displayedText}${isTyping ? "|" : ""}`}
            aria-label="Enter claim to fact-check"
            className="w-full text-base md:text-xl text-foreground placeholder-muted-foreground bg-transparent border-none outline-none font-light disabled:opacity-50"
          />
        </div>

        {value.trim() && (
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="flex-shrink-0 px-4 md:px-6 py-2 md:py-3 bg-primary text-primary-foreground font-medium rounded-full hover:opacity-90 transition-all disabled:opacity-50"
          >
            {isLoading ? "Checking..." : "Verify"}
          </button>
        )}
      </div>
    </div>
  )
}

export default OrbInput
