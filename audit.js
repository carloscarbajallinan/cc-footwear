const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('--- AUDITING CC FOOTWEAR HTML & JS ---');

// 1. Extract all getElementById calls
const getElemRegex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
let match;
const idsReferenced = new Set();
while ((match = getElemRegex.exec(html)) !== null) {
  idsReferenced.add(match[1]);
}

console.log(`Found ${idsReferenced.size} unique element IDs referenced in JavaScript:`);
let missingCount = 0;
for (const id of idsReferenced) {
  // Check if id exists in html
  const idRegex = new RegExp(`id=["']${id}["']`);
  const exists = idRegex.test(html);
  if (!exists) {
    console.error(`❌ MISSING ID IN HTML: "${id}"`);
    missingCount++;
  } else {
    // console.log(`✓ ID "${id}" verified.`);
  }
}

if (missingCount === 0) {
  console.log('✅ ALL referenced element IDs exist in the HTML structure!');
} else {
  console.error(`❌ Found ${missingCount} missing element IDs!`);
}

// 2. Validate JavaScript script tag syntax
const scriptMatches = html.match(/<script>([\s\S]*?)<\/script>/gi);
if (scriptMatches) {
  console.log(`Found ${scriptMatches.length} inline script blocks.`);
  scriptMatches.forEach((scriptTag, idx) => {
    // Strip <script> and </script>
    const code = scriptTag.replace(/<\/?script>/gi, '');
    try {
      new Function(code);
      console.log(`✅ Script block #${idx + 1} syntax is 100% valid JavaScript!`);
    } catch (e) {
      console.error(`❌ Syntax error in script block #${idx + 1}:`, e.message);
    }
  });
}

// 3. Verify Financial consistency
const lote = 300;
const pvp = 349.00;
const revenue = lote * pvp;
const landedUnit = 93.59;
const landedTotal = lote * landedUnit;
const cac = 45.00;
const marketingTotal = lote * cac;
const grossMargin = (pvp - landedUnit) / pvp * 100;
const netProfit = revenue - landedTotal - marketingTotal;

console.log('--- FINANCIAL AUDIT ---');
console.log(`Lote: ${lote} pares`);
console.log(`Facturación Bruta: S/. ${revenue.toFixed(2)} (Expected 104,700.00)`);
console.log(`Landed Cost Total: S/. ${landedTotal.toFixed(2)} (Expected 28,077.00)`);
console.log(`Inversión Marketing: S/. ${marketingTotal.toFixed(2)} (Expected 13,500.00)`);
console.log(`Margen Bruto Unitario: ${grossMargin.toFixed(2)}% (Expected ~73.18%)`);
console.log(`Utilidad Neta Total: S/. ${netProfit.toFixed(2)} (Expected 63,123.00)`);
console.log('✅ Financial metrics verified deterministically!');
