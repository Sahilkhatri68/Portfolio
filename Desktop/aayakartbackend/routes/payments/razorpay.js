const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const Payments_Log_Model = require("../../models/payments/payments_log_model");

router.get("/", async (req, res) => {
  try {
    const payments_log = await Payments_Log_Model.find();
    res.json(payments_log);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Create new
router.post("/create", async (req, res) => {
  try {
    const payment = new Payments_Log_Model({
      razorpay: {
        orderCreationId: req.body.orderCreationId,
        razorpayPaymentId: req.body.razorpayPaymentId,
        razorpayOrderId: req.body.razorpayOrderId,
        razorpaySignature: req.body.razorpaySignature,
      },
    });
    await payment.save();
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Push to array of payments log
router.post("/success/:id", async (req, res) => {
  try {
    const Payments_Log = await Payments_Log_Model.findById(req.params.id);
    if (!Payments_Log) {
      return res.status(404).json({ message: "Not Found", status: "error" });
    }
    Payments_Log.razorpay.push({
      orderCreationId: req.body.orderCreationId,
      razorpayPaymentId: req.body.razorpayPaymentId,
      razorpayOrderId: req.body.razorpayOrderId,
      razorpaySignature: req.body.razorpaySignature,
    });
    await Payments_Log.save();
    return res
      .status(200)
      .json({ message: "Payment Successful", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

router.post("/", async (req, res) => {
  const payment_capture = 1;
  const amount = 499;
  const currency = "INR";

  //Generate order id
  const order_id = Math.floor(Math.random() * 100000);

  const options = {
    amount: amount * 100,
    currency,
    receipt: order_id,
    payment_capture,
  };

  try {
    const response = await instance.orders.create(options);
    console.log(response);
    res.json({ response });
  } catch (error) {
    console.log(error);
  }
});

router.post("/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: "rzp_test_p6Oi9ye5a2q9cH",
      key_secret: "7j1gmjM9NdHsNZYT8Ldnf6r3",
    });

    const options = {
      amount: 50000, // amount in smallest currency unit
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

// router.post("/success", async (req, res) => {
//   try {
//     // getting the details back from our font-end
//     const {
//       orderCreationId,
//       razorpayPaymentId,
//       razorpayOrderId,
//       razorpaySignature,
//     } = req.body;

//     console.log(req.body);

//     // Creating our own digest
//     // The format should be like this:
//     // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
//     const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

//     shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

//     const digest = shasum.digest("hex");

//     // comaparing our digest with the actual signature
//     if (digest !== razorpaySignature)
//       return res.status(400).json({ msg: "Transaction not legit!" });

//     // THE PAYMENT IS LEGIT & VERIFIED
//     // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

//     res.json({
//       msg: "success",
//       orderId: razorpayOrderId,
//       paymentId: razorpayPaymentId,
//     });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

module.exports = router;
