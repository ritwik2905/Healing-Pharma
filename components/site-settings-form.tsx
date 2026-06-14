"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, ImageIcon, Users, Phone, Building2, Plus, Trash2 } from "lucide-react"
import {
  getSiteSettings,
  updateHeroSection,
  updateDirectors,
  updateContactInfo,
  updateLogo,
} from "@/lib/site-settings-actions"
import { useRouter } from "next/navigation"

const DIRECTOR_COLORS = ["primary", "accent", "success", "warning"]

function initialsFromName(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function SiteSettingsForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState<any>(null)
  const [directors, setDirectors] = useState<any[]>([])

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    const data = await getSiteSettings()
    setSettings(data)
    setDirectors(Array.isArray(data?.directors) ? data.directors : [])
  }

  const handleHeroUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const hero = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      secondaryImage: (formData.get("secondaryImage") as string) || "",
    }
    const result = await updateHeroSection(hero)
    alert(result.success ? "Hero section updated!" : result.error || "Failed to update hero section")
    if (result.success) router.refresh()
    setLoading(false)
  }

  const addDirector = () => {
    setDirectors((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        name: "",
        title: "",
        description: "",
        image: "",
        initials: "",
        color: DIRECTOR_COLORS[prev.length % DIRECTOR_COLORS.length],
      },
    ])
  }

  const removeDirector = (id: string) => {
    setDirectors((prev) => prev.filter((d) => d.id !== id))
  }

  const handleDirectorUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)

    const updatedDirectors = directors.map((dir, index) => {
      const name = (formData.get(`director-${index}-name`) as string) || ""
      return {
        ...dir,
        name,
        title: (formData.get(`director-${index}-title`) as string) || "",
        description: (formData.get(`director-${index}-description`) as string) || "",
        image: (formData.get(`director-${index}-image`) as string) || "",
        initials: dir.initials || initialsFromName(name),
        color: dir.color || "primary",
      }
    })

    const name = (formData.get("chairman-name") as string) || ""
    const chairman = {
      ...(settings.chairman || {}),
      name,
      title: (formData.get("chairman-title") as string) || "",
      description: (formData.get("chairman-description") as string) || "",
      image: (formData.get("chairman-image") as string) || "",
      initials: (formData.get("chairman-initials") as string) || initialsFromName(name),
    }

    const result = await updateDirectors({ directors: updatedDirectors, chairman })
    alert(result.success ? "Leadership updated!" : result.error || "Failed to update leadership")
    if (result.success) router.refresh()
    setLoading(false)
  }

  const handleContactUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const contact = {
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      fax: (formData.get("fax") as string) || "",
      hours: formData.get("hours") as string,
    }
    const result = await updateContactInfo(contact)
    alert(result.success ? "Contact information updated!" : result.error || "Failed to update contact information")
    if (result.success) router.refresh()
    setLoading(false)
  }

  const handleLogoUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const logo = {
      text: formData.get("text") as string,
      image: formData.get("image") as string,
    }
    const result = await updateLogo(logo)
    alert(result.success ? "Logo updated!" : result.error || "Failed to update logo")
    if (result.success) router.refresh()
    setLoading(false)
  }

  if (!settings) {
    return <div className="py-12 text-center text-muted-foreground">Loading settings...</div>
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="logo" className="w-full">
        <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <TabsList className="w-max">
            <TabsTrigger value="logo" className="gap-2">
              <Building2 className="w-4 h-4" />
              Logo
            </TabsTrigger>
            <TabsTrigger value="hero" className="gap-2">
              <ImageIcon className="w-4 h-4" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="directors" className="gap-2">
              <Users className="w-4 h-4" />
              Leadership
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Phone className="w-4 h-4" />
              Contact
            </TabsTrigger>
          </TabsList>
        </div>

        {/* LOGO */}
        <TabsContent value="logo" className="mt-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Edit Logo</h3>
            <form onSubmit={handleLogoUpdate} className="space-y-4">
              <div>
                <Label htmlFor="logo-text">Logo Text</Label>
                <Input id="logo-text" name="text" defaultValue={settings?.logo?.text || "Healingdoc Pharma"} required className="mt-2" />
              </div>
              <div>
                <Label htmlFor="logo-image">Logo Image URL (optional)</Label>
                <Input id="logo-image" name="image" defaultValue={settings?.logo?.image || ""} placeholder="/logo.png" className="mt-2" />
                <p className="text-sm text-muted-foreground mt-1">Leave empty to show the text logo. Recommended height: 40px.</p>
              </div>
              <Button type="submit" disabled={loading} className="gap-2">
                <Save className="w-4 h-4" />
                Save Logo
              </Button>
            </form>
          </Card>
        </TabsContent>

        {/* HERO */}
        <TabsContent value="hero" className="mt-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-1">Edit Homepage Hero</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Controls the headline and the two photos on the homepage. You can paste a local path
              (e.g. <code className="rounded bg-muted px-1">/heroes/home-hero.jpg</code>) or a full link from a free stock
              site like <strong>Pexels</strong> or <strong>Unsplash</strong> (e.g. {""}
              <code className="rounded bg-muted px-1">https://images.pexels.com/photos/.../photo.jpeg</code>).
            </p>
            <form onSubmit={handleHeroUpdate} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={settings.hero.title} required className="mt-2" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={settings.hero.description} rows={4} required className="mt-2" />
              </div>
              <div>
                <Label htmlFor="image">Main Hero Image URL</Label>
                <Input id="image" name="image" defaultValue={settings.hero.image} placeholder="/heroes/home-hero.jpg or https://images.pexels.com/..." required className="mt-2" />
                <p className="text-sm text-muted-foreground mt-1">Large photo shown in the homepage hero. Landscape works best.</p>
              </div>
              <div>
                <Label htmlFor="secondaryImage">Secondary Image URL (optional)</Label>
                <Input id="secondaryImage" name="secondaryImage" defaultValue={settings.hero?.secondaryImage || ""} placeholder="/heroes/home-about.jpg or https://images.unsplash.com/..." className="mt-2" />
                <p className="text-sm text-muted-foreground mt-1">Photo shown in the homepage “About” preview section.</p>
              </div>
              <Button type="submit" disabled={loading} className="gap-2">
                <Save className="w-4 h-4" />
                Save Hero Section
              </Button>
            </form>
          </Card>
        </TabsContent>

        {/* LEADERSHIP */}
        <TabsContent value="directors" className="mt-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Edit Leadership</h3>
            <form onSubmit={handleDirectorUpdate} className="space-y-6">
              {/* Chairman / Managing Director (featured) */}
              <div className="border-2 border-primary/20 rounded-lg p-4 bg-primary/5">
                <h4 className="font-semibold text-foreground mb-4 text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Featured Leader (Chairman / Managing Director)
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="chairman-name" className="text-xs">Name</Label>
                    <Input id="chairman-name" name="chairman-name" defaultValue={settings.chairman?.name} className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="chairman-title" className="text-xs">Title</Label>
                    <Input id="chairman-title" name="chairman-title" defaultValue={settings.chairman?.title} className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="chairman-initials" className="text-xs">Initials (avatar)</Label>
                    <Input id="chairman-initials" name="chairman-initials" defaultValue={settings.chairman?.initials} placeholder="e.g. SS" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="chairman-image" className="text-xs">Image URL (optional)</Label>
                    <Input id="chairman-image" name="chairman-image" defaultValue={settings.chairman?.image} placeholder="/photo.jpg" className="mt-1" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="chairman-description" className="text-xs">Description / Message</Label>
                    <Textarea id="chairman-description" name="chairman-description" defaultValue={settings.chairman?.description} rows={4} className="mt-1" required />
                  </div>
                </div>
              </div>

              {/* Directors */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground text-sm">Directors ({directors.length})</h4>
                  <Button type="button" variant="outline" size="sm" onClick={addDirector} className="gap-2 bg-transparent">
                    <Plus className="w-4 h-4" />
                    Add Director
                  </Button>
                </div>

                {directors.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4">
                    No additional directors. Click “Add Director” to add team members shown on the About page.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {directors.map((director, index) => (
                      <div key={director.id} className="border border-border rounded-lg p-4 bg-muted/30">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-medium text-muted-foreground">Director #{index + 1}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDirector(director.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor={`director-${index}-name`} className="text-xs">Name</Label>
                            <Input id={`director-${index}-name`} name={`director-${index}-name`} defaultValue={director.name} className="mt-1" required />
                          </div>
                          <div>
                            <Label htmlFor={`director-${index}-title`} className="text-xs">Title</Label>
                            <Input id={`director-${index}-title`} name={`director-${index}-title`} defaultValue={director.title} className="mt-1" required />
                          </div>
                          <div>
                            <Label htmlFor={`director-${index}-image`} className="text-xs">Image URL (optional)</Label>
                            <Input id={`director-${index}-image`} name={`director-${index}-image`} defaultValue={director.image} placeholder="/photo.jpg" className="mt-1" />
                          </div>
                          <div className="sm:col-span-1">
                            <Label htmlFor={`director-${index}-description`} className="text-xs">Description</Label>
                            <Input id={`director-${index}-description`} name={`director-${index}-description`} defaultValue={director.description} className="mt-1" required />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" disabled={loading} className="gap-2">
                <Save className="w-4 h-4" />
                Save Leadership
              </Button>
            </form>
          </Card>
        </TabsContent>

        {/* CONTACT */}
        <TabsContent value="contact" className="mt-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Edit Contact Information</h3>
            <form onSubmit={handleContactUpdate} className="space-y-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" name="address" defaultValue={settings.contact.address} rows={2} required className="mt-2" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" defaultValue={settings.contact.phone} required className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" defaultValue={settings.contact.email} required className="mt-2" />
                </div>
              </div>
              <div>
                <Label htmlFor="fax">Fax (optional)</Label>
                <Input id="fax" name="fax" defaultValue={settings.contact.fax} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="hours">Business Hours</Label>
                <Textarea id="hours" name="hours" defaultValue={settings.contact.hours} rows={3} required className="mt-2" />
                <p className="text-sm text-muted-foreground mt-1">Use line breaks for different days.</p>
              </div>
              <Button type="submit" disabled={loading} className="gap-2">
                <Save className="w-4 h-4" />
                Save Contact Info
              </Button>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
