const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const outputPath = path.join(__dirname, "..", "assets", "Saterra-Energies-brochure.pdf");
const logoPath = path.join(__dirname, "..", "assets", "logo.png");
const heroImage = path.join(__dirname, "..", "assets", "images", "hero-energy.jpg");
const oilGasImage = path.join(__dirname, "..", "assets", "images", "oil-gas.jpg");
const renewablesImage = path.join(__dirname, "..", "assets", "images", "renewables.jpg");
const logisticsImage = path.join(__dirname, "..", "assets", "images", "logistics.jpg");
const clientsBoardImage = path.join(__dirname, "..", "assets", "images", "clients", "clients-board.png");
const partnersBoardImage = path.join(__dirname, "..", "assets", "images", "clients", "partners-board.png");

const W = 595;
const H = 842;
const TOTAL_PAGES = 11;

const palette = {
  navy: "#1E1B9E",
  orange: "#F06A23",
  dark: "#111827",
  light: "#F7F9FF",
  white: "#FFFFFF",
  text: "#1F2937",
  muted: "#4B5563",
};

const company = {
  name: "Saterra Energies",
  tagline: "Exceptional performance in energy, engineering, and infrastructure delivery.",
  email: "Info@saterraenergies.com",
  website: "www.saterraenergies.com",
  phone: "+2348097778000 | +447498257544",
  lagos: "1, Ladipo Omotesho Cole Street, Lekki 1, Lagos",
  abuja: "72, Mississippi Street, Maitama, FCT Abuja",
};

const doc = new PDFDocument({
  size: "A4",
  margin: 0,
  info: {
    Title: "Saterra Energies Brochure",
    Author: "Saterra Energies",
    Subject: "Company profile brochure",
  },
});
doc.pipe(fs.createWriteStream(outputPath));

function imageOrPlaceholder(file, x, y, w, h, color = "#D1D5DB") {
  if (fs.existsSync(file)) doc.image(file, x, y, { fit: [w, h] });
  else doc.rect(x, y, w, h).fill(color);
}

function overlay(x, y, w, h, color, opacity) {
  doc.save();
  doc.fillOpacity(opacity).rect(x, y, w, h).fill(color);
  doc.restore();
}

function topBar(title, subtitle) {
  doc.rect(0, 0, W, 92).fill(palette.navy);
  doc.rect(0, 92, W, 8).fill(palette.orange);
  if (fs.existsSync(logoPath)) doc.image(logoPath, 36, 22, { fit: [140, 44] });
  const rightX = 250;
  const rightWidth = 315;
  const titleY = 18;
  doc.fillColor(palette.white).font("Helvetica-Bold").fontSize(16);
  const titleHeight = doc.heightOfString(title, { width: rightWidth, align: "right", lineGap: 0 });
  doc.text(title, rightX, titleY, { width: rightWidth, align: "right", lineGap: 0 });

  // Keep subtitle below title even when title wraps to two lines.
  const subtitleY = Math.min(74, titleY + titleHeight + 4);
  doc
    .fillColor("#DBE8FF")
    .font("Helvetica")
    .fontSize(9)
    .text(subtitle, rightX, subtitleY, { width: rightWidth, align: "right", lineGap: 0 });
}

function bullets(items, x, y, w, color = palette.orange) {
  let yy = y;
  items.forEach((item) => {
    doc.circle(x, yy + 5, 2.4).fill(color);
    doc.fillColor(palette.text).font("Helvetica").fontSize(10.8).text(item, x + 11, yy, { width: w - 11, lineGap: 1.5 });
    yy = doc.y + 6;
  });
}

function pageIndex(n) {
  doc.fillColor("#9CA3AF").font("Helvetica").fontSize(9).text(`${n} / ${TOTAL_PAGES}`, 0, 815, { width: W, align: "center", lineBreak: false });
}

function coverPage() {
  imageOrPlaceholder(heroImage, 0, 0, W, H, "#BEC8D5");
  overlay(0, 0, W, H, palette.navy, 0.52);
  overlay(0, 320, W, 56, palette.orange, 0.88);
  if (fs.existsSync(logoPath)) doc.image(logoPath, 48, 48, { fit: [190, 60] });
  doc.fillColor(palette.white).font("Helvetica-Bold").fontSize(42).text("COMPANY", 48, 138);
  doc.fillColor(palette.white).font("Helvetica-Bold").fontSize(42).text("BROCHURE", 48, 182);
  doc.fillColor("#E8EDFF").font("Helvetica").fontSize(13).text(company.tagline, 48, 246, { width: 480, lineGap: 3 });
  doc.fillColor(palette.white).font("Helvetica-Bold").fontSize(12).text("Oil & Gas | Engineering | Procurement | Logistics | Power", 48, 338);
  doc.fillColor("#D6E4FF").font("Helvetica").fontSize(11).text("www.saterraenergies.com", 48, 770);
  pageIndex(1);
}

function introPage() {
  doc.addPage();
  topBar("Overview", "Industrial solutions engineered for certainty and scale.");
  doc.rect(0, 100, W, H - 100).fill(palette.white);
  doc.fillColor(palette.navy).font("Helvetica-Bold").fontSize(26).text("Who We Are", 40, 132);
  doc.fillColor(palette.text).font("Helvetica").fontSize(11.2).text(
    "Saterra Energies is a dynamic, growth-focused company delivering specialized solutions to clients across critical industries. We combine deep technical expertise, disciplined project execution, and a client-first mindset to deliver measurable operational value.",
    40,
    176,
    { width: 515, lineGap: 3 }
  );
  doc.fillColor(palette.text).font("Helvetica").fontSize(11.2).text(
    "Our ambition is to become the preferred market leader in West Africa and beyond by delivering safe, dependable, and commercially aligned outcomes across every project lifecycle.",
    40,
    258,
    { width: 515, lineGap: 3 }
  );
  doc.roundedRect(40, 355, 250, 170, 8).fill("#F1F5FF");
  doc.roundedRect(305, 355, 250, 170, 8).fill("#FFF4EC");
  doc.fillColor(palette.navy).font("Helvetica-Bold").fontSize(14).text("Vision", 58, 380);
  doc.fillColor(palette.text).font("Helvetica").fontSize(10.3).text(
    "To shape the future of our industries through innovation, operational excellence, and positive impact.",
    58,
    405,
    { width: 214, lineGap: 2 }
  );
  doc.fillColor(palette.orange).font("Helvetica-Bold").fontSize(14).text("Mission", 323, 380);
  doc.fillColor(palette.text).font("Helvetica").fontSize(10.3).text(
    "To deliver dependable, high-quality services and products that exceed expectations and foster lasting partnerships.",
    323,
    405,
    { width: 214, lineGap: 2 }
  );
  doc.fillColor(palette.navy).font("Helvetica-Bold").fontSize(14).text("Core Values", 40, 560);
  bullets(["Safety", "Innovation", "Client Focus", "Integrity", "Collaboration"], 50, 587, 230);
  pageIndex(2);
}

function serviceSummaryPage() {
  doc.addPage();
  topBar("Capabilities", "Integrated solutions across the energy value chain.");
  imageOrPlaceholder(oilGasImage, 0, 110, W, 220, "#C8D5E6");
  overlay(0, 110, W, 220, palette.dark, 0.28);
  doc.fillColor(palette.white).font("Helvetica-Bold").fontSize(24).text("Service Portfolio", 40, 196);
  doc.roundedRect(40, 360, 250, 390, 8).fill("#F8FAFF");
  doc.roundedRect(305, 360, 250, 390, 8).fill("#FFF9F3");
  doc.fillColor(palette.navy).font("Helvetica-Bold").fontSize(13).text("Energy & Industrial", 58, 384);
  bullets(
    [
      "Oil and Gas Supply Chain Management Support",
      "Project Management and Technical Consultancy",
      "Petroleum Storage, Terminaling and Trading",
      "Power Utilities and Renewable Energy",
    ],
    58,
    412,
    214
  );
  doc.fillColor(palette.orange).font("Helvetica-Bold").fontSize(13).text("Execution & Delivery", 323, 384);
  bullets(
    [
      "Engineering (EPC and multidisciplinary delivery)",
      "Procurement and OEM sourcing support",
      "Logistics (sea, air, offshore, project cargo)",
      "HSE-oriented field and operations support",
    ],
    323,
    412,
    214,
    palette.navy
  );
  doc.roundedRect(40, 770 - 120, 515, 102, 8).fill("#EEF4FF");
  doc.fillColor(palette.text).font("Helvetica").fontSize(10.3).text(
    "Our service model blends technical engineering depth with field-proven execution discipline, giving clients one accountable partner from design and sourcing through mobilization, delivery, and operational support.",
    58,
    667,
    { width: 478, lineGap: 2 }
  );
  pageIndex(3);
}

function oilGasPage() {
  doc.addPage();
  topBar("Oil & Gas", "Upstream, midstream, and downstream support solutions.");
  imageOrPlaceholder(oilGasImage, 0, 100, W, H - 100, "#C7D7E8");
  overlay(0, 100, W, H - 100, palette.navy, 0.42);
  doc.fillColor(palette.white).font("Helvetica-Bold").fontSize(30).text("Oil & Gas Solutions", 40, 142);
  doc.fillColor("#E4EDFF").font("Helvetica").fontSize(12).text(
    "End-to-end support for complex hydrocarbon operations.",
    40,
    182,
    { width: 420 }
  );
  doc.roundedRect(40, 260, 515, 410, 10).fillOpacity(0.93).fill("#FFFFFF").fillOpacity(1);
  doc.fillColor(palette.navy).font("Helvetica-Bold").fontSize(14).text("Where We Add Value", 62, 286);
  bullets(
    [
      "Compression, gas processing, and storage systems",
      "Crude treating, transport, and pipeline support",
      "SCADA-enabled operations and monitoring",
      "Field logistics and marine support coordination",
      "Operational readiness and project controls",
      "Procurement of valves, pumps, OCTG, and rotating equipment",
    ],
    62,
    317,
    470
  );
  doc.fillColor(palette.muted).font("Helvetica").fontSize(10).text(
    "Saterra combines technical and commercial discipline to improve uptime, schedule certainty, and lifecycle performance.",
    62,
    622,
    { width: 470, lineGap: 2 }
  );
  pageIndex(4);
}

function engineeringPage() {
  doc.addPage();
  topBar("Engineering & Procurement", "Reliable execution from design through supply.");
  doc.rect(0, 100, W, H - 100).fill(palette.light);
  imageOrPlaceholder(heroImage, 0, 100, W, 250, "#CAD4E2");
  overlay(0, 100, W, 250, palette.dark, 0.2);
  doc.roundedRect(40, 380, 515, 370, 10).fill(palette.white);
  doc.fillColor(palette.navy).font("Helvetica-Bold").fontSize(24).text("Engineering Excellence", 58, 408);
  bullets(
    [
      "Process and plant layout development",
      "Civil, structural, mechanical, and electrical works",
      "Instrumentation, automation, and control integration",
      "Construction planning and commissioning support",
      "Quality assurance and document control",
    ],
    58,
    446,
    470
  );
  doc.fillColor(palette.orange).font("Helvetica-Bold").fontSize(16).text("Procurement Capability", 58, 602);
  doc.fillColor(palette.text).font("Helvetica").fontSize(10.8).text(
    "Strategic sourcing, bid evaluation, subcontractor negotiation, purchase order management, and OEM engagement to reduce risk and ensure supply certainty.",
    58,
    626,
    { width: 470, lineGap: 2 }
  );
  pageIndex(5);
}

function procurementLogisticsPage() {
  doc.addPage();
  topBar("Procurement & Logistics", "Supply certainty and end-to-end movement control.");
  imageOrPlaceholder(logisticsImage, 0, 100, W, 240, "#C9D7E5");
  overlay(0, 100, W, 240, palette.dark, 0.22);
  doc.fillColor(palette.white).font("Helvetica-Bold").fontSize(24).text("Procurement & Logistics Execution", 40, 195);
  doc.roundedRect(40, 372, 250, 350, 10).fill("#FFF7F0");
  doc.roundedRect(305, 372, 250, 350, 10).fill("#F1F6FF");
  doc.fillColor(palette.orange).font("Helvetica-Bold").fontSize(13).text("Procurement Services", 58, 398);
  bullets(
    [
      "Category strategy and approved vendor sourcing",
      "RFQ/RFP management and technical-commercial evaluation",
      "OEM representation and subcontract negotiations",
      "Purchase order administration and expediting",
      "Quality documentation and compliance tracking",
    ],
    58,
    426,
    214,
    palette.navy
  );
  doc.fillColor(palette.navy).font("Helvetica-Bold").fontSize(13).text("Logistics Services", 323, 398);
  bullets(
    [
      "Sea and air freight coordination",
      "Offshore cargo and vessel support",
      "Fuel, water, and critical material delivery",
      "Project cargo planning and route risk checks",
      "Travel protocol and integrated logistics control",
    ],
    323,
    426,
    214,
    palette.orange
  );
  doc.roundedRect(40, 745 - 72, 515, 72, 8).fill("#EEF4FF");
  doc.fillColor(palette.text).font("Helvetica").fontSize(10.2).text(
    "Saterra ensures the right equipment and materials arrive safely, compliantly, and on schedule across onshore and offshore operations.",
    58,
    686,
    { width: 470, lineGap: 2 }
  );
  pageIndex(6);
}

function powerPage() {
  doc.addPage();
  topBar("Power & Renewables", "Modern utility and clean-energy infrastructure support.");
  imageOrPlaceholder(renewablesImage, 0, 100, W, H - 100, "#D5DDEA");
  overlay(0, 100, W, H - 100, palette.navy, 0.32);
  doc.roundedRect(40, 155, 515, 560, 10).fillOpacity(0.92).fill("#FFFFFF").fillOpacity(1);
  doc.fillColor(palette.navy).font("Helvetica-Bold").fontSize(28).text("Power Utilities & Renewable Energy", 58, 188, { width: 470 });
  bullets(
    [
      "Gas-fired and captive power plant support",
      "Mini-grid design, deployment, and commissioning",
      "Solar, wind, and battery project coordination",
      "Substation and transmission interface support",
      "Permitting, startup readiness, and operating procedures",
      "Grid controls, telemetry, and SCADA integration",
    ],
    58,
    275,
    470
  );
  doc.fillColor(palette.muted).font("Helvetica").fontSize(10.5).text(
    "Our teams help clients deliver resilient energy systems that balance reliability, sustainability, and long-term economics.",
    58,
    608,
    { width: 470, lineGap: 2 }
  );
  pageIndex(7);
}

function clientsPage() {
  doc.addPage();
  topBar("Our Clients", "Trusted by organizations across key energy and infrastructure sectors.");
  doc.rect(0, 100, W, H - 100).fill("#F8FAFF");
  doc.fillColor(palette.navy).font("Helvetica-Bold").fontSize(24).text("Clients & Partners", 40, 128);
  doc
    .fillColor(palette.muted)
    .font("Helvetica")
    .fontSize(10.5)
    .text(
      "A snapshot of organizations we have worked with across operations, delivery, and strategic partnerships.",
      40,
      158,
      { width: 515, lineGap: 2 }
    );

  doc.roundedRect(35, 195, 525, 275, 8).fill("#FFFFFF");
  doc.roundedRect(35, 490, 525, 275, 8).fill("#FFFFFF");
  imageOrPlaceholder(clientsBoardImage, 45, 205, 505, 255, "#D4DEE8");
  imageOrPlaceholder(partnersBoardImage, 45, 500, 505, 255, "#D4DEE8");

  pageIndex(8);
}

function hsePage() {
  doc.addPage();
  topBar("HSE & Delivery Model", "Safety-first execution and measurable project control.");
  doc.rect(0, 100, W, H - 100).fill(palette.white);
  doc.roundedRect(40, 130, 515, 200, 10).fill("#EEF3FF");
  doc.fillColor(palette.navy).font("Helvetica-Bold").fontSize(22).text("Health, Safety & Environment", 58, 162);
  doc.fillColor(palette.text).font("Helvetica").fontSize(10.8).text(
    "Saterra Energies makes proper provision for the health, safety, and welfare of employees, partners, clients, and host communities. Continuous improvement is achieved through disciplined HS&E systems and strict field compliance.",
    58,
    200,
    { width: 470, lineGap: 2 }
  );
  doc.roundedRect(40, 360, 250, 350, 10).fill("#FFF7F0");
  doc.roundedRect(305, 360, 250, 350, 10).fill("#F3F7FF");
  doc.fillColor(palette.orange).font("Helvetica-Bold").fontSize(13).text("Execution Principles", 58, 384);
  bullets(
    [
      "Zero-harm mindset",
      "Risk identification and mitigation",
      "Permit-to-work discipline",
      "Field supervision and compliance checks",
      "Continuous workforce training",
    ],
    58,
    414,
    215,
    palette.navy
  );
  doc.fillColor(palette.navy).font("Helvetica-Bold").fontSize(13).text("Delivery Framework", 323, 384);
  bullets(
    [
      "Scope and contract management",
      "Cost and earned-value visibility",
      "Stakeholder communication cadence",
      "Schedule tracking and recovery planning",
      "Client-facing reporting and QA",
    ],
    323,
    414,
    215,
    palette.orange
  );
  pageIndex(9);
}

function faqPage() {
  doc.addPage();
  topBar("Frequently Asked Questions", "Quick answers about our services and delivery model.");
  doc.rect(0, 100, W, H - 100).fill("#F8FAFF");
  doc.roundedRect(30, 136, 535, 640, 10).fill("#FFFFFF");

  const leftFaqs = [
    {
      q: "1. What industries does Saterra Energies support?",
      a: "Oil and gas, EPC, power utilities, logistics-heavy projects, and public/private infrastructure programs.",
    },
    {
      q: "2. Can you handle complete project delivery?",
      a: "Yes. We deliver integrated engineering, procurement, logistics, and project management support end-to-end.",
    },
    {
      q: "3. Do you support offshore and remote operations?",
      a: "Yes. Our teams execute offshore supply runs and operations in remote or hard-to-access environments.",
    },
    {
      q: "4. Do you provide technical consultancy only?",
      a: "Yes. We can engage as technical advisors, owner reps, or project controls support without full EPC scope.",
    },
    {
      q: "5. Can you support urgent procurement requests?",
      a: "Yes. We run expedited sourcing, bid reviews, and vendor coordination for critical-path materials.",
    },
    {
      q: "6. Do you handle both local and international sourcing?",
      a: "Yes. We combine local supply channels with OEM/international sourcing to meet schedule and quality targets.",
    },
  ];

  const rightFaqs = [
    {
      q: "7. Can Saterra support long-term operations and maintenance?",
      a: "Yes. We support lifecycle operations through maintenance planning, reliability improvement, and advisory services.",
    },
    {
      q: "8. What is needed to scope the right solution?",
      a: "We need scope, expected load/throughput, site conditions, timelines, HSE requirements, and commercial targets.",
    },
    {
      q: "9. How do you ensure safe and compliant delivery?",
      a: "We enforce risk controls, permit-to-work discipline, QA checks, and continuous HSE compliance monitoring.",
    },
    {
      q: "10. Can you support renewable energy projects?",
      a: "Yes. We support solar, wind, hybrid systems, mini-grids, and utility interconnection programs.",
    },
    {
      q: "11. Do you provide logistics for project cargo?",
      a: "Yes. We manage sea/air freight, offshore deliveries, route planning, and integrated project logistics.",
    },
    {
      q: "12. How do we start a project with Saterra?",
      a: "Share your project brief, site details, and timeline. We review, align scope, and issue a delivery plan.",
    },
  ];

  function drawFaqColumn(items, x, y, width) {
    let yy = y;
    items.forEach((item) => {
      doc.fillColor(palette.navy).font("Helvetica-Bold").fontSize(9.2).text(item.q, x, yy, { width, lineGap: 1 });
      yy = doc.y + 4;
      doc.fillColor(palette.text).font("Helvetica").fontSize(8.4).text(item.a, x, yy, { width, lineGap: 1.5 });
      yy = doc.y + 8;
    });
  }

  drawFaqColumn(leftFaqs, 48, 170, 242);
  drawFaqColumn(rightFaqs, 305, 170, 242);
  pageIndex(10);
}

function backPage() {
  doc.addPage();
  doc.rect(0, 0, W, H).fill(palette.navy);
  doc.rect(0, 0, W, 12).fill(palette.orange);
  if (fs.existsSync(logoPath)) doc.image(logoPath, 190, 70, { fit: [220, 70] });
  doc.fillColor(palette.white).font("Helvetica-Bold").fontSize(30).text("Let's Build With Confidence", 60, 210, { width: 475, align: "center" });
  doc.fillColor("#DDE7FF").font("Helvetica").fontSize(12).text(
    "Reliable energy and infrastructure solutions tailored to your operational goals.",
    85,
    255,
    { width: 425, align: "center", lineGap: 3 }
  );
  doc.roundedRect(80, 360, 435, 250, 10).fill("#132B5B");
  doc.fillColor(palette.white).font("Helvetica-Bold").fontSize(15).text("Contact Information", 100, 390);
  doc.fillColor("#E6EEFF").font("Helvetica").fontSize(11).text(`Phone: ${company.phone}`, 100, 425);
  doc.text(`Email: ${company.email}`, 100, 448);
  doc.text(`Website: ${company.website}`, 100, 471);
  doc.text(`Lagos Office: ${company.lagos}`, 100, 506, { width: 395, lineGap: 2 });
  doc.text(`Abuja Office: ${company.abuja}`, 100, 550, { width: 395, lineGap: 2 });
  doc.fillColor("#C8DAFF").font("Helvetica").fontSize(10).text("Saterra Energies | Company Brochure 2026", 0, 810, { width: W, align: "center", lineBreak: false });
  pageIndex(11);
}

coverPage();
introPage();
serviceSummaryPage();
oilGasPage();
engineeringPage();
procurementLogisticsPage();
powerPage();
clientsPage();
hsePage();
faqPage();
backPage();

doc.end();
doc.on("end", () => {
  console.log(`Brochure generated at: ${outputPath}`);
});
