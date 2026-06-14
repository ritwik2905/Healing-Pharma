// Central registry of hero & feature imagery for the public site.
//
// All photos are self-hosted in /public/heroes (sourced from Pexels — free to
// use, no attribution required). Keeping every path in one place means a single
// edit re-themes a page, and it documents what each slot expects.
//
// NOTE: the HOMEPAGE hero + secondary images are also overridable from the
// admin panel (Site Settings → Hero) by pasting any image URL — including a
// remote Pexels/Unsplash link (next.config allows any https host). The values
// below are the defaults used when no override has been saved.

export const SITE_IMAGES = {
  home: {
    hero: "/heroes/home-hero.jpg", // scientist in a pharmaceutical lab
    about: "/heroes/home-about.jpg", // pharmacist organising medicine shelves
  },
  products: {
    hero: "/heroes/products-hero.jpg", // colourful pills & blister packs
  },
  services: {
    hero: "/heroes/services-hero.jpg", // warehouse / logistics with staff
  },
  about: {
    hero: "/heroes/about-hero.jpg", // diverse team of healthcare professionals
    story: "/heroes/about-story.jpg", // lab quality-control with test tubes
  },
  contact: {
    hero: "/heroes/contact-hero.jpg", // partnership handshake in a modern office
  },
  testimonials: {
    hero: "/heroes/testimonials-hero.jpg", // confident, smiling medical team
  },
  blog: {
    hero: "/heroes/blog-hero.jpg", // stethoscope + notebook flat-lay
  },
} as const
