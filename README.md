# 💕 Celebración de Un Mes Juntos

Un proyecto interactivo de Next.js para celebrar el primer mes juntos con un juego de memoria de fotos.

## 📸 Dónde Poner las Imágenes

Las imágenes van en la carpeta: **`public/game-photos/`**

El proyecto necesita **18 fotos** (se crean 36 cartas porque cada foto aparece dos veces):

```
public/
  └── game-photos/
      ├── 1.avif
      ├── 2.avif
      ├── 3.avif
      ...
      └── 18.avif
```

**Importante:** 
- Las imágenes deben estar en formato `.avif` (o puedes cambiar la extensión en el código)
- Deben nombrarse del 1 al 18
- Son las fotos de sus momentos juntos

## 🚀 Desplegar en GitHub Pages

### 1. Configurar el repositorio

1. Crea un repositorio en GitHub
2. Si es tu sitio principal: `username.github.io`
3. Si es un proyecto: cualquier nombre (ej: `celebracion`)

### 2. Ajustar next.config.ts

- Si tu repo es `username.github.io`, deja el código como está
- Si tu repo tiene otro nombre (ej: `celebracion`), descomenta y edita esta línea en `next.config.ts`:

```typescript
basePath: '/celebracion',  // Reemplaza con el nombre de tu repo
```

### 3. Subir el código

```bash
git init
git add .
git commit -m "Primer mes juntos 💕"
git branch -M main
git remote add origin https://github.com/tuusuario/tunombrerepo.git
git push -u origin main
```

### 4. Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: **GitHub Actions**
4. Espera unos minutos

Tu sitio estará en: `https://tuusuario.github.io` o `https://tuusuario.github.io/tunombrerepo`

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Abrir http://localhost:3000
```

## 📝 Personalización

### Cambiar textos

- **Pregunta principal**: Línea 136 de `src/components/ValentinesProposal.tsx`
- **Mensaje final**: Línea 185 de `src/components/ValentinesProposal.tsx`
- **Instrucciones del juego**: `src/components/TextFooter.tsx`

### Cambiar cantidad de fotos

Si quieres más o menos fotos, edita:
- `src/components/PhotoPairGame.tsx` (líneas 8-25)
- `src/components/ValentinesProposal.tsx` (líneas 12-49)

## 💖 Créditos

Adaptado para celebrar momentos especiales juntos.
