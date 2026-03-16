"use client"

import { NavBar } from "@/components/ui/navbar"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useAuth, UserButton, Show } from "@clerk/nextjs"
import { Home, Eye, History } from "lucide-react"

const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "About", url: "/about", icon: Eye },
  { name: "History", url: "/history", icon: History },
]

export default function Header() {
  const { isLoaded } = useAuth()

  return (
    <>
      <NavBar items={navItems} />

      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] flex items-center gap-4 bg-background/60 backdrop-blur-md px-3 py-2 rounded-full border border-border shadow-md">

        <ThemeToggle />

        {isLoaded && (
          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8",
                },
              }}
            />
          </Show>
        )}

      </div>
    </>
  )
}
