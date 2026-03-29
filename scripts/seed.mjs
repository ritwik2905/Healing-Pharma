import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config();

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await sql`DELETE FROM products`;
  await sql`DELETE FROM site_settings`;
  console.log("Cleared existing data.");

  // Seed products
  const products = [
    {
      name: "Acloheal-SP Tablets",
      category: "Pain Relief",
      description: "Aceclofenac, Paracetamol & Serratiopeptidase Tablets IP for effective pain and inflammation management.",
      detailed_description: "Acloheal-SP is a combination of Aceclofenac, Paracetamol, and Serratiopeptidase. Aceclofenac is a non-steroidal anti-inflammatory drug (NSAID) that reduces pain and inflammation. Paracetamol acts as an analgesic and antipyretic. Serratiopeptidase is a proteolytic enzyme that helps reduce inflammation and swelling. This combination is effective for conditions like arthritis, musculoskeletal pain, dental pain, and post-operative inflammation.",
      manufacture_date: "2025-01-15",
      expiry_date: "2027-01-15",
      batch_number: "ACSP-2025-001",
      composition: "Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg",
      dosage: "As directed by the physician. Usually 1 tablet twice daily after meals.",
      image: "/products/acloheal-sp.jpg",
      price: "Contact for Price",
      in_stock: true
    },
    {
      name: "Acloheal-MR Tablets",
      category: "Pain Relief",
      description: "Aceclofenac, Paracetamol & Chlorzoxazone Tablets for muscle pain and stiffness relief.",
      detailed_description: "Acloheal-MR combines Aceclofenac, Paracetamol, and Chlorzoxazone for comprehensive pain management. Aceclofenac reduces inflammation and pain, Paracetamol provides additional analgesic and antipyretic effects, and Chlorzoxazone acts as a centrally-acting muscle relaxant. This triple combination is particularly effective for musculoskeletal conditions involving pain, inflammation, and muscle spasm such as back pain, neck pain, and sports injuries.",
      manufacture_date: "2025-01-20",
      expiry_date: "2027-01-20",
      batch_number: "ACMR-2025-002",
      composition: "Aceclofenac 100mg + Paracetamol 325mg + Chlorzoxazone 250mg",
      dosage: "As directed by the physician. Usually 1 tablet twice daily after meals.",
      image: "/products/acloheal-mr.jpg",
      price: "Contact for Price",
      in_stock: true
    },
    {
      name: "Dicloheal Gel",
      category: "Topical Pain Relief",
      description: "Diclofenac Diethylamine, Linseed Oil, Methyl Salicylate & Menthol Gel for quick relief from pain, swelling & inflammation.",
      detailed_description: "Dicloheal Gel is a topical pain relief formulation containing Diclofenac Diethylamine, Linseed Oil, Methyl Salicylate, and Menthol. Diclofenac provides potent anti-inflammatory and analgesic action at the site of application. Linseed Oil acts as an emollient and aids in penetration. Methyl Salicylate produces a warming sensation and Menthol provides a cooling effect for immediate relief. For external use only. Manufactured by Healingdoc Pharma Pvt. Ltd.",
      manufacture_date: "2025-02-01",
      expiry_date: "2027-02-01",
      batch_number: "DCG-2025-003",
      composition: "Diclofenac Diethylamine + Linseed Oil + Methyl Salicylate + Menthol Gel (15gm)",
      dosage: "Apply a thin layer to the affected area 3-4 times daily. For external use only.",
      image: "/products/dicloheal-gel.jpg",
      price: "Contact for Price",
      in_stock: true
    },
    {
      name: "Healderm Cream",
      category: "Dermatology",
      description: "Ofloxacin, Ornidazole, Itraconazole & Clobetasol Propionate Cream for skin infections and dermatological conditions.",
      detailed_description: "Healderm Cream is a potent combination cream containing Ofloxacin (0.75% w/w), Ornidazole (2.0% w/w), Itraconazole (1.0% w/w), and Clobetasol Propionate (0.05% w/w) in a cream base. Ofloxacin is a fluoroquinolone antibiotic effective against bacterial skin infections. Ornidazole provides antiprotozoal and anaerobic antibacterial action. Itraconazole is an antifungal agent. Clobetasol Propionate is a potent corticosteroid that reduces inflammation, itching, and redness. For external use only. Manufactured by Healingdoc Pharma Pvt. Ltd.",
      manufacture_date: "2025-01-10",
      expiry_date: "2027-01-10",
      batch_number: "HDC-2025-004",
      composition: "Ofloxacin IP 0.75% w/w + Ornidazole IP 2.0% w/w + Itraconazole IP 1.0% w/w + Clobetasol Propionate IP 0.05% w/w (15gm)",
      dosage: "Apply a thin layer on the affected area as directed by the physician. For external use only.",
      image: "/products/healderm-cream.jpg",
      price: "Contact for Price",
      in_stock: true
    },
    {
      name: "Lulidrum Cream",
      category: "Dermatology",
      description: "Luliconazole Cream I.P. 1% w/w for effective treatment of fungal skin infections.",
      detailed_description: "Lulidrum Cream contains Luliconazole 1% w/w, a broad-spectrum antifungal agent belonging to the azole class. It is highly effective against dermatophytes and works by inhibiting the synthesis of ergosterol, an essential component of fungal cell membranes. Indicated for the treatment of tinea pedis (athlete's foot), tinea cruris (jock itch), and tinea corporis (ringworm). For external use only. Store as directed by the Physician. Manufactured by Healing Pharma.",
      manufacture_date: "2025-02-10",
      expiry_date: "2027-02-10",
      batch_number: "LDC-2025-005",
      composition: "Luliconazole 1% w/w in a cream base (30gm)",
      dosage: "Apply once daily to the affected and surrounding area for the prescribed duration. For external use only.",
      image: "/products/lulidrum.jpg",
      price: "Contact for Price",
      in_stock: true
    },
    {
      name: "Healergy-LC Tablets",
      category: "Anti-Allergy",
      description: "Montelukast Sodium & Levocetirizine Hydrochloride Tablets IP for allergy and respiratory conditions.",
      detailed_description: "Healergy-LC combines Montelukast Sodium and Levocetirizine Hydrochloride for comprehensive allergy management. Montelukast is a leukotriene receptor antagonist that blocks chemicals causing inflammation in the airways and nasal passages. Levocetirizine is a third-generation antihistamine that effectively relieves allergy symptoms like sneezing, runny nose, watery eyes, and itching. This combination is widely used for allergic rhinitis, bronchial asthma, and urticaria. Manufactured by Healing Pharma.",
      manufacture_date: "2025-01-25",
      expiry_date: "2027-01-25",
      batch_number: "HLC-2025-006",
      composition: "Montelukast Sodium 10mg + Levocetirizine Hydrochloride 5mg",
      dosage: "As directed by the physician. Usually 1 tablet once daily in the evening.",
      image: "/products/healergy-lc.jpg",
      price: "Contact for Price",
      in_stock: true
    },
    {
      name: "Healoxin-OZ Tablets",
      category: "Anti-Infective",
      description: "Ofloxacin & Ornidazole Tablets IP for bacterial and protozoal infections.",
      detailed_description: "Healoxin-OZ is a combination of Ofloxacin and Ornidazole Tablets IP. Ofloxacin is a fluoroquinolone antibiotic that works by inhibiting bacterial DNA gyrase, effective against a wide range of gram-positive and gram-negative bacteria. Ornidazole is a nitroimidazole derivative effective against anaerobic bacteria and protozoa. This combination is prescribed for mixed infections including diarrhea, dysentery, dental infections, pelvic inflammatory disease, and other infections involving both aerobic and anaerobic organisms. Manufactured by Healing Pharma.",
      manufacture_date: "2025-02-05",
      expiry_date: "2027-02-05",
      batch_number: "HOZ-2025-007",
      composition: "Ofloxacin 200mg + Ornidazole 500mg",
      dosage: "As directed by the physician. Usually 1 tablet twice daily after meals.",
      image: "/products/healoxin-oz.jpg",
      price: "Contact for Price",
      in_stock: true
    }
  ];

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
      key: "logo",
      value: JSON.stringify({ text: "Healing Doc Pharma", image: "" })
    },
    {
      key: "hero",
      value: JSON.stringify({
        title: "Quality Healthcare Solutions for Everyone",
        description: "Healing Doc Pharma is committed to delivering high-quality pharmaceutical products that improve lives and promote wellness across communities.",
        image: "/modern-pharmacy-healthcare-professional.jpg"
      })
    },
    {
      key: "directors",
      value: JSON.stringify([
        { id: "1", name: "Dr. Rajesh Kumar", title: "Managing Director", initials: "RK", description: "With over 25 years of experience in pharmaceutical manufacturing, Dr. Kumar leads our vision of providing accessible healthcare solutions to communities nationwide.", image: "", color: "primary" },
        { id: "2", name: "Ms. Priya Sharma", title: "Director of Operations", initials: "PS", description: "Ms. Sharma brings 18 years of operational excellence, ensuring quality standards and efficient distribution across all our service channels.", image: "", color: "accent" },
        { id: "3", name: "Dr. Amit Mehta", title: "Director of Research & Development", initials: "AM", description: "Dr. Mehta heads our R&D division with a focus on innovation and developing pharmaceutical solutions that meet evolving healthcare needs.", image: "", color: "success" },
        { id: "4", name: "Mr. Vikram Singh", title: "Director of Sales & Marketing", initials: "VS", description: "Mr. Singh leads our market expansion strategy with 16 years of pharmaceutical sales expertise, building strong relationships with healthcare providers nationwide.", image: "", color: "primary" },
        { id: "5", name: "Dr. Neha Gupta", title: "Chief Quality Officer", initials: "NG", description: "Dr. Gupta ensures stringent quality control and regulatory compliance with 20 years of pharmaceutical quality management and certification expertise.", image: "", color: "accent" }
      ])
    },
    {
      key: "chairman",
      value: JSON.stringify({
        name: "Mr Aryan Chaubey",
        title: "Chairman & Founder",
        description: "Mr. Aryan Chaubey is the founder and visionary behind Healing Doc Pharma. With 30+ years of pharmaceutical industry experience, he has established the company as a trusted name in quality healthcare solutions. His leadership and commitment to excellence have driven the company's growth and success.",
        image: ""
      })
    },
    {
      key: "contact",
      value: JSON.stringify({
        address: "123 Pharmaceutical Park, Medical District, New Delhi - 110001, India",
        phone: "+91 11 1234 5678",
        email: "info@Healingdocpharma.com",
        fax: "+91 11 1234 5679",
        hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed"
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

  console.log("Database seeded successfully!");
}

seed().catch(console.error);
