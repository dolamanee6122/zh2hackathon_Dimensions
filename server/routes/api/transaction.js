const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const moment = require("moment");
const Transaction = require("../../models/Transaction");
const Merchant = require("../../models/Merchant");
const Shop = require("../../models/Shop");
const Buyer = require("../../models/Buyer");
const Request = require("../../models/Request");

// update balance of buyer for the current transaction
const updateBalanceBuyer = (buyer, shopID, transaction, recordType, amount) => {
  const buyerID = buyer._id;
  const beforeTrxnBalance = buyer.user.balance;
  const afterTrxnBalance = beforeTrxnBalance;
  transaction.previousBalance = beforeTrxnBalance.balance;
  const { balance: beforeTrxnBalanceShopWise } = buyer.balanceShopWise.find(
    (e) => JSON.stringify(e.shopID) === JSON.stringify(shopID)
  );
  const afterTrxnBalanceShopWise = beforeTrxnBalanceShopWise;

  // LOAN from buyer's End (CREDIT)
  // aane wle paise jo udhar diye gaye hain (DEBIT for dukan)
  if (recordType == "CREDIT") {
    afterTrxnBalance.credit += amount;
    afterTrxnBalanceShopWise.credit += amount;
  } else if (recordType == "DEBIT") {
    afterTrxnBalance.debit += amount;
    afterTrxnBalanceShopWise.debit += amount;
  }
  afterTrxnBalance.balance = afterTrxnBalance.debit - afterTrxnBalance.credit;
  afterTrxnBalanceShopWise.balance =
    afterTrxnBalanceShopWise.debit - afterTrxnBalanceShopWise.credit;

  buyer.user.balance = afterTrxnBalance;
  buyer.balanceShopWise.forEach((shop) => {
    if (JSON.stringify(shop.shopID) === JSON.stringify(shopID)) {
      shop.balance = afterTrxnBalanceShopWise;
    }
  });
  transaction.newBalance = afterTrxnBalance.balance;
  console.log(`transaction`, transaction);
};

// update balance of shop for the current transaction
const updateBalanceShop = (shop, buyerID, recordType, amount) => {
  const shopID = shop._id;
  const beforeTrxnBalance = shop.balance;
  const afterTrxnBalance = beforeTrxnBalance;
  const { balance: beforeTrxnBalanceUserWise } = shop.balanceUserWise.find(
    (e) => JSON.stringify(e.buyerID) === JSON.stringify(buyerID)
  );
  const afterTrxnBalanceUserWise = beforeTrxnBalanceUserWise;
  // LOAN from buyer's End (CREDIT)
  // aane wle paise jo udhar diye gaye hain (DEBIT for dukan)
  if (recordType == "CREDIT") {
    afterTrxnBalance.debit += amount;
    afterTrxnBalanceUserWise.debit += amount;
  } else if (recordType == "DEBIT") {
    afterTrxnBalance.credit += amount;
    afterTrxnBalanceUserWise.credit += amount;
  }
  afterTrxnBalance.balance = afterTrxnBalance.debit - afterTrxnBalance.credit;
  afterTrxnBalanceUserWise.balance =
    afterTrxnBalanceUserWise.debit - afterTrxnBalanceUserWise.credit;

  shop.balance = afterTrxnBalance;
  shop.balanceUserWise.forEach((buyer) => {
    if (JSON.stringify(buyer.buyerID) === JSON.stringify(buyerID)) {
      buyer.balance = afterTrxnBalanceUserWise;
    }
  });
};

const updateBalanceMerchant = (merchant, recordType, amount) => {
  const beforeTrxnBalance = merchant.user.balance;
  const afterTrxnBalance = beforeTrxnBalance;
  if (recordType == "CREDIT") {
    afterTrxnBalance.debit += amount;
  } else if (recordType == "DEBIT") {
    afterTrxnBalance.credit += amount;
  }
  afterTrxnBalance.balance = afterTrxnBalance.debit - afterTrxnBalance.credit;
  merchant.user.balance = afterTrxnBalance;
};

const updateBalance = (
  buyer,
  shop,
  merchant,
  transaction,
  recordType,
  amount,
  currency
) => {
  //userID === buyerID
  const buyerID = buyer._id;
  const shopID = shop._id;
  //const merchantID = merchant._id;

  // before updating change the currency and amount to INR
  updateBalanceBuyer(buyer, shopID, transaction, recordType, amount);
  updateBalanceShop(shop, buyerID, recordType, amount);
  updateBalanceMerchant(merchant, recordType, amount);
};

// @route   POST /api/transaction/
// @desc    do a new transaction with requestID
// @access  Protected
router.post("/", async (req, res) => {
  //console.log(req.body);
  const { requestID, attributes } = req.body;

  try {
    const request = await Request.findById(requestID);
    if (!request) return res.status(404).json({ message: "Invalid request" });

    if (request.status !== "PENDING")
      return res.json({ message: "Transaction already done" });
    const {
      buyer: { buyerID },
      shop: { shopID },
      amount,
      paymentMode,
      recordType,
    } = request;
    currency = "INR";

    const buyer = await Buyer.findById(buyerID);
    const shop = await Shop.findById(shopID);

    if (!buyer || !shop)
      return res.status(404).json({ message: "Invalid request" });
    const { merchantID } = shop;
    const merchant = await Merchant.findById(merchantID);
    if (!merchant) return res.status(404).json({ message: "Invalid request" });
    const transaction = new Transaction({
      buyerID,
      shopID,
      merchantID,
      amount,
      paymentMode,
      recordType,
      currency,
      attributes,
    });

    updateBalance(
      buyer,
      shop,
      merchant,
      transaction,
      recordType,
      amount,
      currency
    );

    request.status = "APPROVED";
    await request.save();
    await buyer.save();
    await shop.save();
    await merchant.save();
    await transaction.save();

    //TODO update the rating of buyer/shop/merchant if required
    return res.json({
      status: "Payment Successful...",
      buyer,
      shop,
      merchant,
      transaction,
      request,
    });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
  }
});

// @route   GET /api/transaction/id/{transactionID}
// @desc    Get information for a transactionID
// @access  Protected
router.get("/id/:id", async (req, res) => {
  const { id } = req.params;

  //TODO define and implement who have access to transaction
  try {
    const transaction = await Transaction.findById(id);
    if (!transaction)
      return res.status(404).json({ message: "Invalid Transaction ID" });
    res.json({ message: "OK", transaction });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
  }
});

// @route   GET /api/transaction/{buyerID | shopID | merchantID}
// @desc    Get all transaction details for merchant, shop or buyer
// @access  Protected
router.get("/:id/", async (req, res) => {
  const { id } = req.params;

  const { limit } = req.query;

  try {
    const transactions = await Transaction.find({
      $or: [{ buyerID: id }, { shopID: id }, { merchantID: id }],
    })
      .sort({ _id: -1 })
      .limit(parseInt(limit));
    if (!transactions)
      return res.status(404).json({ message: "No transaction found" });
    res.json({ message: "OK", transactions });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
  }
});

// returns the balance of entity from beginning
const getAllTimeBalance = async (id, type) => {
  let allTime;
  if (type == "merchant") {
    allTime = await Merchant.findById(id).select("user.balance");
    allTime = allTime.user.balance;
  } else if (type == "buyer") {
    allTime = await Buyer.findById(id).select("user.balance");
    allTime = allTime.user.balance;
  } else if (type == "shop") {
    allTime = await Shop.findById(id).select("balance");
    allTime = allTime.balance;
  } else return null;
  return allTime;
};

// returns the balance of entity as per the passed timeline
const getBalanceAnalytics = async (objID, type, timeline) => {
  const startDate = moment().startOf(timeline).toDate();
  const endDate = moment().endOf(timeline).toDate();
  const balanceOfTimeline = await Transaction.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [{ buyerID: objID }, { shopID: objID }, { merchantID: objID }],
          },
          {
            createdAt: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: "$recordType",
        amount: { $sum: "$amount" },
      },
    },
  ]);

  let debit = 0,
    credit = 0,
    balance = 0;
  balanceOfTimeline.forEach((e) => {
    if (e._id == "DEBIT") debit += e.amount;
    else credit += e.amount;
  });
  if (type == "buyer") balance = debit - credit;
  else balance = credit - debit;
  return {
    balance,
    debit,
    credit,
  };
};

// @route   GET /api/transaction/balanceanalytics/{buyerID | shopID | merchantID}/?query=type
// @desc    Get all balance(today,week,month,allTime)details for merchant, shop or buyer
// @access  Protected
router.get("/balanceanalytics/:id/", async (req, res) => {
  const { id } = req.params;
  const { type } = req.query;
  const objID = new mongoose.Types.ObjectId(id);

  try {
    const allTime = await getAllTimeBalance(id, type);
    if (!allTime) res.status(404).json({ msg: "Invalid request" });
    const today = await getBalanceAnalytics(objID, type, "day");
    const week = await getBalanceAnalytics(objID, type, "isoweek");
    const month = await getBalanceAnalytics(objID, type, "month");
    res.json({
      msg: "OK",
      balanceAnalytics: {
        today,
        week,
        month,
        allTime,
      },
    });
  } catch (err) {
    console.log(`err`, err);
    res.json({ err });
  }
});
module.exports = router;
