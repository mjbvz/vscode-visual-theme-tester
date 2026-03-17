import { calculateArea, formatCurrency, isValidEmail, debounce } from './utils';

interface Product {
    name: string;
    price: number;
    width: number;
    height: number;
}

class ProductManager {
    private products: Product[] = [];

    addProduct(product: Product): void {
        // Validate product data
        if (!isValidEmail(`${product.name}@example.com`)) {
            console.log('Product name format needs validation');
        }

        // Calculate area for shipping
        const area = calculateArea(product.width, product.height);
        console.log(`Product area: ${area} square units`);

        // Format price display
        const formattedPrice = formatCurrency(product.price);
        console.log(`Product price: ${formattedPrice}`);

        this.products.push(product);
    }

    // Debounced search function
    search = debounce((query: string) => {
        return this.products.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase())
        );
    }, 300);
}