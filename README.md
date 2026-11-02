# CC Footwear — Estudio de Mercado & Plataforma E-commerce

> Plataforma web interactiva para la marca de calzado técnico de tenis y pádel **CC Footwear**, diseñada bajo la filosofía de producto y diseño visual de Apple (Apple UI & Apple Health / Developer Analytics).

🔗 **Sitio en vivo**: [https://carloscarbajallinan.github.io/cc-footwear/](https://carloscarbajallinan.github.io/cc-footwear/)  
📊 **Google Sheet Oficial**: [Base de Datos & Modelo Financiero](https://docs.google.com/spreadsheets/d/1TiHim1R5Qx0sO33YZSk6KFRb3mKm-Wb2xBJoI_KwNIs/edit)

---

## Contenido de la Plataforma

1. **E-commerce & Configurador de Producto (`#hero`, `#catalogo`)**:
   - Experiencia de compra minimalista inspirada en la tienda de Apple.
   - Selector de variantes de suela (*Blanco Tiza Clay*, *Negro Noche Omni Pádel*, *Arcilla Roland*).
   - Bolsa de compra interactiva y desglose de componentes anatómicos (Suela espiga 3mm, Chasis TPU antitorsión, Malla Jacquard, Espuma reactiva).

2. **Catálogo de Mercado Auditado (`#catalogo-benchmark`)**:
   - **43 siluetas relevadas** en 15 marcas globales e innovadoras (*On Running, Babolat, Bullpadel, Nox, Asics, Nike, Adidas, Puma, Wilson, Head, Joma, K-Swiss, Mizuno, Lacoste y CC*).
   - Filtros instantáneos por categoría y buscador en tiempo real.
   - Modal Apple Sheet con ficha técnica detallada y análisis de arbitraje de costo/precio.

3. **Dashboard de Analítica & Viabilidad (`#analytics-summary`)**:
   - Resumen ejecutivo de métricas ("Big Numbers" con contexto humano).
   - Curva comparativa de precios en retail de Lima (Chart.js minimalista).
   - Análisis comparativo de 4 modelos de negocio (D2C Web, Pro-Shops en Clubes, Marketplace, Consignación).

4. **Flujo de Importación OEM China & Calculadora en Vivo**:
   - Requerimientos arancelarios (Partida 6404.11 / 6402.19, Ad Valorem 11%, IGV 18%, Percepción 10%/3.5%).
   - Cumplimiento técnico de rotulado (D.S. 017-2004-PRODUCE) y registro de marca (INDECOPI Clase 25).
   - Calculadora paramétrica en tiempo real para simular lotes (150 a 1,500 pares), costos de matricería, landed cost, punto de equilibrio y ROI.

5. **Matriz de Fuentes & Auditoría Legal**:
   - Separación estricta entre hechos validados por decretos supremos oficiales vs. estimaciones empíricas con sustento.

---

## Tecnologías

- **Frontend**: HTML5 semántico, Tailwind CSS (CDN), Vanilla JavaScript ES6+.
- **Iconos**: Lucide Icons.
- **Gráficos**: Chart.js 4.4.
- **Testing**: Script determinista Node.js (`audit.js`) con verificación de 36/36 IDs y validación de sintaxis.
