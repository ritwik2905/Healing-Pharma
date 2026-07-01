// Single source of truth for the Healingdoc Pharma product catalogue.
//
// Both `scripts/seed.mjs` (full database seed) and
// `scripts/replace-catalogue.mjs` (products + categories only) import from
// here so the two can never drift apart.
//
// The product set and their indications come from the official INDICATION
// document supplied by the client. Categories are the admin-managed list that
// drives the "Category" dropdown when adding/editing a product and the filter
// chips on the public /products page.

// Categories, in the display order used on the public catalogue.
export const categories = [
  "Pain Relief",
  "Anti-Infective",
  "Gastro & Anti-Ulcer",
  "Anti-Allergy",
  "Dermatology",
  "Nutraceuticals",
]

// The 18 products from the INDICATION document. Grouped by category in the same
// order as `categories` above (products are grouped on the /products page in the
// order they first appear, so insertion order controls the section order).
export const products = [
  // ── Pain Relief ────────────────────────────────────────────────────────
  {
    name: "Acloheal-P Tablets",
    category: "Pain Relief",
    description: "Aceclofenac & Paracetamol Tablets IP for arthritis, musculoskeletal pain, fever and inflammation.",
    detailed_description:
      "Acloheal-P combines Aceclofenac 100mg and Paracetamol 325mg. Aceclofenac is an NSAID that reduces pain and inflammation, while Paracetamol provides analgesic and antipyretic action. Indicated for arthritis pain, musculoskeletal pain, acute injuries, fever and inflammation. Manufactured at WHO-GMP certified facilities.",
    manufacture_date: "2025-01-12",
    expiry_date: "2027-01-12",
    batch_number: "ACP-2025-008",
    composition: "Aceclofenac 100mg + Paracetamol 325mg",
    dosage: "As directed by the physician. Usually 1 tablet twice daily after meals.",
    image: "/products/acloheal-p.jpg",
    price: "₹105/-",
    in_stock: true,
  },
  {
    name: "Acloheal-SP Tablets",
    category: "Pain Relief",
    description: "Aceclofenac, Paracetamol & Serratiopeptidase Tablets IP for pain, inflammation and swelling.",
    detailed_description:
      "Acloheal-SP combines Aceclofenac 100mg, Paracetamol 325mg, and Serratiopeptidase 15mg. Aceclofenac is an NSAID that reduces pain and inflammation, Paracetamol acts as an analgesic and antipyretic, and Serratiopeptidase is a proteolytic enzyme that helps reduce swelling. Indicated for treating pain, inflammation and swelling associated with musculoskeletal disorders, joint conditions and post-surgery recovery. Manufactured at WHO-GMP certified facilities.",
    manufacture_date: "2025-01-15",
    expiry_date: "2027-01-15",
    batch_number: "ACSP-2025-001",
    composition: "Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg",
    dosage: "As directed by the physician. Usually 1 tablet twice daily after meals.",
    image: "/products/acloheal-sp.jpg",
    price: "₹130/-",
    in_stock: true,
  },
  {
    name: "Acloheal-MR Tablets",
    category: "Pain Relief",
    description:
      "Aceclofenac, Paracetamol & Chlorzoxazone Tablets to relieve pain, reduce inflammation and relax muscles.",
    detailed_description:
      "Acloheal-MR combines Aceclofenac 100mg, Paracetamol 325mg, and Chlorzoxazone 250mg. Aceclofenac reduces inflammation and pain, Paracetamol provides additional analgesic and antipyretic effects, and Chlorzoxazone acts as a centrally-acting muscle relaxant. It relieves pain, reduces inflammation and relaxes muscles in conditions such as back pain, neck pain, muscle spasm and sports injuries. Manufactured at WHO-GMP certified facilities.",
    manufacture_date: "2025-01-20",
    expiry_date: "2027-01-20",
    batch_number: "ACMR-2025-002",
    composition: "Aceclofenac 100mg + Paracetamol 325mg + Chlorzoxazone 250mg",
    dosage: "As directed by the physician. Usually 1 tablet twice daily after meals.",
    image: "/products/acloheal-mr.jpg",
    price: "₹115/-",
    in_stock: true,
  },
  {
    name: "Acloheal-NP Tablets",
    category: "Pain Relief",
    description: "Nimesulide & Paracetamol Tablets for short-term relief of moderate to severe pain, inflammation and fever.",
    detailed_description:
      "Acloheal-NP combines Nimesulide 100mg and Paracetamol 325mg. Nimesulide is an NSAID with analgesic and anti-inflammatory properties, and Paracetamol provides additional analgesic and antipyretic action. Indicated for short-term relief of moderate to severe pain, inflammation and fever.",
    manufacture_date: "2025-01-18",
    expiry_date: "2027-01-18",
    batch_number: "ANP-2025-009",
    composition: "Nimesulide 100mg + Paracetamol 325mg",
    dosage: "As directed by the physician. Usually 1 tablet twice daily after meals.",
    image: "/products/acloheal-np.jpg",
    price: "₹42/-",
    in_stock: true,
  },
  {
    name: "Diclodoc Gel",
    category: "Pain Relief",
    description:
      "Diclofenac Diethylamine, Linseed Oil, Methyl Salicylate & Menthol Gel for quick relief from pain, swelling & inflammation.",
    detailed_description:
      "Diclodoc Gel is a topical formulation containing Diclofenac Diethylamine 1.16%, Linseed Oil 3.0%, Methyl Salicylate 10% and Menthol 5%. Diclofenac provides anti-inflammatory and analgesic action at the site of application, Methyl Salicylate produces a warming sensation and Menthol provides a cooling effect for immediate relief. Indicated for treating joint pain, swelling and stiffness caused by osteoarthritis, particularly in the knee, hands and ankle. For external use only.",
    manufacture_date: "2025-02-01",
    expiry_date: "2027-02-01",
    batch_number: "DDG-2025-007",
    composition: "Diclofenac Diethylamine 1.16% + Linseed Oil 3.0% + Methyl Salicylate 10% + Menthol 5% (15gm)",
    dosage: "Apply a thin layer to the affected area 3-4 times daily. For external use only.",
    image: "/products/dicloheal-gel.jpg",
    price: "₹82/-",
    in_stock: true,
  },
  {
    name: "Paraheal-650 Tablets",
    category: "Pain Relief",
    description: "Paracetamol 650mg Tablets IP for fever and pain relief.",
    detailed_description:
      "Paraheal-650 contains Paracetamol 650mg, an analgesic and antipyretic. Indicated for headaches, migraines, toothaches, muscle pain, backaches, menstrual pain and fever.",
    manufacture_date: "2025-02-08",
    expiry_date: "2027-02-08",
    batch_number: "PH650-2025-010",
    composition: "Paracetamol 650mg",
    dosage: "As directed by the physician. Usually 1 tablet up to three times daily.",
    image: "/products/paraheal-650.jpg",
    price: "₹105/-",
    in_stock: true,
  },

  // ── Anti-Infective ─────────────────────────────────────────────────────
  {
    name: "Cefidoc-200 Tablets",
    category: "Anti-Infective",
    description: "Cefixime 200mg Dispersible Tablets IP for bacterial infections.",
    detailed_description:
      "Cefidoc-200 contains Cefixime 200mg, a third-generation cephalosporin antibiotic. Indicated for infections of the ear, throat and tonsils, urinary tract and respiratory tract, including bronchitis and pneumonia.",
    manufacture_date: "2025-01-22",
    expiry_date: "2027-01-22",
    batch_number: "CFD200-2025-012",
    composition: "Cefixime 200mg",
    dosage: "As directed by the physician. Usually 1 tablet twice daily.",
    image: "/products/cefidoc-200.jpg",
    price: "₹113/-",
    in_stock: true,
  },
  {
    name: "Zitroheal-500 Tablets",
    category: "Anti-Infective",
    description: "Azithromycin 500mg Tablets IP for respiratory, ENT and skin infections.",
    detailed_description:
      "Zitroheal-500 contains Azithromycin 500mg, a macrolide antibiotic. Indicated for respiratory tract infections, throat and ear infections, and skin and soft tissue infections.",
    manufacture_date: "2025-02-22",
    expiry_date: "2027-02-22",
    batch_number: "ZTH500-2025-019",
    composition: "Azithromycin 500mg",
    dosage: "As directed by the physician. Usually 1 tablet once daily.",
    image: "/products/zitroheal-500.jpg",
    price: "₹69.15/-",
    in_stock: true,
  },
  {
    name: "Healoxin-OZ Tablets",
    category: "Anti-Infective",
    description: "Ofloxacin & Ornidazole Tablets IP for bacterial and protozoal infections.",
    detailed_description:
      "Healoxin-OZ combines Ofloxacin 200mg and Ornidazole 500mg. Ofloxacin is a fluoroquinolone antibiotic effective against a wide range of gram-positive and gram-negative bacteria, while Ornidazole is effective against anaerobic bacteria and protozoa. Indicated for acute diarrhea, amoebic dysentery, gynaecological infections, and pelvic and abdominal infections.",
    manufacture_date: "2025-02-05",
    expiry_date: "2027-02-05",
    batch_number: "HOZ-2025-006",
    composition: "Ofloxacin 200mg + Ornidazole 500mg",
    dosage: "As directed by the physician. Usually 1 tablet twice daily after meals.",
    image: "/products/healoxin-oz.jpg",
    price: "₹115/-",
    in_stock: true,
  },
  {
    name: "Healoxin-200 Tablets",
    category: "Anti-Infective",
    description: "Ofloxacin 200mg Tablets IP for a range of bacterial infections.",
    detailed_description:
      "Healoxin-200 contains Ofloxacin 200mg, a fluoroquinolone antibiotic that inhibits bacterial DNA gyrase. Indicated for various bacterial infections including urinary tract infections (UTI), respiratory tract infections (RTI), skin and soft tissue infections, diarrhea and typhoid.",
    manufacture_date: "2025-01-30",
    expiry_date: "2027-01-30",
    batch_number: "HOX200-2025-018",
    composition: "Ofloxacin 200mg",
    dosage: "As directed by the physician. Usually 1 tablet twice daily.",
    image: "/products/healoxin-200.jpg",
    price: "₹115/-",
    in_stock: true,
  },

  // ── Gastro & Anti-Ulcer ────────────────────────────────────────────────
  {
    name: "Pandoc-DSR Capsules",
    category: "Gastro & Anti-Ulcer",
    description: "Pantoprazole Gastro-resistant & Domperidone Prolonged-release Capsules IP for acidity and reflux.",
    detailed_description:
      "Pandoc-DSR combines Pantoprazole 40mg (gastro-resistant) and Domperidone 30mg (prolonged-release). Pantoprazole is a proton pump inhibitor that reduces stomach acid, and Domperidone is a prokinetic that relieves nausea and bloating. Indicated for gastroesophageal reflux disease (GERD), acid-related indigestion, heartburn and peptic ulcer.",
    manufacture_date: "2025-01-28",
    expiry_date: "2027-01-28",
    batch_number: "PDSR-2025-014",
    composition: "Pantoprazole 40mg + Domperidone 30mg",
    dosage: "As directed by the physician. Usually 1 capsule once daily before breakfast.",
    image: "/products/pandoc-dsr.jpg",
    price: "₹145/-",
    in_stock: true,
  },
  {
    name: "Omedoc-20 Capsules",
    category: "Gastro & Anti-Ulcer",
    description: "Omeprazole Gastro-resistant Capsules IP 20mg for acidity and ulcers.",
    detailed_description:
      "Omedoc-20 contains Omeprazole 20mg, a proton pump inhibitor that reduces gastric acid secretion. Indicated for gastroesophageal reflux disease (GERD), peptic ulcer and duodenal ulcer.",
    manufacture_date: "2025-02-02",
    expiry_date: "2027-02-02",
    batch_number: "OMD20-2025-015",
    composition: "Omeprazole 20mg",
    dosage: "As directed by the physician. Usually 1 capsule once daily before food.",
    image: "/products/omedoc-20.jpg",
    price: "₹47/-",
    in_stock: true,
  },
  {
    name: "Panoheal-40 Injection",
    category: "Gastro & Anti-Ulcer",
    description: "Pantoprazole 40mg Injection (I.V.) for acid-related conditions.",
    detailed_description:
      "Panoheal-40 is a lyophilized Pantoprazole 40mg injection for intravenous use. Pantoprazole is a proton pump inhibitor that reduces gastric acid secretion. Indicated for GERD and pathological hypersecretory conditions. For intravenous use only.",
    manufacture_date: "2025-02-18",
    expiry_date: "2027-02-18",
    batch_number: "PNH40-2025-016",
    composition: "Pantoprazole 40mg injection",
    dosage: "Administered by a healthcare professional via I.V. route as directed.",
    image: "/products/panoheal-40.jpg",
    price: "₹53/-",
    in_stock: true,
  },

  // ── Anti-Allergy ───────────────────────────────────────────────────────
  {
    name: "Healergy-LC Tablets",
    category: "Anti-Allergy",
    description: "Montelukast Sodium & Levocetirizine Hydrochloride Tablets IP for allergy and respiratory conditions.",
    detailed_description:
      "Healergy-LC combines Montelukast Sodium 10mg and Levocetirizine Hydrochloride 5mg. Montelukast is a leukotriene receptor antagonist that blocks chemicals causing inflammation in the airways and nasal passages. Levocetirizine is a third-generation antihistamine that relieves sneezing, runny nose, watery eyes and itching. Indicated for allergic rhinitis, chronic idiopathic urticaria and asthma.",
    manufacture_date: "2025-01-25",
    expiry_date: "2027-01-25",
    batch_number: "HLC-2025-005",
    composition: "Montelukast Sodium 10mg + Levocetirizine Hydrochloride 5mg",
    dosage: "As directed by the physician. Usually 1 tablet once daily in the evening.",
    image: "/products/healergy-lc.jpg",
    price: "₹145/-",
    in_stock: true,
  },
  {
    name: "Healzin Tablets",
    category: "Anti-Allergy",
    description: "Cetirizine Hydrochloride Tablets IP to relieve allergy symptoms.",
    detailed_description:
      "Healzin contains Cetirizine Hydrochloride 10mg, a second-generation antihistamine. Indicated to relieve allergy symptoms including sneezing, runny nose and itchy throat.",
    manufacture_date: "2025-02-06",
    expiry_date: "2027-02-06",
    batch_number: "HZN-2025-021",
    composition: "Cetirizine Hydrochloride 10mg",
    dosage: "As directed by the physician. Usually 1 tablet once daily.",
    image: "/products/healzin.jpg",
    price: "Contact for Price",
    in_stock: true,
  },

  // ── Dermatology ────────────────────────────────────────────────────────
  {
    name: "Healderm Cream",
    category: "Dermatology",
    description: "Ofloxacin, Ornidazole, Itraconazole & Clobetasol Propionate Cream for complex skin infections.",
    detailed_description:
      "Healderm Cream is a potent combination containing Ofloxacin 0.75%, Ornidazole 2.0%, Itraconazole 1.0% and Clobetasol Propionate 0.05%. Ofloxacin is an antibiotic effective against bacterial skin infections, Ornidazole provides antiprotozoal and anaerobic antibacterial action, Itraconazole is an antifungal agent, and Clobetasol Propionate is a potent corticosteroid that reduces inflammation, itching and redness. Used to treat complex skin infections caused by bacteria, fungi and protozoa. For external use only.",
    manufacture_date: "2025-01-10",
    expiry_date: "2027-01-10",
    batch_number: "HDC-2025-003",
    composition: "Ofloxacin 0.75% + Ornidazole 2.0% + Itraconazole 1.0% + Clobetasol Propionate 0.05% (15gm)",
    dosage: "Apply a thin layer on the affected area as directed by the physician. For external use only.",
    image: "/products/healderm-cream.jpg",
    price: "₹115/-",
    in_stock: true,
  },
  {
    name: "Luliderm Cream",
    category: "Dermatology",
    description: "Luliconazole Cream I.P. 1% w/w for superficial fungal skin infections.",
    detailed_description:
      "Luliderm Cream contains Luliconazole 1% w/w, a broad-spectrum antifungal agent of the azole class. It works by inhibiting the synthesis of ergosterol, an essential component of fungal cell membranes, and is highly effective against dermatophytes. Indicated for superficial skin infections caused by fungi such as tinea pedis (athlete's foot), tinea cruris (jock itch) and tinea corporis (ringworm). For external use only.",
    manufacture_date: "2025-02-10",
    expiry_date: "2027-02-10",
    batch_number: "LDC-2025-004",
    composition: "Luliconazole 1% w/w (30gm)",
    dosage: "Apply once daily to the affected and surrounding area for the prescribed duration. For external use only.",
    image: "/products/lulidrum.jpg",
    price: "₹263/-",
    in_stock: true,
  },

  // ── Nutraceuticals ─────────────────────────────────────────────────────
  {
    name: "Healmin Tablets",
    category: "Nutraceuticals",
    description: "Lycopene, Multivitamin, Multimineral & Antioxidant with Zinc Tablets.",
    detailed_description:
      "Healmin is a health supplement containing Lycopene, Multivitamins, Multiminerals and Antioxidants with Zinc. It helps boost immunity, supports heart health and acts as a powerful antioxidant, scavenging free radicals to protect cells from damage. It also provides nutritional support, promotes skin and hair health, and improves energy metabolism.",
    manufacture_date: "2025-02-16",
    expiry_date: "2027-02-16",
    batch_number: "HMN-2025-024",
    composition: "Lycopene + Multivitamins + Multiminerals + Antioxidants with Zinc",
    dosage: "As directed by the physician. Usually 1 tablet daily.",
    image: "/products/healmin.jpg",
    price: "₹120/-",
    in_stock: true,
  },
]
