### Estructura del Proyecto

```
app/
  (tabs)/
    _layout.jsx      ----→ Tabs (barra inferior de navegación)
    index.jsx        ----→ Catálogo principal con consumo de API
    favoritos.jsx    ----→ Pantalla de favoritos con gestos y reordenamiento
    compras.jsx      ----→ Historial de compras realizadas
    perfil.jsx       ----→ Pantalla de perfil de usuario y cámara
  producto/
    [id].jsx         ----→ Pantalla de detalle del producto seleccionado
  _layout.jsx        ----→ Stack raíz y proveedores de contexto
components/
  ProductCard.jsx            ----→ Tarjeta individual de producto
  SwipeableFavoriteItem.jsx  ----→ Fila deslizable de favoritos para eliminar
context/
  FavoritesContext.js  ----→ Estado global y persistencia de favoritos
  OrdersContext.js     ----→ Estado global y persistencia de compras
  UserContext.js       ----→ Estado global y persistencia del perfil
hooks/
  useFetch.js          ----→ Hook personalizado para peticiones HTTP
utils/
  storage.js           ----→ Funciones de lectura y escritura en AsyncStorage
```