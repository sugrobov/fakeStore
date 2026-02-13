const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

async function downloadThumbnailsSimple() {
    try {
        // Правильный путь к файлу products.json
        const productsPath = path.join(__dirname, '..', 'config', 'products.json');
        console.log(`Читаем файл: ${productsPath}`);
        
        const products = JSON.parse(await fs.readFile(productsPath, 'utf8'));
        
        // Папка для сохранения thumbnails
        const thumbnailsDir = path.join(__dirname, '..', '..', 'api', 'public', 'images', 'thumbnails');
        console.log(`Создаем папку: ${thumbnailsDir}`);
        
        await fs.ensureDir(thumbnailsDir);
        
        console.log(`Найдено продуктов: ${products.products.length}`);
        
        for (const product of products.products) {
            try {
                console.log(`Скачиваем thumbnail для продукта ${product.id}: ${product.thumbnail}`);
                
                const response = await axios.get(product.thumbnail, { 
                    responseType: 'arraybuffer',
                    timeout: 10000 
                });
                
                // Создаем безопасное имя файла
                const originalFilename = product.thumbnail.split('/').pop();
                const filename = `${product.id}_${originalFilename}`;
                const filepath = path.join(thumbnailsDir, filename);
                
                await fs.writeFile(filepath, response.data);
                product.thumbnail = `/images/thumbnails/${filename}`;
                
                console.log(`✅ ${filename}`);
            } catch (error) {
                console.log(`❌ Ошибка для продукта ${product.id}: ${error.message}`);
            }
        }
        
        // Сохраняем исправленный файл
        const outputPath = path.join(__dirname, '..', 'config', 'products_fixed.json');
        await fs.writeFile(outputPath, JSON.stringify(products, null, 2));
        console.log(`🎉 Готово! Файл сохранен: ${outputPath}`);
        
    } catch (error) {
        console.error('❌ Критическая ошибка:', error.message);
        console.error('Полная ошибка:', error);
    }
}

// Запускаем только если скрипт вызван напрямую
if (require.main === module) {
    downloadThumbnailsSimple();
}

module.exports = downloadThumbnailsSimple;