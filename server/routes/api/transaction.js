const express = require("express");
const router = express.Router();
const Transaction = require("../../models/Transaction");

router.post("/", async (req, res) => {
  console.log(req.body);
  const {
    userID,
    shopID,
    timestamp,
    amount,
    currency,
    recordType,
    remarks,
    attributes,
  } = req.body;
  try {
    const previousBalance = 100;
    const newBalance = 200;
    attributes["referenceTransactionID"] = "123";
    const transaction = new Transaction({
      userID,
      shopID,
      previousBalance,
      newBalance,
      timestamp,
      amount,
      currency,
      recordType,
      remarks,
      attributes,
    });
    await transaction.save();
    res.json({ message: "Payment Successful..." });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
