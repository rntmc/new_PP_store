import express from "express";
import * as paypal from '../paypal-api.js';
import cors from 'cors'
const PORT = 8888;
const SERVER_URL = "https://new-pp-store.onrender.com";

const app = express();

app.use(cors())

app.use(express.json());

app.post("/create-paypal-order", async (req, res) => {
  console.log("Received POST request to /create-paypal-order:", req.body);
  try {
    const order = await paypal.createOrder(req.body);
    console.log("Response from createOrder:", order);
    res.json(order);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order:" + error.message });
  }
});

app.post("/capture-paypal-order", async (req, res) => {
  const { orderID } = req.body;
  console.log("orderID de server.js:", orderID)
  try {
    const captureData = await paypal.capturePayment(orderID);
    res.json(captureData);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

app.listen(8888, () => {
  console.log(`server listening on port ${PORT}`)
})
console.log(`Server is ready to handle requests at ${SERVER_URL}`);
