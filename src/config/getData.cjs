const axios = require('axios');
const fs = require('fs');
const path = require('path');

// директории данных и изображений
const dataDir = path.join(__dirname, 'public', 'data');
const imagesDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

// Функция для загрузки изображения
async function downloadImage(url, imagePath) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(fs.createWriteStream(imagePath));

  return new Promise((resolve, reject) => {
    response.data.on('end', () => resolve());
    response.data.on('error', (err) => reject(err));
  });
}

// Основная функция
async function fetchData() {
  try {
    
    const { data } = await axios.get('https://dummyjson.com/products');
    
    // обработка данных
    const updatedProducts = await Promise.all(
      data.products.map(async (product) => {
        const newImages = [];
        
        // загрузка изображений
        for (let i = 0; i < product.images.length; i++) {
          const imageUrl = product.images[i];
          const imageName = `${product.id}_${i}${path.extname(imageUrl.split('?')[0])}`;
          const imagePath = path.join(imagesDir, imageName);
          
          await downloadImage(imageUrl, imagePath);
          newImages.push(`/images/${imageName}`);
        }

        return { ...product, images: newImages };
      })
    );

    // сохранение обновленных данных
    fs.writeFileSync(
      path.join(dataDir, 'products.json'),
      JSON.stringify({ products: updatedProducts }, null, 2)
    );

    console.log('Данные и изображения успешно сохранены!');
  } catch (error) {
    console.error('Ошибка:', error.message);
  }
}

fetchData();