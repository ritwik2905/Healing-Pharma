import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { products, categories } from "./catalogue-data.mjs";

config();

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await sql`DELETE FROM products`;
  await sql`DELETE FROM site_settings`;
  await sql`DELETE FROM testimonials`;
  await sql`DELETE FROM blog_posts`;
  // Reset serials so a fresh seed always starts ids at 1 (keeps product URLs stable).
  await sql`ALTER SEQUENCE products_id_seq RESTART WITH 1`;
  await sql`ALTER SEQUENCE site_settings_id_seq RESTART WITH 1`;
  await sql`ALTER SEQUENCE testimonials_id_seq RESTART WITH 1`;
  await sql`ALTER SEQUENCE blog_posts_id_seq RESTART WITH 1`;
  console.log("Cleared existing data.");

  // Products come from the shared catalogue-data module (single source of truth).

  for (const p of products) {
    await sql`
      INSERT INTO products (name, category, description, detailed_description, manufacture_date, expiry_date, batch_number, composition, dosage, image, price, in_stock)
      VALUES (${p.name}, ${p.category}, ${p.description}, ${p.detailed_description}, ${p.manufacture_date}, ${p.expiry_date}, ${p.batch_number}, ${p.composition}, ${p.dosage}, ${p.image}, ${p.price}, ${p.in_stock})
    `;
  }
  console.log(`Seeded ${products.length} products.`);

  // Seed site settings
  const settings = [
    {
      key: "categories",
      value: JSON.stringify(categories)
    },
    {
      key: "logo",
      value: JSON.stringify({ text: "Healingdoc Pharma", image: "" })
    },
    {
      key: "hero",
      value: JSON.stringify({
        title: "Better Medicines. Healthier Lives.",
        description: "WHO-GMP certified formulations across pain relief, anti-infectives, dermatology, gastro and nutraceuticals — crafted with uncompromising quality and made affordable for the people we serve.",
        image: "/heroes/home-hero.jpg",
        secondaryImage: "/heroes/home-about.jpg",
        video: "",
        slides: [
          "/heroes/home-hero.jpg",
          "/heroes/products-hero.jpg",
          "/heroes/about-story.jpg",
          "/heroes/services-hero.jpg"
        ]
      })
    },
    {
      key: "directors",
      value: JSON.stringify([])
    },
    {
      key: "chairman",
      value: JSON.stringify({
        name: "Mr. Sumen Ranjan Sen Gupta",
        title: "Managing Director",
        initials: "SS",
        description: "It gives me immense pleasure to present the product portfolio of Healingdoc Pharma Private Limited. Our company is committed to delivering high-quality, affordable and innovative healthcare solutions with a strong focus on patient well-being and customer satisfaction. We believe that trust, quality and ethical business practices are the foundation of long-term success. Our products are manufactured at WHO-GMP compliant facilities under strict quality standards to ensure safety, efficacy and consistency, and we remain committed to building strong, transparent relationships with doctors, distributors, retailers and healthcare professionals across India.",
        image: "/team/managing-director.jpg"
      })
    },
    {
      key: "contact",
      value: JSON.stringify({
        address: "136, 1st Floor, Block AW, Sanjay Gandhi Transport Nagar, Delhi - 110042",
        phone: "9667949517, 7903521151",
        email: "healingdocpharma@gmail.com",
        fax: "",
        hours: "Monday - Saturday: 9:00 AM - 6:00 PM\nSunday: Closed"
      })
    }
  ];

  for (const s of settings) {
    await sql`
      INSERT INTO site_settings (key, value)
      VALUES (${s.key}, ${s.value}::jsonb)
    `;
  }
  console.log(`Seeded ${settings.length} site settings.`);

  // Seed testimonials
  const testimonials = [
    {
      name: "Dr. Anil Verma",
      role: "General Physician, Delhi",
      message: "Healingdoc Pharma's products are consistently reliable. My patients respond well to their pain-relief and anti-infective range, and the quality is dependable batch after batch.",
      rating: 5,
      image: "",
      featured: true
    },
    {
      name: "Rakesh Gupta",
      role: "Distributor, Sanjay Gandhi Transport Nagar",
      message: "Timely supply, transparent dealing and genuine schemes. Working with Healingdoc Pharma has been smooth and profitable for our distribution business.",
      rating: 5,
      image: "",
      featured: true
    },
    {
      name: "Dr. Meena Iyer",
      role: "Dermatologist, Mumbai",
      message: "The dermatology range, especially Luliderm and Healderm, has shown excellent results for my patients. Affordable and effective.",
      rating: 5,
      image: "",
      featured: true
    },
    {
      name: "Sunita Pharmacy",
      role: "Retail Chemist, Noida",
      message: "Good margins, fast-moving products and prompt replacement support. Customers trust the Healingdoc brand.",
      rating: 4,
      image: "",
      featured: false
    },
    {
      name: "Dr. Imran Khan",
      role: "Pediatrician, Lucknow",
      message: "Cefidoc oral suspension is a go-to in my practice. Children tolerate it well and parents appreciate the affordability.",
      rating: 5,
      image: "",
      featured: false
    }
  ];

  for (const t of testimonials) {
    await sql`
      INSERT INTO testimonials (name, role, message, rating, image, featured)
      VALUES (${t.name}, ${t.role}, ${t.message}, ${t.rating}, ${t.image}, ${t.featured})
    `;
  }
  console.log(`Seeded ${testimonials.length} testimonials.`);

  // Seed blog posts
  const blogPosts = [
    {
      slug: "what-who-gmp-certification-means-for-you",
      title: "What WHO-GMP Certification Means for You",
      excerpt: "Every Healingdoc Pharma product is manufactured at WHO-GMP compliant facilities. Here is what that quality standard actually guarantees.",
      content: "WHO-GMP (World Health Organization - Good Manufacturing Practices) is a globally recognised quality system that governs how medicines are produced and controlled.\n\nWhen a product carries the WHO-GMP mark, it means the manufacturing facility follows strict standards covering raw-material sourcing, hygiene, equipment calibration, batch documentation and final quality testing. Every batch is traceable and tested for safety, efficacy and consistency before it reaches a patient.\n\nAt Healingdoc Pharma Private Limited, we partner only with WHO-GMP certified manufacturing units. This ensures that whether you are a doctor prescribing our medicines, a distributor stocking them, or a patient taking them, you receive a product of consistent, verifiable quality.\n\nQuality is not a one-time check for us - it is built into every step of the journey from raw material to your hands.",
      coverImage: "/modern-pharmacy-healthcare-professional.jpg",
      author: "Healingdoc Pharma",
      category: "Quality",
      published: true
    },
    {
      slug: "managing-seasonal-allergies",
      title: "Managing Seasonal Allergies: A Practical Guide",
      excerpt: "Sneezing, runny nose and itchy eyes? Understand the common triggers and how modern anti-allergy medicines can help.",
      content: "Seasonal allergies affect millions of people, especially during weather changes. Symptoms like sneezing, a runny or blocked nose, watery eyes and an itchy throat are caused by the body's immune response to allergens such as pollen, dust and mould.\n\nModern anti-allergy treatment often combines an antihistamine with a leukotriene receptor antagonist. Antihistamines such as Levocetirizine block the histamine that drives symptoms, while Montelukast helps control inflammation in the airways - which is why combination products like Healergy-LC are widely prescribed for allergic rhinitis and asthma.\n\nPractical steps to reduce symptoms: keep windows closed during high-pollen hours, wash your face and hands after coming indoors, stay hydrated, and avoid known triggers.\n\nAlways consult a qualified healthcare professional before starting any medication. This article is for general awareness only.",
      coverImage: "/pharmacy-retail-store-medicine.jpg",
      author: "Healingdoc Pharma",
      category: "Health Tips",
      published: true
    },
    {
      slug: "why-completing-your-antibiotic-course-matters",
      title: "Why Completing Your Antibiotic Course Matters",
      excerpt: "Stopping antibiotics early is one of the biggest drivers of antibiotic resistance. Here is why finishing the full course is essential.",
      content: "Antibiotics such as Azithromycin, Cefixime and Ofloxacin are powerful tools against bacterial infections. But their effectiveness depends on how they are used.\n\nWhen you start feeling better after a couple of days, it can be tempting to stop taking your antibiotic. However, feeling better does not always mean the infection is fully cleared. Some bacteria may survive, and these survivors can develop resistance - making future infections much harder to treat.\n\nAntibiotic resistance is a global health challenge. By completing the full prescribed course, taking doses at the right intervals, and never sharing antibiotics, you protect both your own recovery and the wider community.\n\nNever use antibiotics without a prescription, and always follow your doctor's instructions. This article is for general awareness only.",
      coverImage: "/hospital-healthcare-institution.jpg",
      author: "Healingdoc Pharma",
      category: "Awareness",
      published: true
    }
  ];

  for (const b of blogPosts) {
    await sql`
      INSERT INTO blog_posts (slug, title, excerpt, content, cover_image, author, category, published)
      VALUES (${b.slug}, ${b.title}, ${b.excerpt}, ${b.content}, ${b.coverImage}, ${b.author}, ${b.category}, ${b.published})
    `;
  }
  console.log(`Seeded ${blogPosts.length} blog posts.`);

  console.log("Database seeded successfully!");
}

seed().catch(console.error);
