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

export function OrbInput({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  className,
}: OrbInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const placeholders = useMemo(
    () => [
      "Ask anything...",
      "What's on your mind?",
      "How can I help you?",
      "What would you like to know?",
    ],
    []
  )

  const CHAR_DELAY = 75
  const IDLE_DELAY_AFTER_FINISH = 2200

  const intervalRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

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
        setDisplayedText(chars.slice(0, charIndex + 1).join(""))
        charIndex++
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current)

        setIsTyping(false)

        timeoutRef.current = window.setTimeout(() => {
          setPlaceholderIndex((p) => (p + 1) % placeholders.length)
        }, IDLE_DELAY_AFTER_FINISH)
      }
    }, CHAR_DELAY)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [placeholderIndex, placeholders])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSubmit && value.trim()) {
      onSubmit()
    }
  }

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "flex items-center gap-3 p-3 bg-card shadow-lg transition-all duration-300 ease-out rounded-full border border-border",
          isFocused && "shadow-xl scale-[1.01] border-primary/50",
          isLoading && "opacity-80"
        )}
      >
        {/* Orb */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src="https://media.giphy.com/media/26gsuUjoEBmLrNBxC/giphy.gif"
              alt="Animated orb"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-border" />

        {/* Input */}
        <div className="flex-1">
          <input
            data-testid="orb-input"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder={`${displayedText}${isTyping ? "|" : ""}`}
            aria-label="Ask a question"
            className="w-full text-base text-foreground placeholder-muted-foreground bg-transparent border-none outline-none font-light disabled:opacity-50"
          />
        </div>

        {/* Button */}
        {value.trim() && (
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="flex-shrink-0 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-full hover:opacity-90 transition-all disabled:opacity-50"
          >
            {isLoading ? "Checking..." : "Verify"}
          </button>
        )}
      </div>
    </div>
  )
}

export default OrbInput