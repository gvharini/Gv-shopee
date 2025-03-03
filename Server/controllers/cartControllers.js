import userModel from "../models/userModels.js"; // Ensure correct path

// Add to Cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        // Find user
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Get cart data
        let cartData = userData.cartData || {};

        // Update cart quantity
        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
            cartData[itemId] = { [size]: 1 };
        }

        // Save updated cart data
        await userModel.findByIdAndUpdate(userId, { $set: { cartData } });

        res.json({ success: true, message: "Product added to cart", cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Cart Item Quantity
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (!cartData[itemId] || !cartData[itemId][size]) {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }

        // Update quantity
        cartData[itemId][size] = quantity;

        // Save changes
        await userModel.findByIdAndUpdate(userId, { $set: { cartData } });

        res.json({ success: true, message: "Cart updated", cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get User Cart
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, cartData: userData.cartData || {} });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Export Controllers
export { addToCart, updateCart, getUserCart };
