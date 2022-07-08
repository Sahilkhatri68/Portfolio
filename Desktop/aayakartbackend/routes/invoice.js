const express = require("express");
const router = express.Router();
const Invoice_Model = require("../models/invoice_model");
 
//Get All Invoices
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice_Model.find();
    res.send(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Get Invoice by ID
router.get("/:id", async (req, res) => {
  try {
    const invoice = await Invoice_Model.findById(req.params.id);
    res.send(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Create Invoice
router.post("/", async (req, res) => {
  const create_invoice = new Invoice_Model({
    invoice_product_name: req.body.invoice_product_name,
    invoice_due_date: req.body.invoice_due_date,
    invoice_status: req.body.invoice_status,
    invoice_total: req.body.invoice_total,
    invoice_discount: req.body.invoice_discount,
    invoice_notes: req.body.invoice_notes,
    invoice_customer_username: req.body.invoice_customer_username,
  });
  try {
    await create_invoice.save();
    res
      .status(201)
      .json({ message: "Invoice successfully added", status: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

//Update Invoice
router.patch("/:id", async (req, res) => {
  try {
    const invoice = await Invoice_Model.findById(req.params.id);
    invoice.invoice_product_id = req.body.invoice_product_id;
    invoice.invoice_due_date = req.body.invoice_due_date;
    invoice.invoice_status = req.body.invoice_status;
    invoice.invoice_total = req.body.invoice_total;
    invoice.invoice_discount = req.body.invoice_discount;
    invoice.invoice_notes = req.body.invoice_notes;
    invoice.invoice_customer_id = req.body.invoice_customer_id;
    await invoice.save();
    res
      .status(201)
      .json({ message: "Invoice successfully updated", status: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

//Delete Invoice
router.delete("/:id", async (req, res) => {
  try {
    const invoice = await Invoice_Model.findById(req.params.id);
    await invoice.remove();
    res
      .status(201)
      .json({ message: "Invoice successfully deleted", status: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});


module.exports = router;