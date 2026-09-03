/* ============================================================
   AURELIA INTERIORS — Site Data
   All dynamic page content lives here. main.js reads these
   arrays and builds the DOM from them, which keeps the markup
   short and makes the site genuinely data-driven.
   ============================================================ */

/* Business master record ------------------------------------ */
const SITE = {
  name: "Aurelia Interiors",
  tagline: "Interior Design & Turnkey Fit-Out Studio",
  founded: 2013,
  phoneDisplay: "+92 300 123 4567",
  phoneRaw: "+923001234567",
  whatsapp: "923001234567",
  email: "hello@aureliainteriors.pk",
  address: "24-C, MM Alam Road, Gulberg III, Lahore 54660, Pakistan",
  hours: [
    { d: "Monday – Friday", t: "10:00 AM – 7:00 PM" },
    { d: "Saturday",        t: "11:00 AM – 5:00 PM" },
    { d: "Sunday",          t: "Closed" }
  ],
  social: {
    facebook:  "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin:  "https://www.linkedin.com/",
    youtube:   "https://www.youtube.com/"
  }
};

/* Inline SVG icon library ----------------------------------- */
const ICO = {
  layout:  '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  palette: '<circle cx="13.5" cy="6.5" r="1.2"/><circle cx="17.5" cy="10.5" r="1.2"/><circle cx="8.5" cy="7.5" r="1.2"/><circle cx="6.5" cy="12.5" r="1.2"/><path d="M12 2a10 10 0 100 20c.9 0 1.6-.7 1.6-1.6 0-.4-.2-.8-.5-1.1-.3-.3-.4-.6-.4-1 0-.9.7-1.6 1.6-1.6H16a6 6 0 006-6c0-5-4.5-8.7-10-8.7z"/>',
  cube:    '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>',
  tool:    '<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>',
  sun:     '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>',
  moon:    '<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>',
  building:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>',
  truck:   '<rect x="1" y="4" width="14" height="12" rx="1"/><path d="M15 8h4l3.5 3.5V16H15V8z"/><circle cx="5.5" cy="18.5" r="2.3"/><circle cx="18" cy="18.5" r="2.3"/>',
  home:    '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/>',
  check:   '<path d="M20 6L9 17l-5-5"/>',
  checkCir:'<path d="M22 11.1V12a10 10 0 11-5.9-9.1"/><path d="M22 4L12 14.01l-3-3"/>',
  award:   '<circle cx="12" cy="8" r="6"/><path d="M15.5 13.5L17 22l-5-3-5 3 1.5-8.5"/>',
  clock:   '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  users:   '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
  shield:  '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  leaf:    '<path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
  phone:   '<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/>',
  mail:    '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>',
  pin:     '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
  arrow:   '<path d="M5 12h14M13 6l6 6-6 6"/>',
  left:    '<path d="M15 18l-6-6 6-6"/>',
  right:   '<path d="M9 18l6-6-6-6"/>',
  search:  '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  heart:   '<path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 000-7.8z"/>',
  x:       '<path d="M18 6L6 18M6 6l12 12"/>',
  star:    '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z"/>',
  send:    '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>',
  copy:    '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>',
  calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  chat:    '<path d="M21 11.5a8.4 8.4 0 01-9 8.4 8.9 8.9 0 01-4-.9L3 21l1.9-4.9A8.4 8.4 0 0112 3a8.4 8.4 0 019 8.5z"/>',
  up:      '<path d="M12 19V5M5 12l7-7 7 7"/>',
  alert:   '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
  play:    '<path d="M5 3l14 9-14 9V3z"/>',
  ruler:   '<path d="M3 17L17 3l4 4L7 21z"/><path d="M7.5 8.5l2 2M11 5l2 2M4 12l2 2"/>',
  sparkle: '<path d="M12 2l1.9 5.6L19.5 9l-5.6 1.9L12 16.5l-1.9-5.6L4.5 9l5.6-1.4z"/><path d="M18 15l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z"/>'
};

/* Services --------------------------------------------------- */
const SERVICES = [
  { icon:"layout",   title:"Space Planning",
    text:"Every square foot earns its keep. We rework circulation, zoning and daylight before a single colour is chosen.",
    points:["Measured site survey","Zoning & circulation study","Furniture layout options"] },
  { icon:"palette",  title:"Interior Styling",
    text:"Materials, textiles, colour and art curated into one coherent story that suits how you actually live.",
    points:["Material & mood boards","Colour and fabric schemes","Art and accessory curation"] },
  { icon:"cube",     title:"3D Visualisation",
    text:"Photoreal renders and walkthroughs so you approve the finished room before we order a single item.",
    points:["Photoreal still renders","360° virtual walkthrough","Unlimited revision rounds"] },
  { icon:"tool",     title:"Turnkey Fit-Out",
    text:"One contract, one accountable team. We handle demolition, civil work, joinery, MEP and final handover.",
    points:["Vendor & labour management","Weekly site supervision","Snag-free handover"] },
  { icon:"sun",      title:"Lighting Design",
    text:"Layered ambient, task and accent lighting with circuit plans your electrician can build from.",
    points:["Reflected ceiling plans","Fixture specification","Smart & dimming control"] },
  { icon:"building", title:"Commercial Interiors",
    text:"Offices, clinics, cafés and retail designed for footfall, brand identity and staff wellbeing.",
    points:["Workplace strategy","Brand-aligned interiors","Compliance & safety review"] },
  { icon:"truck",    title:"Custom Furniture",
    text:"Built in our own Lahore workshop from seasoned hardwood, veneer and honest joinery.",
    points:["Bespoke wardrobes & beds","Kitchen and vanity joinery","5-year workmanship warranty"] },
  { icon:"leaf",     title:"Renovation & Restoration",
    text:"Sympathetic upgrades to older homes — new services, better insulation, original character kept intact.",
    points:["Structural & MEP audit","Heritage-sensitive detailing","Phased, liveable schedules"] }
];

/* Projects (portfolio) --------------------------------------- */
const PROJECTS = [
  { id:"p01", img:"proj-01.jpg", title:"Canal View Residence", cat:"residential", catLabel:"Residential",
    location:"Canal View, Lahore", year:2024, area:"3,200 sq ft", duration:"14 weeks", budget:"PKR 9.4 M",
    tag:"Featured", featured:true, scope:"Full home design & fit-out",
    text:"A light-first renovation for a young family. We removed two internal walls, lifted the ceiling line and rebuilt the living wing around a single north-facing glazed bay." },
  { id:"p02", img:"proj-02.jpg", title:"Bedian Road Villa", cat:"renovation", catLabel:"Renovation",
    location:"Bedian Road, Lahore", year:2023, area:"5,800 sq ft", duration:"28 weeks", budget:"PKR 24.0 M",
    tag:"Award Winner", featured:true, scope:"Architecture & interiors",
    text:"A dated 1990s bungalow rebuilt as a warm, contemporary villa — new envelope, deep timber reveals and a courtyard that pulls evening light into the plan." },
  { id:"p03", img:"proj-03.jpg", title:"DHA Phase 6 Family Home", cat:"residential", catLabel:"Residential",
    location:"DHA Phase 6, Lahore", year:2024, area:"4,100 sq ft", duration:"18 weeks", budget:"PKR 12.6 M",
    tag:"", featured:true, scope:"Living, dining & stair hall",
    text:"An open-plan ground floor anchored by a floating oak stair. Hard-wearing, dog-friendly finishes throughout without losing an ounce of elegance." },
  { id:"p04", img:"proj-04.jpg", title:"Askari Heights Apartment", cat:"residential", catLabel:"Residential",
    location:"Askari X, Lahore", year:2023, area:"1,850 sq ft", duration:"9 weeks", budget:"PKR 5.2 M",
    tag:"", featured:false, scope:"Interior styling & joinery",
    text:"A serene bone-and-plaster palette with arched niches, bouclé seating and brushed brass detailing for a couple who wanted calm above all." },
  { id:"p05", img:"proj-05.jpg", title:"Gulberg Gallery Loft", cat:"residential", catLabel:"Residential",
    location:"Gulberg II, Lahore", year:2024, area:"2,400 sq ft", duration:"11 weeks", budget:"PKR 7.8 M",
    tag:"New", featured:true, scope:"Interiors & art curation",
    text:"Built around a growing photography collection: a full-height gallery wall, museum-grade track lighting and tan leather that will only get better with age." },
  { id:"p06", img:"proj-06.jpg", title:"Model Town Bungalow", cat:"residential", catLabel:"Residential",
    location:"Model Town, Lahore", year:2022, area:"3,600 sq ft", duration:"16 weeks", budget:"PKR 8.9 M",
    tag:"", featured:false, scope:"Full home design",
    text:"Sage green, rattan and a deep plant scheme soften a very square 1970s plan. Handwoven pendants were commissioned from artisans in Chiniot." },
  { id:"p07", img:"proj-07.jpg", title:"Studio 402, Emporium", cat:"renovation", catLabel:"Renovation",
    location:"Johar Town, Lahore", year:2023, area:"640 sq ft", duration:"6 weeks", budget:"PKR 2.4 M",
    tag:"Compact", featured:false, scope:"Micro-apartment conversion",
    text:"A 640 sq ft studio gains a real kitchen, a sleeping alcove and a work nook — proof that small plans reward good planning most of all." },
  { id:"p08", img:"proj-08.jpg", title:"Meridian Tech Offices", cat:"commercial", catLabel:"Commercial",
    location:"Arfa Tower, Lahore", year:2024, area:"11,000 sq ft", duration:"20 weeks", budget:"PKR 31.5 M",
    tag:"Featured", featured:true, scope:"Workplace design & fit-out",
    text:"Two floors for a 140-person software team. Acoustic glass pods, a quiet library floor and daylight reaching every desk on the plate." },
  { id:"p09", img:"proj-09.jpg", title:"The Foundry Co-Work", cat:"commercial", catLabel:"Commercial",
    location:"Ferozepur Road, Lahore", year:2023, area:"7,400 sq ft", duration:"17 weeks", budget:"PKR 19.2 M",
    tag:"", featured:false, scope:"Adaptive reuse",
    text:"A disused textile shed becomes a co-working floor: original trusses exposed, black steel glazing, and a 14-metre communal table cut from single slabs." },
  { id:"p10", img:"proj-10.jpg", title:"Bahria Orchard Residence", cat:"residential", catLabel:"Residential",
    location:"Bahria Orchard, Lahore", year:2024, area:"2,900 sq ft", duration:"12 weeks", budget:"PKR 7.1 M",
    tag:"", featured:false, scope:"Interiors & furniture",
    text:"Warm neutrals, curved upholstery and woven wall discs. Every piece in this room was made within 40 km of the site." },
  { id:"p11", img:"proj-11.jpg", title:"Cavalry Ground Kitchen", cat:"kitchen", catLabel:"Kitchen",
    location:"Cavalry Ground, Lahore", year:2023, area:"310 sq ft", duration:"7 weeks", budget:"PKR 3.8 M",
    tag:"", featured:false, scope:"Kitchen design & joinery",
    text:"A bright modern-classic kitchen: shaker fronts in soft white, open walnut shelving and a marble-effect quartz run that shrugs off daily cooking." },
  { id:"p12", img:"proj-12.jpg", title:"Sage Kitchen, Johar Town", cat:"kitchen", catLabel:"Kitchen",
    location:"Johar Town, Lahore", year:2024, area:"280 sq ft", duration:"6 weeks", budget:"PKR 4.2 M",
    tag:"New", featured:true, scope:"Kitchen & pantry",
    text:"Deep sage cabinetry, handmade zellige tile and warm brass hardware — a hard-working family kitchen that still feels like a room, not an appliance." },
  { id:"p13", img:"proj-13.jpg", title:"Lake City Penthouse", cat:"residential", catLabel:"Residential",
    location:"Lake City, Lahore", year:2022, area:"4,600 sq ft", duration:"22 weeks", budget:"PKR 16.4 M",
    tag:"", featured:false, scope:"Full turnkey fit-out",
    text:"Two apartments combined into one penthouse. A 12-metre sightline runs from the entry door to the terrace glazing, framed the whole way." },
  { id:"p14", img:"proj-14.jpg", title:"Atrium House", cat:"residential", catLabel:"Residential",
    location:"DHA Phase 5, Lahore", year:2023, area:"3,900 sq ft", duration:"19 weeks", budget:"PKR 13.8 M",
    tag:"", featured:false, scope:"Stair hall & interiors",
    text:"A double-height atrium with a hand-built oak-and-blackened-steel stair, lit from a new roof lantern we cut into the existing slab." },
  { id:"p15", img:"proj-15.jpg", title:"Herringbone Flat", cat:"renovation", catLabel:"Renovation",
    location:"Garden Town, Lahore", year:2022, area:"1,400 sq ft", duration:"8 weeks", budget:"PKR 4.6 M",
    tag:"", featured:false, scope:"Refurbishment",
    text:"The original herringbone parquet was salvaged, sanded and relaid. Everything else — services, joinery, glazing — is new behind the scenes." },
  { id:"p16", img:"proj-16.jpg", title:"Mint & Ash Apartment", cat:"residential", catLabel:"Residential",
    location:"Gulberg III, Lahore", year:2024, area:"1,650 sq ft", duration:"9 weeks", budget:"PKR 5.9 M",
    tag:"", featured:false, scope:"Interior styling",
    text:"A soft mint-and-ash scheme with layered textiles for a first-time buyer — a complete look delivered inside a firmly fixed budget." }
];

const FILTERS = [
  { key:"all",         label:"All Projects" },
  { key:"residential", label:"Residential"  },
  { key:"commercial",  label:"Commercial"   },
  { key:"kitchen",     label:"Kitchens"     },
  { key:"renovation",  label:"Renovation"   }
];

/* Pricing packages ------------------------------------------- */
const PACKAGES = [
  { name:"Consult",  price:"25,000",  unit:"one-off visit", best:false,
    for:"Homeowners who want expert direction and will run the work themselves.",
    f:{ visit:true, moodboard:true, layout:true, render:false, boq:false, site:false, warranty:false }, delivery:"3 – 5 days" },
  { name:"Design",   price:"180",     unit:"per sq ft", best:true,
    for:"A complete, buildable design pack — you appoint your own contractor.",
    f:{ visit:true, moodboard:true, layout:true, render:true, boq:true, site:false, warranty:false }, delivery:"3 – 5 weeks" },
  { name:"Turnkey",  price:"2,400",   unit:"per sq ft", best:false,
    for:"Design plus execution. One contract, one team, a finished room.",
    f:{ visit:true, moodboard:true, layout:true, render:true, boq:true, site:true, warranty:true }, delivery:"8 – 20 weeks" },
  { name:"Commercial", price:"On request", unit:"tendered", best:false,
    for:"Offices, clinics, retail and hospitality above 4,000 sq ft.",
    f:{ visit:true, moodboard:true, layout:true, render:true, boq:true, site:true, warranty:true }, delivery:"12 – 30 weeks" }
];
const PACKAGE_ROWS = [
  { key:"visit",     label:"On-site consultation & measured survey" },
  { key:"moodboard", label:"Concept board & material palette" },
  { key:"layout",    label:"Space plan and furniture layout" },
  { key:"render",    label:"3D photoreal renders" },
  { key:"boq",       label:"Working drawings & bill of quantities" },
  { key:"site",      label:"Execution, procurement & site supervision" },
  { key:"warranty",  label:"5-year workmanship warranty" }
];

/* Furniture products ----------------------------------------- */
const PRODUCTS = [
  { img:"prod-sofa-green.jpg", cat:"Seating",  name:"Marlowe 3-Seater",   text:"Kiln-dried sheesham frame, cotton-velvet upholstery, feather-wrapped foam cushions.", price:"PKR 165,000", was:"PKR 198,000" },
  { img:"prod-sofa-terra.jpg", cat:"Seating",  name:"Nadia Loveseat",     text:"Compact two-seater in terracotta boucle — made for apartments and reading corners.", price:"PKR 112,000", was:"" },
  { img:"prod-wall-unit.jpg",  cat:"Storage",  name:"Linea Wall System",  text:"Wall-hung oak media unit with cable management and soft-close push drawers.", price:"PKR 148,000", was:"PKR 172,000" },
  { img:"prod-bedding.jpg",    cat:"Bedroom",  name:"Sahar Linen Set",    text:"Stone-washed 100% flax linen — duvet cover, fitted sheet and two pillowcases.", price:"PKR 28,500", was:"" }
];

/* Team -------------------------------------------------------- */
const TEAM = [
  { img:"team-1.jpg", name:"Zohaib Rahman", role:"Founder & Principal Designer",
    bio:"NCA-trained architect with 16 years across residential and hospitality interiors." },
  { img:"team-2.jpg", name:"Ayesha Nadeem", role:"Head of Interior Design",
    bio:"Leads concept and styling. Obsessive about material honesty and natural light." },
  { img:"team-3.jpg", name:"Faisal Iqbal",  role:"Project & Site Director",
    bio:"Runs every site from demolition to handover. Has never missed a handover date." },
  { img:"team-4.jpg", name:"Hina Bashir",   role:"3D Visualiser & Colourist",
    bio:"Turns drawings into renders clients can genuinely trust before a rupee is spent." }
];

/* Testimonials ------------------------------------------------ */
const TESTIMONIALS = [
  { img:"avatar-1.jpg", name:"Sana Mahmood", role:"Homeowner · DHA Phase 6", stars:5,
    text:"They listened far more than they talked. The plan they came back with solved problems in our house that we had simply learned to live with for eleven years." },
  { img:"avatar-2.jpg", name:"Bilal Chaudhry", role:"CEO · Meridian Technologies", stars:5,
    text:"Eleven thousand square feet, a hard deadline and a live team moving in. Aurelia handed over two days early with a snag list of four items. Genuinely exceptional." },
  { img:"avatar-3.jpg", name:"Dr. Imran Sheikh", role:"Client · Model Town Bungalow", stars:5,
    text:"What sold me was the 3D walkthrough — I could see the finished room before we spent anything. The built result matched it almost exactly." }
];

/* FAQs -------------------------------------------------------- */
const FAQS = [
  { q:"How much does an interior project cost in Lahore?",
    a:"Design-only packs start at PKR 180 per square foot. Turnkey fit-out typically lands between PKR 2,200 and PKR 3,400 per square foot depending on joinery, stone and lighting specification. We issue a fixed bill of quantities before work begins, so the number you approve is the number you pay." },
  { q:"How long does a typical home project take?",
    a:"A styling-only apartment takes 6 to 9 weeks. A full home design-and-build runs 14 to 22 weeks, and larger villas or commercial floors 20 to 30 weeks. We publish a week-by-week programme at kick-off and update it every Friday." },
  { q:"Do you work outside Lahore?",
    a:"Yes. We regularly deliver projects in Islamabad, Rawalpindi, Faisalabad and Multan, and have completed two residences in Dubai. Sites beyond 150 km carry a travel and supervision surcharge quoted upfront." },
  { q:"Can I use my existing furniture?",
    a:"Absolutely, and we encourage it. We photograph and measure everything you want to keep during the survey, then design around those pieces — reupholstering or refinishing where it makes sense." },
  { q:"What happens if I only want the design, not the build?",
    a:"That is our Design package. You receive the full drawing set, specifications and bill of quantities, and you are free to appoint any contractor. We can also review their quotes for you at no extra charge." },
  { q:"Is there a warranty on the work?",
    a:"Turnkey and Commercial projects carry a 5-year workmanship warranty on all joinery and site works we execute, plus the manufacturer warranty on every appliance and fitting we supply." }
];

/* Company milestones ----------------------------------------- */
const MILESTONES = [
  { y:"2013", t:"The studio opens", d:"Zohaib Rahman starts Aurelia from a two-room office in Gulberg with one draughtsman and a borrowed plotter." },
  { y:"2016", t:"First commercial floor", d:"A 6,000 sq ft office fit-out on Ferozepur Road takes the studio beyond residential work for the first time." },
  { y:"2019", t:"Workshop opens", d:"We bring joinery in-house — a 9,000 sq ft workshop in Sundar Industrial Estate with fourteen craftsmen." },
  { y:"2022", t:"Hundredth project", d:"Lake City Penthouse becomes our 100th completed handover, and our first published in a national design title." },
  { y:"2026", t:"Where we are now", d:"A 24-person studio delivering roughly thirty projects a year across Pakistan, with a design office in Islamabad." }
];

/* Awards (rendered as a table) -------------------------------- */
const AWARDS = [
  { year:"2025", award:"Residential Project of the Year", body:"Pakistan Design Awards",        project:"Bedian Road Villa",   result:"Winner"   },
  { year:"2024", award:"Best Workplace Interior",         body:"South Asia Interiors Council",  project:"Meridian Tech Offices", result:"Winner" },
  { year:"2024", award:"Adaptive Reuse Award",            body:"Lahore Architecture Forum",     project:"The Foundry Co-Work", result:"Finalist" },
  { year:"2023", award:"Emerging Studio of the Year",     body:"Design Pakistan",               project:"Studio Portfolio",    result:"Winner"   },
  { year:"2022", award:"Kitchen Design Excellence",       body:"Home & Living Pakistan",        project:"Cavalry Ground Kitchen", result:"Highly Commended" }
];

/* Home page hero slides --------------------------------------- */
const SLIDES = [
  { img:"hero-1.jpg", eyebrow:"Lahore · Est. 2013",
    h:"Spaces that hold <em>a life</em>, not just furniture.",
    p:"Aurelia Interiors designs and builds homes, offices and kitchens across Pakistan — from the first sketch to the day you move in." },
  { img:"hero-2.jpg", eyebrow:"Turnkey Fit-Out",
    h:"One studio. One contract. <em>Zero</em> hand-offs.",
    p:"Design, joinery, MEP and site supervision under a single accountable roof — which is why our projects finish on the week we promised." },
  { img:"hero-3.jpg", eyebrow:"170+ Completed Projects",
    h:"Detail you can <em>feel</em> in the dark.",
    p:"Solid hardwood, honest joinery and lighting designed layer by layer. Made in our own Lahore workshop by craftsmen we employ directly." }
];
