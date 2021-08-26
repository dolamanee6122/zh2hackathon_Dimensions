const Joi = require("joi");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const request = require("request");
const Merchant = require("../../models/Merchant");
const Shop = require("../../models/Shop");
const Transaction = require("../../models/Transaction");
const auth = require("../../middleware/auth");
const { FUSION_BASE_URL, IFI_ID, X_ZETA_AUTH_TOKEN } = require("config");

const getInitialBalance = () => {
  return {
    balance: 0,
    credit: 0,
    debit: 0,
  };
};

// @route   POST /api/merchants
// @desc    register a new merchants
// @access  Public
router.post("/", async (req, res) => {
  const { fusionUser, user } = req.body;
  //TODO validate merchant details before registering
  user.balance = getInitialBalance();
  try {
    const existingMerchant = await Merchant.findOne({
      "user.email": user.email,
    });
    if (existingMerchant) {
      return res.json({ message: "Email already exist" });
    }
    const requestOptions = {
      url: FUSION_BASE_URL + "/ifi/" + IFI_ID + "/applications/newIndividual",
      method: "POST",
      json: true,
      headers: {
        "Content-Type": "application/json",
        "X-Zeta-AuthToken": X_ZETA_AUTH_TOKEN,
      },
      body: { ...fusionUser },
    };
    request(requestOptions, async (err, response, body) => {
      if (err) throw err;
      const { statusCode } = response;
      if (statusCode == 200) {
        //console.log(`body`, body);
        const { status, individualID } = body;
        if (status == "APPROVED") {
          user.fusionID = individualID;
          const merchant = new Merchant({ user });
          await merchant.save();
          res.json({ ...body, merchantID: merchant._id });
        } else {
          res.json({ ...body });
        }
      } else {
        return res.status(statusCode).json({ err: body });
      }
    });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
  }
});

// @route   GET /api/merchants/{merchantID}
// @desc    Get information of a particular merchant by his id
// @access  Protected
router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const merchant = await Merchant.findById(id);
    if (!merchant)
      return res.status(404).json({ message: "Invalid merchantID" });

    const { fusionID } = merchant.user;
    const requestOptions = {
      url: FUSION_BASE_URL + "/ifi/" + IFI_ID + "/accountHolders/" + fusionID,
      method: "GET",
      json: true,
      headers: {
        "Content-Type": "application/json",
        "X-Zeta-AuthToken": X_ZETA_AUTH_TOKEN,
      },
    };

    request(requestOptions, (err, response, body) => {
      if (err) throw err;
      const { statusCode } = response;
      return res.status(statusCode).json({ ...body });
    });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
  }
});

// @route   POST /api/merchants/signin
// @desc    Login for merchant
// @access  Public
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const merchantLogin = await Merchant.findOne({ "user.email": email });
    if (
      !merchantLogin ||
      !(await bcrypt.compare(password, merchantLogin.user.password))
    )
      return res.status(404).json({ message: "Invalid credentials" });
    const token = await merchantLogin.user.generateAuthToken(merchantLogin._id);
    res.json({
      message: "Signed In successfully",
      merchantID: merchantLogin._id,
      token,
    });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
  }
});

//TODO create a middleware for validating merchant
validateMerchant = (merchant) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(merchant);
};
module.exports = router;
