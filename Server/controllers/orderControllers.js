import orderModel from "../models/orderModels.js";

// Order data for admin panel
const allOrder = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ date: -1 }); // latest first
    res.json({ success: true, orders });
  } catch (error) {
    console.error("❌ Error fetching all orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};


// Order data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Placing order using cash on delivery (COD)
const placeOrder = async (req, res) => {
  try {
    console.log("📦 Order Data Received:", req.body);

    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      status: 'Order placed',
      paymentMethod: 'cod',
      payment: false,
      date: Date.now()
    });

    await newOrder.save();

    res.json({ success: true, message: "Order placed", order: newOrder });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};



{/* Placing order using Stripe
const placeOrderStripe = async (req, res) => {
    try {
        // Implement Stripe payment logic here
        res.json({ success: true, message: "Stripe Order Placed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Placing order using RazorPay
const placeOrderRazorPay = async (req, res) => {
    try {
        // Implement RazorPay payment logic here
        res.json({ success: true, message: "RazorPay Order Placed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};*/}

// Handle updating order status from admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { allOrder, placeOrder, updateStatus, userOrders };
