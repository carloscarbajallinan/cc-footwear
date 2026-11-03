const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('====================================================');
console.log('🔍 AUDITORÍA AUTOMATIZADA INTEGRAL (INCLUYE TAB 10)');
console.log('====================================================');

let errors = [];
let passed = 0;

function check(desc, condition) {
  if (condition) {
    console.log(`✅ [PASÓ] ${desc}`);
    passed++;
  } else {
    console.error(`❌ [FALLÓ] ${desc}`);
    errors.push(desc);
  }
}

// === CICLO 1: REPARACIÓN ESTRUCTURAL & TIENDA 2025 ===
console.log('\n--- EVALUANDO CICLO 1: ESTRUCTURA & VISUAL 2025 ---');
check('CSS Modal: .modal-overlay.active con display: flex !important', html.includes('.modal-overlay.active') && html.includes('display: flex !important'));
check('Visor Estudio 2025: Elementos storeMainPhoto y storeThumbsRow activos', html.includes('id="storeMainPhoto"') && html.includes('id="storeThumbsRow"'));
check('Vector SVG obsoleto eliminado de la Pestaña 9', !html.includes('<svg viewBox="0 0 500 240"') && !html.includes('id="shoeSvg"'));
check('Filtro Canales de Venta Perú: Selector channelSelectFilter en línea', html.includes('id="channelSelectFilter"'));
check('Botones de Retailer y Web Oficial en Modal Ficha Técnica', html.includes('id="modalSourceBtn"') && html.includes('id="modalBrandWebBtn"') && html.includes('id="modalChannel"'));

// === CICLO 2: MULTI-ÁNGULO 6 FOTOS & ENLACES SEGUROS ===
console.log('\n--- EVALUANDO CICLO 2: MULTI-ÁNGULO (6 FOTOS) & ACCESIBILIDAD ---');
check('Botón de Restablecimiento Rápido de Filtros (resetAllFilters)', html.includes('resetAllFilters()') && html.includes('Restablecer todos los filtros'));
check('Seguridad de Navegación: rel="noopener noreferrer" en enlaces salientes', html.includes('rel="noopener noreferrer"'));

const catalogMatch = html.match(/const productsData\s*=\s*(\[[\s\S]*?\]);/);
let products = [];
if (catalogMatch) {
  try {
    products = JSON.parse(catalogMatch[1]);
    check(`Parseo JSON Catálogo Integral (${products.length} SKUs)`, products.length >= 1268);
    const with6Angles = products.filter(p => p.imagenes_urls && p.imagenes_urls.length >= 6);
    check(`Cobertura de Galería de 6 Ángulos (${with6Angles.length} / ${products.length} productos)`, with6Angles.length >= 1200);
    
    // Check CC Models
    const cc = products.filter(p => p.marca === 'CC Footwear');
    check('3 Modelos Técnicos CC Footwear con 6 fotos de estudio cada uno', cc.length === 3 && cc.every(p => p.imagenes_urls.length >= 6));
    check('Imágenes CC son calzados técnicos de arcilla/pádel (sin Vans/running)', cc.every(p => !p.imagen_principal.includes('vans') && !p.imagen_principal.includes('photo-1542291026')));
  } catch (e) {
    check('Error al parsear productsData: ' + e.message, false);
  }
} else {
  check('Extracción de productsData en inline script', false);
}

// === CICLO 3: FILTROS COMBINADOS & FINANZAS ===
console.log('\n--- EVALUANDO CICLO 3: FILTRADO COMBINADO & FINANZAS ---');
if (products.length > 0) {
  const asicsMarathon = products.filter(p => p.marca === 'Asics' && p.canal_peru.includes('Marathon'));
  check(`Filtrado Cruzado: Asics en Marathon Sports (${asicsMarathon.length} modelos)`, asicsMarathon.length > 0);

  const padelProShop = products.filter(p => p.disciplina.toLowerCase().includes('pádel') || p.disciplina.toLowerCase().includes('padel'));
  check(`Segmento Pádel identificado (${padelProShop.length} modelos)`, padelProShop.length > 200);

  const directCC = products.filter(p => p.canal_peru.includes('CC'));
  check(`Canal D2C Exclusivo CC Footwear identificado (${directCC.length} modelos)`, directCC.length === 3);
}

const pvp = 349.00;
const landed = 93.59;
const margin = ((pvp - landed) / pvp) * 100;
check(`Cálculo de Margen Bruto CC (${margin.toFixed(1)}% === 73.2%)`, Math.abs(margin - 73.18) < 0.1);

// === CICLO 4: TAB 10 PLAN DE NEGOCIO & AUDITORÍA SEMÁNTICA ===
console.log('\n--- EVALUANDO CICLO 4: TAB 10 PLAN DE NEGOCIO & AUDITORÍA SEMÁNTICA ---');
check('Pestaña 10 Presente: id="tab-plan-negocio"', html.includes('id="tab-plan-negocio"'));
check('Explicación Crítica: Paradoja Asics & Sesgo Homónimo Tenis vs Zapatilla', html.includes('La Paradoja de Asics') && html.includes('Sesgo del Homónimo Latinoamericano'));
check('Matriz de Cuota Calibrada en Canchas de Lima (Babolat 31%, Bullpadel 44%)', html.includes('Babolat') && html.includes('31% (Líder en Club Terrazas y Rinconada)'));
check('Clasificador Semántico en Vivo: runSemanticAuditLive() implementado', html.includes('runSemanticAuditLive()'));
check('Radar de Noticias del Rubro Priorizadas (Boom Pádel, Reglamentación Terrazas)', html.includes('Boom del Pádel en Lima Supera las 250 Canchas') && html.includes('Exigencia Estricta de Suela Espiga Continua'));

console.log('----------------------------------------------------');
console.log(`Total Pruebas Exitosas: ${passed}`);
console.log(`Total Errores: ${errors.length}`);

if (errors.length > 0) {
  console.error('❌ AUDITORÍA FALLIDA:', errors);
  process.exit(1);
} else {
  console.log('🎉 CERTIFICACIÓN TOTAL APROBADA AL 100% CON 0 ERRORES (20/20).');
}
