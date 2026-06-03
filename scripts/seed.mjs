import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config();

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await sql`DELETE FROM products`;
  await sql`DELETE FROM site_settings`;
  await sql`DELETE FROM testimonials`;
  await sql`DELETE FROM blog_posts`;
  console.log("Cleared existing data.");

  // Seed products (from Healingdoc Pharma Pvt. Ltd. product catalogue)
  const products = [
    {
      name: "Acloheal-SP Tablets",
      category: "Pain Relief",
      description: "Aceclofenac, Paracetamol & Serratiopeptidase Tablets IP for pain, inflammation and swelling.",
      detailed_description: "Acloheal-SP combines Aceclofenac 100mg, Paracetamol 325mg, and Serratiopeptidase 15mg. Aceclofenac is an NSAID that reduces pain and inflammation, Paracetamol acts as an analgesic and antipyretic, and Serratiopeptidase is a proteolytic enzyme that helps reduce swelling. Indicated for treating pain, inflammation and swelling associated with musculoskeletal disorders, joint conditions and post-surgery recovery. Manufactured at WHO-GMP certified facilities.",
      manufacture_date: "2025-01-15",
      expiry_date: "2027-01-15",
      batch_number: "ACSP-2025-001",
      composition: "Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg",
      dosage: "As directed by the physician. Usually 1 tablet twice daily after meals.",
      image: "/products/acloheal-sp.jpg",
      price: "₹130/-",
      in_stock: true
    },
    {
      name: "Acloheal-MR Tablets",
      category: "Pain Relief",
      description: "Aceclofenac, Paracetamol & Chlorzoxazone Tablets to relieve pain, reduce inflammation and relax muscles.",
      detailed_description: "Acloheal-MR combines Aceclofenac 100mg, Paracetamol 325mg, and Chlorzoxazone 250mg. Aceclofenac reduces inflammation and pain, Paracetamol provides additional analgesic and antipyretic effects, and Chlorzoxazone acts as a centrally-acting muscle relaxant. It relieves pain, reduces inflammation and relaxes muscles in conditions such as back pain, neck pain, muscle spasm and sports injuries. Manufactured at WHO-GMP certified facilities.",
      manufacture_date: "2025-01-20",
      expiry_date: "2027-01-20",
      batch_number: "ACMR-2025-002",
      composition: "Aceclofenac 100mg + Paracetamol 325mg + Chlorzoxazone 250mg",
      dosage: "As directed by the physician. Usually 1 tablet twice daily after meals.",
      image: "/products/acloheal-mr.jpg",
      price: "₹115/-",
      in_stock: true
    },
    {
      name: "Healderm Cream",
      category: "Dermatology",
      description: "Ofloxacin, Ornidazole, Itraconazole & Clobetasol Propionate Cream for complex skin infections.",
      detailed_description: "Healderm Cream is a potent combination containing Ofloxacin 0.75%, Ornidazole 2.0%, Itraconazole 1.0% and Clobetasol Propionate 0.05%. Ofloxacin is an antibiotic effective against bacterial skin infections, Ornidazole provides antiprotozoal and anaerobic antibacterial action, Itraconazole is an antifungal agent, and Clobetasol Propionate is a potent corticosteroid that reduces inflammation, itching and redness. Used to treat complex skin infections caused by bacteria, fungi and protozoa. For external use only.",
      manufacture_date: "2025-01-10",
      expiry_date: "2027-01-10",
      batch_number: "HDC-2025-003",
      composition: "Ofloxacin 0.75% + Ornidazole 2.0% + Itraconazole 1.0% + Clobetasol Propionate 0.05% (15gm)",
      dosage: "Apply a thin layer on the affected area as directed by the physician. For external use only.",
      image: "/products/healderm-cream.jpg",
      price: "₹115/-",
      in_stock: true
    },
    {
      name: "Luliderm Cream",
      category: "Dermatology",
      description: "Luliconazole Cream I.P. 1% w/w for superficial fungal skin infections.",
      detailed_description: "Luliderm Cream contains Luliconazole 1% w/w, a broad-spectrum antifungal agent of the azole class. It works by inhibiting the synthesis of ergosterol, an essential component of fungal cell membranes, and is highly effective against dermatophytes. Indicated for superficial skin infections caused by fungi such as tinea pedis (athlete's foot), tinea cruris (jock itch) and tinea corporis (ringworm). For external use only.",
      manufacture_date: "2025-02-10",
      expiry_date: "2027-02-10",
      batch_number: "LDC-2025-004",
      composition: "Luliconazole 1% w/w (30gm)",
      dosage: "Apply once daily to the affected and surrounding area for the prescribed duration. For external use only.",
      image: "/products/lulidrum.jpg",
      price: "₹263/-",
      in_stock: true
    },
    {
      name: "Healergy-LC Tablets",
      category: "Anti-Allergy",
      description: "Montelukast Sodium & Levocetirizine Hydrochloride Tablets IP for allergy and respiratory conditions.",
      detailed_description: "Healergy-LC combines Montelukast Sodium 10mg and Levocetirizine Hydrochloride 5mg. Montelukast is a leukotriene receptor antagonist that blocks chemicals causing inflammation in the airways and nasal passages. Levocetirizine is a third-generation antihistamine that relieves sneezing, runny nose, watery eyes and itching. Indicated for allergic rhinitis, chronic idiopathic urticaria and asthma.",
      manufacture_date: "2025-01-25",
      expiry_date: "2027-01-25",
      batch_number: "HLC-2025-005",
      composition: "Montelukast Sodium 10mg + Levocetirizine Hydrochloride 5mg",
      dosage: "As directed by the physician. Usually 1 tablet once daily in the evening.",
      image: "/products/healergy-lc.jpg",
      price: "₹145/-",
      in_stock: true
    },
    {
      name: "Healoxin-OZ Tablets",
      category: "Anti-Infective",
      description: "Ofloxacin & Ornidazole Tablets IP for bacterial and protozoal infections.",
      detailed_description: "Healoxin-OZ combines Ofloxacin 200mg and Ornidazole 500mg. Ofloxacin is a fluoroquinolone antibiotic effective against a wide range of gram-positive and gram-negative bacteria, while Ornidazole is effective against anaerobic bacteria and protozoa. Indicated for acute diarrhea, amoebic dysentery, gynaecological infections, and pelvic and abdominal infections.",
      manufacture_date: "2025-02-05",
      expiry_date: "2027-02-05",
      batch_number: "HOZ-2025-006",
      composition: "Ofloxacin 200mg + Ornidazole 500mg",
      dosage: "As directed by the physician. Usually 1 tablet twice daily after meals.",
      image: "/products/healoxin-oz.jpg",
      price: "₹115/-",
      in_stock: true
    },
    {
      name: "Diclodoc Gel",
      category: "Topical Pain Relief",
      description: "Diclofenac Diethylamine, Linseed Oil, Methyl Salicylate & Menthol Gel for quick relief from pain, swelling & inflammation.",
      detailed_description: "Diclodoc Gel is a topical formulation containing Diclofenac Diethylamine 1.16%, Linseed Oil 3.0%, Methyl Salicylate 10% and Menthol 5%. Diclofenac provides anti-inflammatory and analgesic action at the site of application, Methyl Salicylate produces a warming sensation and Menthol provides a cooling effect for immediate relief. Indicated for treating joint pain, swelling and stiffness caused by osteoarthritis, particularly in the knee, hands and ankle. For external use only.",
      manufacture_date: "2025-02-01",
      expiry_date: "2027-02-01",
      batch_number: "DDG-2025-007",
      composition: "Diclofenac Diethylamine 1.16% + Linseed Oil 3.0% + Methyl Salicylate 10% + Menthol 5% (15gm)",
      dosage: "Apply a thin layer to the affected area 3-4 times daily. For external use only.",
      image: "/products/dicloheal-gel.jpg",
      price: "₹82/-",
      in_stock: true
    },
    {
      name: "Acloheal-P Tablets",
      category: "Pain Relief",
      description: "Aceclofenac & Paracetamol Tablets IP for arthritis, musculoskeletal pain, fever and inflammation.",
      detailed_description: "Acloheal-P combines Aceclofenac 100mg and Paracetamol 325mg. Aceclofenac is an NSAID that reduces pain and inflammation, while Paracetamol provides analgesic and antipyretic action. Indicated for arthritis pain, musculoskeletal pain, acute injuries, fever and inflammation. Manufactured at WHO-GMP certified facilities.",
      manufacture_date: "2025-01-12",
      expiry_date: "2027-01-12",
      batch_number: "ACP-2025-008",
      composition: "Aceclofenac 100mg + Paracetamol 325mg",
      dosage: "As directed by the physician. Usually 1 tablet twice daily after meals.",
      image: "/products/acloheal-p.jpg",
      price: "₹105/-",
      in_stock: true
    },
    {
      name: "Acloheal-NP Tablets",
      category: "Pain Relief",
      description: "Nimesulide & Paracetamol Tablets for short-term relief of moderate to severe pain, inflammation and fever.",
      detailed_description: "Acloheal-NP combines Nimesulide 100mg and Paracetamol 325mg. Nimesulide is an NSAID with analgesic and anti-inflammatory properties, and Paracetamol provides additional analgesic and antipyretic action. Indicated for short-term relief of moderate to severe pain, inflammation and fever.",
      manufacture_date: "2025-01-18",
      expiry_date: "2027-01-18",
      batch_number: "ANP-2025-009",
      composition: "Nimesulide 100mg + Paracetamol 325mg",
      dosage: "As directed by the physician. Usually 1 tablet twice daily after meals.",
      image: "/products/acloheal-np.jpg",
      price: "₹42/-",
      in_stock: true
    },
    {
      name: "Paraheal-650 Tablets",
      category: "Pain Relief",
      description: "Paracetamol 650mg Tablets IP for fever and pain relief.",
      detailed_description: "Paraheal-650 contains Paracetamol 650mg, an analgesic and antipyretic. Indicated for headaches, migraines, toothaches, muscle pain, backaches, menstrual pain and fever.",
      manufacture_date: "2025-02-08",
      expiry_date: "2027-02-08",
      batch_number: "PH650-2025-010",
      composition: "Paracetamol 650mg",
      dosage: "As directed by the physician. Usually 1 tablet up to three times daily.",
      image: "/products/paraheal-650.jpg",
      price: "₹105/-",
      in_stock: true
    },
    {
      name: "Dicheal Injection",
      category: "Pain Relief",
      description: "Diclofenac Sodium Injection IP (I.M./I.V.) for moderate to severe acute pain and inflammation.",
      detailed_description: "Dicheal Injection contains Diclofenac Sodium 75mg/1ml. Diclofenac is a non-steroidal anti-inflammatory drug (NSAID) used for short-term relief of moderate to severe acute pain and inflammation. For intramuscular or intravenous use as directed by the physician.",
      manufacture_date: "2025-02-12",
      expiry_date: "2027-02-12",
      batch_number: "DCH-2025-011",
      composition: "Diclofenac Sodium 75mg / 1ml",
      dosage: "Administered by a healthcare professional via I.M./I.V. route as directed.",
      image: "/products/dicheal-injection.jpg",
      price: "₹22/-",
      in_stock: true
    },
    {
      name: "Cefidoc-200 Tablets",
      category: "Anti-Infective",
      description: "Cefixime 200mg Dispersible Tablets IP for bacterial infections.",
      detailed_description: "Cefidoc-200 contains Cefixime 200mg, a third-generation cephalosporin antibiotic. Indicated for infections of the ear, throat and tonsils, urinary tract and respiratory tract, including bronchitis and pneumonia.",
      manufacture_date: "2025-01-22",
      expiry_date: "2027-01-22",
      batch_number: "CFD200-2025-012",
      composition: "Cefixime 200mg",
      dosage: "As directed by the physician. Usually 1 tablet twice daily.",
      image: "/products/cefidoc-200.jpg",
      price: "₹113/-",
      in_stock: true
    },
    {
      name: "Cefidoc Oral Suspension",
      category: "Anti-Infective",
      description: "Cefixime Oral Suspension IP for bacterial infections in children.",
      detailed_description: "Cefidoc Oral Suspension contains Cefixime (as Trihydrate) 100mg/5ml, a third-generation cephalosporin antibiotic. Indicated for the treatment of bacterial infections. Reconstitute as directed before use.",
      manufacture_date: "2025-02-15",
      expiry_date: "2027-02-15",
      batch_number: "CFDS-2025-013",
      composition: "Cefixime (as Trihydrate) 100mg/5ml (30ml)",
      dosage: "As directed by the physician based on body weight.",
      image: "/products/cefidoc-suspension.jpg",
      price: "₹54/-",
      in_stock: true
    },
    {
      name: "Pandoc-DSR Capsules",
      category: "Gastro & Anti-Ulcer",
      description: "Pantoprazole Gastro-resistant & Domperidone Prolonged-release Capsules IP for acidity and reflux.",
      detailed_description: "Pandoc-DSR combines Pantoprazole 40mg (gastro-resistant) and Domperidone 30mg (prolonged-release). Pantoprazole is a proton pump inhibitor that reduces stomach acid, and Domperidone is a prokinetic that relieves nausea and bloating. Indicated for gastroesophageal reflux disease (GERD), acid-related indigestion, heartburn and peptic ulcer.",
      manufacture_date: "2025-01-28",
      expiry_date: "2027-01-28",
      batch_number: "PDSR-2025-014",
      composition: "Pantoprazole 40mg + Domperidone 30mg",
      dosage: "As directed by the physician. Usually 1 capsule once daily before breakfast.",
      image: "/products/pandoc-dsr.jpg",
      price: "₹145/-",
      in_stock: true
    },
    {
      name: "Omedoc-20 Capsules",
      category: "Gastro & Anti-Ulcer",
      description: "Omeprazole Gastro-resistant Capsules IP 20mg for acidity and ulcers.",
      detailed_description: "Omedoc-20 contains Omeprazole 20mg, a proton pump inhibitor that reduces gastric acid secretion. Indicated for gastroesophageal reflux disease (GERD), peptic ulcer and duodenal ulcer.",
      manufacture_date: "2025-02-02",
      expiry_date: "2027-02-02",
      batch_number: "OMD20-2025-015",
      composition: "Omeprazole 20mg",
      dosage: "As directed by the physician. Usually 1 capsule once daily before food.",
      image: "/products/omedoc-20.jpg",
      price: "₹47/-",
      in_stock: true
    },
    {
      name: "Panoheal-40 Injection",
      category: "Gastro & Anti-Ulcer",
      description: "Pantoprazole 40mg Injection (I.V.) for acid-related conditions.",
      detailed_description: "Panoheal-40 is a lyophilized Pantoprazole 40mg injection for intravenous use. Pantoprazole is a proton pump inhibitor that reduces gastric acid secretion. Indicated for GERD and pathological hypersecretory conditions. For intravenous use only.",
      manufacture_date: "2025-02-18",
      expiry_date: "2027-02-18",
      batch_number: "PNH40-2025-016",
      composition: "Pantoprazole 40mg injection",
      dosage: "Administered by a healthcare professional via I.V. route as directed.",
      image: "/products/panoheal-40.jpg",
      price: "₹53/-",
      in_stock: true
    },
    {
      name: "Cefdoc-1GM Injection",
      category: "Anti-Infective",
      description: "Ceftriaxone 1gm Injection IP for serious bacterial infections.",
      detailed_description: "Cefdoc-1GM contains Ceftriaxone 1gm, a third-generation cephalosporin antibiotic for intravenous use. Indicated for serious bacterial infections including respiratory tract, urinary tract, skin and soft tissue, and intra-abdominal infections, septicaemia and meningitis. For I.V. use only.",
      manufacture_date: "2025-02-20",
      expiry_date: "2027-02-20",
      batch_number: "CFDC1-2025-017",
      composition: "Ceftriaxone 1gm injection",
      dosage: "Administered by a healthcare professional via I.V. route as directed.",
      image: "/products/cefdoc-1gm.jpg",
      price: "₹66/-",
      in_stock: true
    },
    {
      name: "Healoxin-200 Tablets",
      category: "Anti-Infective",
      description: "Ofloxacin 200mg Tablets IP for a range of bacterial infections.",
      detailed_description: "Healoxin-200 contains Ofloxacin 200mg, a fluoroquinolone antibiotic that inhibits bacterial DNA gyrase. Indicated for various bacterial infections including urinary tract infections (UTI), respiratory tract infections (RTI), skin and soft tissue infections, diarrhea and typhoid.",
      manufacture_date: "2025-01-30",
      expiry_date: "2027-01-30",
      batch_number: "HOX200-2025-018",
      composition: "Ofloxacin 200mg",
      dosage: "As directed by the physician. Usually 1 tablet twice daily.",
      image: "/products/healoxin-200.jpg",
      price: "₹115/-",
      in_stock: true
    },
    {
      name: "Zitroheal-500 Tablets",
      category: "Anti-Infective",
      description: "Azithromycin 500mg Tablets IP for respiratory, ENT and skin infections.",
      detailed_description: "Zitroheal-500 contains Azithromycin 500mg, a macrolide antibiotic. Indicated for respiratory tract infections, throat and ear infections, and skin and soft tissue infections.",
      manufacture_date: "2025-02-22",
      expiry_date: "2027-02-22",
      batch_number: "ZTH500-2025-019",
      composition: "Azithromycin 500mg",
      dosage: "As directed by the physician. Usually 1 tablet once daily.",
      image: "/products/zitroheal-500.jpg",
      price: "₹69.15/-",
      in_stock: true
    },
    {
      name: "Cough-Heal BM Syrup",
      category: "Respiratory Care",
      description: "Terbutaline Sulphate & Bromhexine Hydrochloride Syrup for cough and cold.",
      detailed_description: "Cough-Heal BM is a flavoured syrup containing Terbutaline Sulphate 2.5mg and Bromhexine Hydrochloride 8mg per dose. Terbutaline is a bronchodilator that opens the airways, and Bromhexine is a mucolytic that loosens mucus. Indicated for the treatment of common cold and cough.",
      manufacture_date: "2025-02-25",
      expiry_date: "2027-02-25",
      batch_number: "CHBM-2025-020",
      composition: "Terbutaline Sulphate 2.5mg + Bromhexine Hydrochloride 8mg (flavoured syrup base, 100ml)",
      dosage: "As directed by the physician.",
      image: "/products/cough-heal-bm.jpg",
      price: "₹120/-",
      in_stock: true
    },
    {
      name: "Healzin Tablets",
      category: "Anti-Allergy",
      description: "Cetirizine Hydrochloride Tablets IP to relieve allergy symptoms.",
      detailed_description: "Healzin contains Cetirizine Hydrochloride 10mg, a second-generation antihistamine. Indicated to relieve allergy symptoms including sneezing, runny nose and itchy throat.",
      manufacture_date: "2025-02-06",
      expiry_date: "2027-02-06",
      batch_number: "HZN-2025-021",
      composition: "Cetirizine Hydrochloride 10mg",
      dosage: "As directed by the physician. Usually 1 tablet once daily.",
      image: "/products/healzin.jpg",
      price: "Contact for Price",
      in_stock: true
    },
    {
      name: "Healenzyme Tablets",
      category: "Gastro & Anti-Ulcer",
      description: "Fungal Diastase, Papain & Activated Charcoal Tablets for digestion support.",
      detailed_description: "Healenzyme combines Fungal Diastase 100mg, Papain 60mg and Activated Charcoal 75mg. Fungal Diastase and Papain are digestive enzymes that aid the breakdown of carbohydrates and proteins, while Activated Charcoal helps absorb gas. Indicated to improve distention, reduce gas and bloating, and support enzyme activity in the stomach.",
      manufacture_date: "2025-02-10",
      expiry_date: "2027-02-10",
      batch_number: "HEZ-2025-022",
      composition: "Fungal Diastase 100mg + Papain 60mg + Activated Charcoal 75mg",
      dosage: "As directed by the physician. Usually 1 tablet after meals.",
      image: "/products/healenzyme.jpg",
      price: "Contact for Price",
      in_stock: true
    },
    {
      name: "Healbion Forte-12 Tablets",
      category: "Nutraceuticals",
      description: "Vitamin B-Complex Tablets to help relieve tingling, numbness and weakness.",
      detailed_description: "Healbion Forte-12 is a Vitamin B-Complex supplement containing Thiamine Mononitrate 10mg, Riboflavine 10mg, Pyridoxine Hydrochloride 3mg, Cyanocobalamin 15mcg, Nicotinamide 15mg and Calcium Pantothenate 50mg. It supports nerve health and energy metabolism and helps relieve tingling, numbness and weakness associated with vitamin B deficiency.",
      manufacture_date: "2025-02-14",
      expiry_date: "2027-02-14",
      batch_number: "HBF12-2025-023",
      composition: "Thiamine Mononitrate 10mg + Riboflavine 10mg + Pyridoxine HCl 3mg + Cyanocobalamin 15mcg + Nicotinamide 15mg + Calcium Pantothenate 50mg",
      dosage: "As directed by the physician. Usually 1-2 tablets daily.",
      image: "/products/healbion-forte-12.jpg",
      price: "Contact for Price",
      in_stock: true
    },
    {
      name: "Healmin Tablets",
      category: "Nutraceuticals",
      description: "Lycopene, Multivitamin, Multimineral & Antioxidant with Zinc Tablets.",
      detailed_description: "Healmin is a health supplement containing Lycopene, Multivitamins, Multiminerals and Antioxidants with Zinc. It helps boost immunity, supports heart health and acts as a powerful antioxidant, scavenging free radicals to protect cells from damage. It also provides nutritional support, promotes skin and hair health, and improves energy metabolism.",
      manufacture_date: "2025-02-16",
      expiry_date: "2027-02-16",
      batch_number: "HMN-2025-024",
      composition: "Lycopene + Multivitamins + Multiminerals + Antioxidants with Zinc",
      dosage: "As directed by the physician. Usually 1 tablet daily.",
      image: "/products/healmin.jpg",
      price: "₹120/-",
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
      value: JSON.stringify({ text: "Healingdoc Pharma", image: "" })
    },
    {
      key: "hero",
      value: JSON.stringify({
        title: "Delivering Trust Through Quality Healthcare",
        description: "Healingdoc Pharma Pvt. Ltd. is a rapidly growing pharmaceutical company committed to high-quality, affordable and innovative medicines, manufactured at WHO-GMP certified facilities under strict quality control.",
        image: "/modern-pharmacy-healthcare-professional.jpg"
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
        description: "It gives me immense pleasure to present the product portfolio of Healingdoc Pharma Pvt. Ltd. Our company is committed to delivering high-quality, affordable and innovative healthcare solutions with a strong focus on patient well-being and customer satisfaction. We believe that trust, quality and ethical business practices are the foundation of long-term success. Our products are manufactured at WHO-GMP compliant facilities under strict quality standards to ensure safety, efficacy and consistency, and we remain committed to building strong, transparent relationships with doctors, distributors, retailers and healthcare professionals across India.",
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
      content: "WHO-GMP (World Health Organization - Good Manufacturing Practices) is a globally recognised quality system that governs how medicines are produced and controlled.\n\nWhen a product carries the WHO-GMP mark, it means the manufacturing facility follows strict standards covering raw-material sourcing, hygiene, equipment calibration, batch documentation and final quality testing. Every batch is traceable and tested for safety, efficacy and consistency before it reaches a patient.\n\nAt Healingdoc Pharma Pvt. Ltd., we partner only with WHO-GMP certified manufacturing units. This ensures that whether you are a doctor prescribing our medicines, a distributor stocking them, or a patient taking them, you receive a product of consistent, verifiable quality.\n\nQuality is not a one-time check for us - it is built into every step of the journey from raw material to your hands.",
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
