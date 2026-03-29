"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navigation({ logo }: { logo?: { text: string; image: string } }) {
  const [isOpen, setIsOpen] = useState(false)
  const [pathname, setPathname] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname)
    }
  }, [])

  const handleNavClick = (targetId: string) => {
    if (pathname !== "/") {
      // On other pages, redirect to home with hash
      window.location.href = `/#${targetId}`
    } else {
      // On homepage, smooth scroll
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo?.image || "/logo.jpeg"}
              alt={logo?.text || "Healing Doc Pharma"}
              width={40}
              height={40}
              className="object-contain rounded"
            />
            <span className="font-bold text-xl text-foreground">{logo?.text || "Healing Doc Pharma"}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <button
              onClick={() => handleNavClick("services")}
              className="text-foreground hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className="text-foreground hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              About Us
            </button>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <button
                onClick={() => handleNavClick("services")}
                className="text-foreground hover:text-primary transition-colors cursor-pointer text-left bg-transparent border-none p-0"
              >
                Services
              </button>
              <button
                onClick={() => handleNavClick("about")}
                className="text-foreground hover:text-primary transition-colors cursor-pointer text-left bg-transparent border-none p-0"
              >
                About Us
              </button>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
