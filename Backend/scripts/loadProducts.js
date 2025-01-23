const pool = require("../database");
const fs = require('fs').promises;
const path = require('path');

async function loadProducts() {
    try {
        const jsonPath = path.join(__dirname, '..', 'updated_products.json');
        const productsData = await fs.readFile(jsonPath, 'utf8');
        const products = JSON.parse(productsData);

        for (const product of products) {
            try {
                await pool.query(
                    "INSERT INTO product (prod_name, prod_image, prod_quantity, prod_price, rating_stars, rating_count, prod_discount, prod_keywords) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                    [
                        product.prod_name,
                        product.prod_image,
                        product.prod_quantity,
                        product.prod_price,
                        product.rating_stars,
                        product.rating_count,
                        product.prod_discount,
                        JSON.stringify(product.prod_keywords)
                    ]
                );
                console.log(`Added product: ${product.prod_name}`);
            } catch (err) {
                console.error(`Error adding product ${product.prod_name}:`, err.message);
            }
        }
        console.log('Products loading completed');
    } catch (error) {
        console.error('Error loading products:', error);
    } finally {
        await pool.end();
    }
}

loadProducts();
