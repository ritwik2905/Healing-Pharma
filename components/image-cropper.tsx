"use client"

import type React from "react"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Check, X, ZoomIn } from "lucide-react"

const OUT = 720 // output square size (px)
// Keep the exported data URL comfortably under the Server Action body limit.
// A data URL is ~1.37x the raw byte size, so this caps the POST at ~700KB.
const MAX_DATA_URL_BYTES = 500_000

/**
 * Dependency-free square image cropper. The admin picks a file, pans (drag) and
 * zooms (slider) to frame it, and "Apply" exports a cropped JPEG **data URL**
 * via canvas — which is stored directly in the product's `image` field (no blob
 * storage needed; next/image renders data URLs as-is).
 */
export function ImageCropper({ onCropped }: { onCropped: (dataUrl: string) => void }) {
  const [src, setSrc] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [vw, setVw] = useState(320) // measured viewport width
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  const imgRef = useRef<HTMLImageElement | null>(null)
  const viewRef = useRef<HTMLDivElement | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const natural = useRef({ w: 0, h: 0 })
  const drag = useRef<{ x: number; y: number } | null>(null)
  // Kept in a ref as well so the unmount cleanup below always revokes the
  // *current* object URL without re-running on every pick.
  const srcRef = useRef<string | null>(null)

  const measure = useCallback(() => {
    if (viewRef.current) setVw(viewRef.current.clientWidth || 320)
  }, [])

  useEffect(() => {
    if (!src) return
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [src, measure])

  // Releasing the blob on unmount prevents a leak when the modal is closed
  // mid-crop.
  useEffect(() => {
    return () => {
      if (srcRef.current) URL.revokeObjectURL(srcRef.current)
    }
  }, [])

  const clamp = useCallback(
    (off: { x: number; y: number }, z: number) => {
      const { w, h } = natural.current
      if (!w || !h) return off
      const base = Math.max(vw / w, vw / h)
      const eff = base * z
      const maxX = Math.max(0, (w * eff - vw) / 2)
      const maxY = Math.max(0, (h * eff - vw) / 2)
      return { x: Math.min(maxX, Math.max(-maxX, off.x)), y: Math.min(maxY, Math.max(-maxY, off.y)) }
    },
    [vw],
  )

  const openPicker = () => {
    // Clearing the value first means re-picking the SAME file still fires
    // `change` — otherwise the second attempt silently does nothing.
    if (fileRef.current) fileRef.current.value = ""
    fileRef.current?.click()
  }

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    if (!file.type.startsWith("image/")) {
      setError("That file isn't an image. Pick a JPG, PNG or WebP.")
      return
    }
    if (srcRef.current) URL.revokeObjectURL(srcRef.current)
    const url = URL.createObjectURL(file)
    srcRef.current = url
    natural.current = { w: 0, h: 0 }
    setReady(false)
    setSrc(url)
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }

  const onImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    natural.current = { w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight }
    measure()
    setReady(true)
    setOffset({ x: 0, y: 0 })
  }

  const onImgError = () => {
    setError("That image couldn't be opened. Try a different file (HEIC photos aren't supported).")
    setSrc(null)
    setReady(false)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    const dy = e.clientY - drag.current.y
    drag.current = { x: e.clientX, y: e.clientY }
    setOffset((o) => clamp({ x: o.x + dx, y: o.y + dy }, zoom))
  }
  const onPointerUp = () => {
    drag.current = null
  }

  const onZoom = (z: number) => {
    setZoom(z)
    setOffset((o) => clamp(o, z))
  }

  const reset = useCallback(() => {
    if (srcRef.current) URL.revokeObjectURL(srcRef.current)
    srcRef.current = null
    setSrc(null)
    setZoom(1)
    setReady(false)
    setOffset({ x: 0, y: 0 })
    if (fileRef.current) fileRef.current.value = ""
  }, [])

  const cancel = useCallback(() => {
    setError(null)
    reset()
  }, [reset])

  const apply = () => {
    const { w, h } = natural.current
    if (!imgRef.current || !w || !h) {
      setError("The image is still loading — try again in a moment.")
      return
    }
    const base = Math.max(vw / w, vw / h)
    const eff = base * zoom
    const dispW = w * eff
    const dispH = h * eff
    const imgLeft = vw / 2 - dispW / 2 + offset.x
    const imgTop = vw / 2 - dispH / 2 + offset.y
    const srcX = (0 - imgLeft) / eff
    const srcY = (0 - imgTop) / eff
    const srcSize = vw / eff

    if (!Number.isFinite(srcX) || !Number.isFinite(srcY) || !Number.isFinite(srcSize) || srcSize <= 0) {
      setError("Couldn't work out the crop area. Reload the page and try again.")
      return
    }

    const canvas = document.createElement("canvas")
    canvas.width = OUT
    canvas.height = OUT
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      setError("Your browser blocked the image canvas. Try another browser.")
      return
    }
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, OUT, OUT)

    try {
      ctx.drawImage(imgRef.current, srcX, srcY, srcSize, srcSize, 0, 0, OUT, OUT)
    } catch {
      setError("That image couldn't be cropped. Try a different file.")
      return
    }

    // Step the quality down until the data URL fits the Server Action budget,
    // so a large photo can never silently fail to save.
    let dataUrl = ""
    for (const q of [0.85, 0.75, 0.65, 0.55, 0.45]) {
      dataUrl = canvas.toDataURL("image/jpeg", q)
      if (dataUrl.length <= MAX_DATA_URL_BYTES) break
    }
    if (!dataUrl.startsWith("data:image/")) {
      setError("Your browser couldn't export the crop. Try another browser.")
      return
    }

    onCropped(dataUrl)
    cancel()
  }

  // Displayed image dimensions (px) under the current zoom.
  const { w, h } = natural.current
  const base = w && h ? Math.max(vw / w, vw / h) : 1
  const eff = base * zoom
  const dispW = w ? w * eff : 0
  const dispH = h ? h * eff : 0

  return (
    <div>
      <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" />

      {error && (
        <p className="mb-3 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {!src ? (
        <Button type="button" variant="outline" onClick={openPicker} className="gap-2 bg-transparent">
          <Upload className="h-4 w-4" />
          Upload &amp; crop image
        </Button>
      ) : (
        <div className="space-y-3">
          <div
            ref={viewRef}
            className="relative mx-auto aspect-square w-full max-w-xs cursor-grab touch-none overflow-hidden rounded-2xl border border-border bg-muted active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={src}
              alt=""
              onLoad={onImgLoad}
              onError={onImgError}
              draggable={false}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: dispW ? `${dispW}px` : "100%",
                height: dispH ? `${dispH}px` : "100%",
                maxWidth: "none",
                transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
              }}
            />
            {/* Rule-of-thirds guide */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/40">
              <div className="absolute inset-y-0 left-1/3 w-px bg-white/25" />
              <div className="absolute inset-y-0 left-2/3 w-px bg-white/25" />
              <div className="absolute inset-x-0 top-1/3 h-px bg-white/25" />
              <div className="absolute inset-x-0 top-2/3 h-px bg-white/25" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ZoomIn className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => onZoom(parseFloat(e.target.value))}
              aria-label="Zoom"
              className="h-2 flex-1 cursor-pointer accent-primary"
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" onClick={apply} disabled={!ready} className="flex-1 gap-2">
              <Check className="h-4 w-4" />
              {ready ? "Apply crop" : "Loading..."}
            </Button>
            <Button type="button" variant="outline" onClick={cancel} className="flex-1 gap-2 bg-transparent">
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Drag to reposition, use the slider to zoom, then apply.</p>
        </div>
      )}
    </div>
  )
}
