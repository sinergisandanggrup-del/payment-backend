const express = require("express");
const midtransClient = require("midtrans-client");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY
});

app.get("/", (req, res) => {
  res.send("Backend jalan 🚀");
});

app.get("/create-transaction", async (req, res) => {
  try {
    const parameter = {
      transaction_details: {
        order_id: "ORDER-" + Date.now(),
        gross_amount: 225000
      }
    };

    const transaction = await snap.createTransaction(parameter);
    res.json({ redirect_url: transaction.redirect_url });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server jalan di " + PORT));
