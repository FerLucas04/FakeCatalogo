###Estructura del Proyecto

app/
  (tabs)/
    _layout.jsx     ----→ Tabs (barra inferior de navegación)
    index.jsx       ----→ tu catálogo actual (antes en App.js)
    favoritos.jsx   ----→ pantalla de productos favoritos
    perfil.jsx      ----→ pantalla de pefil de usuario
  producto/
    [id].jsx    ----→ pantalla de detalle del producto clickeado
  _layout.jsx    ----→ Stack raíz
components/
  ProductCard.jsx    ----→ se separa del archivo principal
  SwipleableFavoriteItem.jsx ----→ Barra lateral de cada producto de favorito, permite swipear y eliminar
context/
  FavoritesContext.js ----→ Provee las funciones de contexto para la pantalla de favoritos
  UserContext.js ----→ Provee la funciones de contexto para la pantalla de perfil
hooks/
  useFetch  ----→ Hook personalizado para hacer el fetch a la URL de los productos
utils/
  storage.js ----→ Provee funciones de Cargar favoritos y Guardar favoritos