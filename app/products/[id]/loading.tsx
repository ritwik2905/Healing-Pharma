import { BrandLoader } from "@/components/brand-loader"

export default function Loading() {
  return (
    <div className="flex min-h-[70svh] w-full items-center justify-center px-4 py-24">
      <BrandLoader />
    </div>
  )
}
