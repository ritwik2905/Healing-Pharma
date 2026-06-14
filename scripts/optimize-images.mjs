// One-off image optimizer: re-encodes/resizes the public JPEGs in place so the
// Next.js image optimizer (and any un-optimized fallback) has far less to chew
// through. Safe to re-run — only writes when the result is smaller.
import sharp from "sharp"
import fs from "node:fs"
import path from "node:path"

const TARGETS = [
  { dir: "public/heroes", maxWidth: 1600, quality: 72 },
  { dir: "public/products", maxWidth: 1100, quality: 76 },
  { dir: "public", maxWidth: 1500, quality: 76 }, // root stock photos (services/about)
]

const SKIP = /placeholder/i
let totalBefore = 0
let totalAfter = 0

for (const { dir, maxWidth, quality } of TARGETS) {
  if (!fs.existsSync(dir)) continue
  const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g)$/i.test(f) && !SKIP.test(f))
  for (const f of files) {
    const p = path.join(dir, f)
    const before = fs.statSync(p).size
    try {
      // Read with Node fs (libvips can fail to open paths containing spaces/parens
      // on Windows), then hand the buffer to sharp.
      const input = fs.readFileSync(p)
      const buf = await sharp(input)
        .rotate()
        .resize({ width: maxWidth, withoutEnlargement: true })
        .jpeg({ quality, mozjpeg: true, progressive: true })
        .toBuffer()
      totalBefore += before
      if (buf.length < before) {
        fs.writeFileSync(p, buf)
        totalAfter += buf.length
        console.log(`${(before / 1024).toFixed(0)}KB -> ${(buf.length / 1024).toFixed(0)}KB  ${p}`)
      } else {
        totalAfter += before
        console.log(`kept ${(before / 1024).toFixed(0)}KB (already smaller)  ${p}`)
      }
    } catch (e) {
      console.error("FAILED", p, e.message)
    }
  }
}

console.log(
  `\nTOTAL: ${(totalBefore / 1024).toFixed(0)}KB -> ${(totalAfter / 1024).toFixed(0)}KB  (saved ${(
    (totalBefore - totalAfter) /
    1024
  ).toFixed(0)}KB, ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0)}%)`,
)
