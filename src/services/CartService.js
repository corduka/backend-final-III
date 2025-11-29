
import ProductRepository from '../repositories/ProductRepository.js'; // Assuming you implement this
import TicketService from './TicketService.js'; // Assuming you implement this

class CartService {
    constructor() {
        this.productRepository = new ProductRepository();
        this.ticketService = new TicketService();
        // this.cartRepository = new CartRepository();
    }

    async finalizePurchase(cartId, purchaserEmail) {
        // 1. Get the cart and its products
        // const cart = await this.cartRepository.getCartById(cartId); 
        // NOTE: Mocking cart data for this example
        const cart = { 
            _id: cartId,
            products: [
                { product: '60c72b1f9b1e8b0015b63a92', quantity: 2 }, // Product 1
                { product: '60c72b1f9b1e8b0015b63a93', quantity: 5 }  // Product 2
            ]
        };
        
        const productsToPurchase = []; // Successful purchases
        const failedProducts = [];    // Failed due to stock
        let totalAmount = 0;

        for (const item of cart.products) {
            const productId = item.product;
            const quantity = item.quantity;

            // 2. Check stock and process
            const product = await this.productRepository.getProductById(productId);

            if (product && product.stock >= quantity) {
                // SUCCESS: Update stock and add to purchase list
                product.stock -= quantity;
                await this.productRepository.updateProduct(productId, { stock: product.stock });

                productsToPurchase.push(item);
                totalAmount += product.price * quantity;
            } else {
                // FAILURE: Add to failed list
                failedProducts.push(productId);
            }
        }

        // 3. Generate Ticket for successful purchases
        if (productsToPurchase.length > 0) {
            await this.ticketService.createTicket(totalAmount, purchaserEmail);
        }
        
        return {
            status: productsToPurchase.length > 0 ? "success" : "failure",
            ticket: productsToPurchase.length > 0 ? "TICKET_CREATED" : null,
            failed_products: failedProducts
        };
    }
}

export default CartService;