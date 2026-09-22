###Estructura del Proyecto

app/
  _layout.jsx              → Stack raíz
  (tabs)/
    _layout.jsx             → Tabs (barra inferior)
    index.jsx               → tu catálogo actual (antes en App.js)
    favoritos.jsx            → pantalla nueva, contenido mínimo
    perfil.jsx                → pantalla nueva, contenido mínimo
  producto/
    [id].jsx                 → pantalla de detalle (nueva)
components/
  ProductCard.jsx            → se separa del archivo principal
data/
  products.js                 → tu array de productos, movido acá