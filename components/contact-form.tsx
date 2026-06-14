"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { addInquiry } from "@/lib/inquiry-actions"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const result = await addInquiry({
      type: "contact",
      ...formData,
    })

    setIsSubmitting(false)
    if (result.success) {
      setIsSuccess(true)
      setFormData({ name: "", email: "", phone: "", message: "" })
      setTimeout(() => setIsSuccess(false), 5000)
    }
  }

  return (
    <Card className="glass-card border-0 p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>

      {isSuccess && (
        <div className="mb-6 rounded-lg border border-success/30 bg-success/10 p-4">
          <p className="font-medium text-success-foreground">
            Thank you! Your message has been sent successfully.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your full name"
            className="h-12 bg-background/70"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your.email@example.com"
            className="h-12 bg-background/70"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            type="tel"
            id="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 XXXXX XXXXX"
            className="h-12 bg-background/70"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="How can we help you?"
            className="resize-none bg-background/70"
          />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Card>
  )
}
