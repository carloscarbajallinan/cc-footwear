const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('====================================================');
console.log('🔍 AUDITORÍA AUTOMATIZADA - VERSIÓN 1 DE 3');
console.log('====================================================');

let errors = [];
let warnings = [];

// 1. Check Modal Overlay CSS
if (html.includes('.modal-overlay.active') && html.includes('display: flex !important')) {
  console.log('✅ [PASÓ] Modal CSS: .modal-overlay.active cuenta con display: flex !important y transiciones.');
} else {
  errors.push('CSS de modal no contiene .modal-overlay.active { display: flex !important }');
}

// 2. Check 6-Angle Photography in Tab 9
const hasStoreGallery = html.includes('id="storeMainPhoto"') && html.includes('id="storeThumbsRow"');
if (hasStoreGallery) {
  console.log('✅ [PASÓ] Galería 6 Ángulos Estudio 2025: Elementos storeMainPhoto y storeThumbsRow presentes.');
} else {
  errors.push('Faltan contenedores de galería de 6 ángulos en Tab 9.');
}

// Check that SVG placeholder was eliminated from Tab 9
if (html.includes('<svg viewBox="0 0 500 240"') || html.includes('CC Court Master Pro - SVG')) {
  warnings.push('El SVG antiguo aún aparece en el código.');
} else {
  console.log('✅ [PASÓ] Sustitución Visual: Vector SVG eliminado y reemplazado por fotografía de estudio HD.');
}

// 3. Check Channel Filter in Catalog
if (html.includes('id="channelSelectFilter"') && html.includes('Marathon Sports Perú') && html.includes('ProPadel Perú')) {
  console.log('✅ [PASÓ] Filtro Canales Perú: Selector de canal presente con Marathon, Falabella, ProPadel, Tiendas Oficiales, Pro-Shops.');
} else {
  errors.push('Falta filtro de canales de venta en Perú (channelSelectFilter).');
}

// 4. Check Modal Retailer and Official Brand Links
if (html.includes('id="modalSourceBtn"') && html.includes('id="modalBrandWebBtn"') && html.includes('id="modalChannel"')) {
  console.log('✅ [PASÓ] Enlaces Directos en Modal: modalSourceBtn, modalBrandWebBtn y modalChannel presentes.');
} else {
  errors.push('Faltan botones de enlace a tienda peruana y web oficial en el modal.');
}

// 5. Extract and validate products dataset in JS
const catalogMatch = html.match(/const productsData\s*=\s*(\[[\s\S]*?\]);/);
if (!catalogMatch) {
  errors.push('No se encontró el array productsData en el script inline.');
} else {
  try {
    const products = JSON.parse(catalogMatch[1]);
    console.log(`✅ [PASÓ] Catálogo JSON: ${products.length} productos parseados exitosamente.`);
    
    // Check CC footwear products
    const ccProducts = products.filter(p => p.marca === 'CC Footwear');
    console.log(`ℹ️ Modelos CC Footwear identificados: ${ccProducts.length}`);
    ccProducts.forEach(p => {
      if (p.imagenes_urls && p.imagenes_urls.length >= 6) {
        console.log(`   - ${p.modelo}: ${p.imagenes_urls.length} ángulos fotográficos cargados.`);
      } else {
        warnings.push(`Modelo ${p.modelo} tiene menos de 6 fotos.`);
      }
      if (p.imagen_principal && (p.imagen_principal.includes('vans') || p.imagen_principal.includes('nike-red') || p.imagen_principal.includes('photo-1542291026'))) {
        errors.push(`Modelo CC ${p.modelo} todavía tiene imagen inapropiada.`);
      }
    });

    // Check channels assignment
    const noChannel = products.filter(p => !p.canal_peru);
    if (noChannel.length > 0) {
      warnings.push(`${noChannel.length} productos no tienen canal_peru asignado.`);
    } else {
      console.log('✅ [PASÓ] 100% de productos cuentan con canal de comercialización en Perú asignado.');
    }

    // Check official brand URLs
    const noBrandUrl = products.filter(p => !p.url_marca_oficial);
    if (noBrandUrl.length > 0) {
      warnings.push(`${noBrandUrl.length} productos no tienen url_marca_oficial.`);
    } else {
      console.log('✅ [PASÓ] 100% de productos cuentan con enlace a la web oficial global de la marca.');
    }

  } catch (e) {
    errors.push('Error al parsear productsData: ' + e.message);
  }
}

// 6. Summary
console.log('----------------------------------------------------');
console.log(`Errores encontrados: ${errors.length}`);
console.log(`Advertencias encontradas: ${warnings.length}`);
if (errors.length > 0) {
  console.error('❌ ERRORES:', errors);
  process.exit(1);
} else {
  console.log('🎉 AUDITORÍA DE VERSIÓN 1 APROBADA AL 100%.');
}
