
import CartService from '../services/CartService.js';
import { authorization } from '../middlewares/authorization.middleware.js';

const cartService = new CartService();

const purchaseCart = async (req, res) => {

    const purchaserEmail = req.user.email; 
    const cartId = req.params.cid;
    
    try {
        const result = await cartService.finalizePurchase(cartId, purchaserEmail);
        
        if (result.status === "success" && result.failed_products.length === 0) {
            return res.status(200).send({ status: "success", message: "Purchase completed successfully.", ticket: result.ticket });
        } else if (result.status === "success" && result.failed_products.length > 0) {
            return res.status(202).send({ 
                status: "partial_success", 
                message: "Purchase partially completed. Some products were left in the cart due to lack of stock.", 
                ticket: result.ticket,
                failed_products: result.failed_products 
            });
        } else {
             // Only failed products
            return res.status(400).send({ 
                status: "failure", 
                message: "Purchase failed. No products could be bought due to lack of stock.", 
                failed_products: result.failed_products 
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Internal server error during purchase." });
    }
};

export { purchaseCart };