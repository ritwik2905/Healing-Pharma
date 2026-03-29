"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, ImageIcon, Users, Phone, Building2 } from "lucide-react"
import {
  getSiteSettings,
  updateHeroSection,
  updateDirectors,
  updateContactInfo,
  updateLogo,
} from "@/lib/site-settings-actions"
import { useRouter } from "next/navigation"

export function SiteSettingsForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    const data = await getSiteSettings()
    setSettings(data)
  }

  const handleHeroUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const hero = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
    }

    const result = await updateHeroSection(hero)
    if (result.success) {
      alert("Hero section updated successfully!")
      router.refresh()
    } else {
      alert(result.error || "Failed to update hero section")
    }
    setLoading(false)
  }

  const handleDirectorUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const directors = settings.directors.map((dir: any, index: number) => ({
      ...dir,
      name: formData.get(`director-${index}-name`) as string,
      title: formData.get(`director-${index}-title`) as string,
      description: formData.get(`director-${index}-description`) as string,
      image: formData.get(`director-${index}-image`) as string,
    }))

    const chairman = {
      name: formData.get("chairman-name") as string,
      title: formData.get("chairman-title") as string,
      description: formData.get("chairman-description") as string,
      image: formData.get("chairman-image") as string,
    }

    const result = await updateDirectors({ directors, chairman })
    if (result.success) {
      alert("Leadership updated successfully!")
      router.refresh()
    } else {
      alert(result.error || "Failed to update leadership")
    }
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
      fax: formData.get("fax") as string,
      hours: formData.get("hours") as string,
    }

    const result = await updateContactInfo(contact)
    if (result.success) {
      alert("Contact information updated successfully!")
      router.refresh()
    } else {
      alert(result.error || "Failed to update contact information")
    }
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
    if (result.success) {
      alert("Logo updated successfully!")
      router.refresh()
    } else {
      alert(result.error || "Failed to update logo")
    }
    setLoading(false)
  }

  if (!settings) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="logo" className="w-full">
        <TabsList>
          <TabsTrigger value="logo" className="gap-2">
            <Building2 className="w-4 h-4" />
            Logo
          </TabsTrigger>
          <TabsTrigger value="hero" className="gap-2">
            <ImageIcon className="w-4 h-4" />
            Hero Section
          </TabsTrigger>
          <TabsTrigger value="directors" className="gap-2">
            <Users className="w-4 h-4" />
            Directors & Chairman
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-2">
            <Phone className="w-4 h-4" />
            Contact Info
          </TabsTrigger>
        </TabsList>

        <TabsContent value="logo">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Edit Logo</h3>
            <form onSubmit={handleLogoUpdate} className="space-y-4">
              <div>
                <Label htmlFor="logo-text">Logo Text</Label>
                <Input id="logo-text" name="text" defaultValue={settings?.logo?.text || "Healing Doc Pharma"} required />
                <p className="text-sm text-muted-foreground mt-1">
                  This text will be displayed if no logo image is provided
                </p>
              </div>
              <div>
                <Label htmlFor="logo-image">Logo Image URL (optional)</Label>
                <Input
                  id="logo-image"
                  name="image"
                  defaultValue={settings?.logo?.image || ""}
                  placeholder="/logo.png or leave empty for text logo"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Upload your logo to /public folder and reference it here. Leave empty to show text logo. Recommended
                  size: 40px height
                </p>
              </div>
              <Button type="submit" disabled={loading} className="gap-2">
                <Save className="w-4 h-4" />
                Save Logo
              </Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="hero">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Edit Hero Section</h3>
            <form onSubmit={handleHeroUpdate} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={settings.hero.title} required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={settings.hero.description}
                  rows={4}
                  required
                />
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  defaultValue={settings.hero.image}
                  placeholder="/image-path.jpg"
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Upload image to /public folder and reference it here
                </p>
              </div>
              <Button type="submit" disabled={loading} className="gap-2">
                <Save className="w-4 h-4" />
                Save Hero Section
              </Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="directors">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Edit Directors & Chairman</h3>
            <form onSubmit={handleDirectorUpdate} className="space-y-6">
              {/* Chairman section at the top */}
              {settings.chairman && (
                <div className="border-2 border-primary/20 rounded-lg p-4 bg-primary/5">
                  <h4 className="font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Chairman (Featured)
                  </h4>
                  <div className="grid grid-cols-4 gap-3">
                    <div>
                      <Label htmlFor="chairman-name" className="text-xs">
                        Name
                      </Label>
                      <Input
                        id="chairman-name"
                        name="chairman-name"
                        defaultValue={settings.chairman.name}
                        className="h-8 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="chairman-title" className="text-xs">
                        Title
                      </Label>
                      <Input
                        id="chairman-title"
                        name="chairman-title"
                        defaultValue={settings.chairman.title}
                        className="h-8 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="chairman-description" className="text-xs">
                        Description
                      </Label>
                      <Input
                        id="chairman-description"
                        name="chairman-description"
                        defaultValue={settings.chairman.description}
                        className="h-8 text-sm"
                        placeholder="Brief description"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="chairman-image" className="text-xs">
                        Image URL
                      </Label>
                      <Input
                        id="chairman-image"
                        name="chairman-image"
                        defaultValue={settings.chairman.image}
                        className="h-8 text-sm"
                        placeholder="/photo.jpg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Directors - Compact horizontal layout */}
              <div>
                <h4 className="font-semibold text-foreground mb-3 text-sm">Directors</h4>
                <div className="space-y-2">
                  {settings.directors.map((director: any, index: number) => (
                    <div key={director.id} className="border border-border rounded p-3 bg-muted/30">
                      <div className="grid grid-cols-5 gap-2">
                        <div>
                          <Label htmlFor={`director-${index}-name`} className="text-xs">
                            Name
                          </Label>
                          <Input
                            id={`director-${index}-name`}
                            name={`director-${index}-name`}
                            defaultValue={director.name}
                            className="h-8 text-sm"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor={`director-${index}-title`} className="text-xs">
                            Title
                          </Label>
                          <Input
                            id={`director-${index}-title`}
                            name={`director-${index}-title`}
                            defaultValue={director.title}
                            className="h-8 text-sm"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor={`director-${index}-description`} className="text-xs">
                            Description
                          </Label>
                          <Input
                            id={`director-${index}-description`}
                            name={`director-${index}-description`}
                            defaultValue={director.description}
                            className="h-8 text-sm"
                            placeholder="Brief text"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor={`director-${index}-image`} className="text-xs">
                            Image URL
                          </Label>
                          <Input
                            id={`director-${index}-image`}
                            name={`director-${index}-image`}
                            defaultValue={director.image}
                            className="h-8 text-sm"
                            placeholder="/photo.jpg"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Director {index + 1}</Label>
                          <div className="h-8 flex items-center text-xs text-muted-foreground font-medium">
                            #{index + 1}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" disabled={loading} className="gap-2">
                <Save className="w-4 h-4" />
                Save All Leadership
              </Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Edit Contact Information</h3>
            <form onSubmit={handleContactUpdate} className="space-y-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" name="address" defaultValue={settings.contact.address} rows={2} required />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" defaultValue={settings.contact.phone} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={settings.contact.email} required />
              </div>
              <div>
                <Label htmlFor="fax">Fax</Label>
                <Input id="fax" name="fax" defaultValue={settings.contact.fax} required />
              </div>
              <div>
                <Label htmlFor="hours">Business Hours</Label>
                <Textarea id="hours" name="hours" defaultValue={settings.contact.hours} rows={4} required />
                <p className="text-sm text-muted-foreground mt-1">Use line breaks for different days</p>
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
