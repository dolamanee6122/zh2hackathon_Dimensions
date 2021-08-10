const express = require("express");
const router = express.Router();

//Buyers model
const Buyer = require("../../models/Buyer");

const getInitialBalance = () => {
  return {
    balance: 0,
    credit: 0,
    debit: 0,
  };
};

router.get("/", (req, res) => {
  res.send(buyers);
});

router.get("/:id", (req, res) => {
  const buyer = buyers.find((b) => b.id === parseInt(req.params.id));
  if (!buyer) {
    res.status(404).send("Given buyer ID does not exist");
  } else {
    res.send(buyer);
  }
});

// @route   POST /api/buyers
// @desc    register a new buyer
// @access  Public
router.post("/", async (req, res) => {
  const { user } = req.body;
  user.balance = getInitialBalance();
  try {
    const buyer = new Buyer({ user });
    //console.log(`buyer`, buyer);
    await buyer.save();
    res.json({ message: "Buyer Added", buyer });
  } catch (err) {
    console.log(err);
  }
});

// @route   POST /api/buyers/addShop
// @desc    Add a new shop for buyer
// @access  Protected
router.post("/addShop", async (req, res) => {
  const { buyerID, shopID, shopName } = req.body;
  Buyer.findById(buyerID, async (err, buyer) => {
    if (err) return console.log(`err`, err);

    //TODO check if the shop is already added for the buyer
    buyer.balanceShopWise.push({
      shopID,
      shopName,
      balance: getInitialBalance(),
    });
    await buyer.save();
    res.json({ message: "shop added for the buyer", buyer });
  });
});

module.exports = router;
