"use client"

import type React from "react"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Check, X, ZoomIn } from "lucide-react"

const OUT = 720 // output square size (px)

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

  const imgRef = useRef<HTMLImageElement | null>(null)
  const viewRef = useRef<HTMLDivElement | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const natural = useRef({ w: 0, h: 0 })
  const drag = useRef<{ x: number; y: number } | null>(null)

  const measure = useCallback(() => {
    if (viewRef.current) setVw(viewRef.current.clientWidth || 320)
  }, [])

  useEffect(() => {
    if (!src) return
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [src, measure])

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

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (src) URL.revokeObjectURL(src)
    setSrc(URL.createObjectURL(file))
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }

  const onImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    natural.current = { w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight }
    measure()
    setOffset({ x: 0, y: 0 })
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

  const cancel = useCallback(() => {
    if (src) URL.revokeObjectURL(src)
    setSrc(null)
    setZoom(1)
    setOffset({ x: 0, y: 0 })
    if (fileRef.current) fileRef.current.value = ""
  }, [src])

  const apply = () => {
    const { w, h } = natural.current
    if (!imgRef.current || !w || !h) return
    const base = Math.max(vw / w, vw / h)
    const eff = base * zoom
    const dispW = w * eff
    const dispH = h * eff
    const imgLeft = vw / 2 - dispW / 2 + offset.x
    const imgTop = vw / 2 - dispH / 2 + offset.y
    const srcX = (0 - imgLeft) / eff
    const srcY = (0 - imgTop) / eff
    const srcSize = vw / eff

    const canvas = document.createElement("canvas")
    canvas.width = OUT
    canvas.height = OUT
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, OUT, OUT)
    ctx.drawImage(imgRef.current, srcX, srcY, srcSize, srcSize, 0, 0, OUT, OUT)
    onCropped(canvas.toDataURL("image/jpeg", 0.85))
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

      {!src ? (
        <Button type="button" variant="outline" onClick={() => fileRef.current?.click()} className="gap-2 bg-transparent">
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
            <Button type="button" onClick={apply} className="flex-1 gap-2">
              <Check className="h-4 w-4" />
              Apply crop
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
