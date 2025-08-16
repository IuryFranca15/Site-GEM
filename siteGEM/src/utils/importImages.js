// Importa todas as imagens de src/assets/image
const images = import.meta.glob('../assets/**/*.{png,jpg,jpeg,svg}', { eager: true });

/**
 * Normaliza o objeto de imports para usar apenas o nome do arquivo
 * Ex: 'pesca.jpg' ao invés de '../assets/image/pesca.jpg'
 */
const formattedImages = {};

for (const path in images) {
  const fileName = path.split('/').pop(); // pega só o nome do arquivo
  formattedImages[fileName] = images[path].default;
}

export default formattedImages;
