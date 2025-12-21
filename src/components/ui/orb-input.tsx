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
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "flex items-center gap-4 p-6 bg-black shadow-lg transition-all duration-300 ease-out rounded-full border border-gray-300",
          isFocused ? "shadow-xl scale-[1.02] border-gray-600" : "shadow-lg",
          isLoading && "opacity-80"
        )}
      >
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden transition-all duration-300 scale-100">
            <img
              src="https://media.giphy.com/media/26gsuUjoEBmLrNBxC/giphy.gif"
              alt="Animated orb"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-px h-12 bg-gray-600" />

        <div className="flex-1 w-[500px]">
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
            className="w-full text-xl text-white placeholder-gray-400 bg-transparent border-none outline-none font-light disabled:opacity-50"
          />
        </div>

        {value.trim() && (
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="flex-shrink-0 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all disabled:opacity-50"
          >
            {isLoading ? "Checking..." : "Verify"}
          </button>
        )}
      </div>
    </div>
  )
}

export default OrbInput