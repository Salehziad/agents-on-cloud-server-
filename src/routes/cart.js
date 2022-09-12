const express = require('express');
const {createCart,getUserCart,remove,cartById} = require('../controllers/cart')
const {itemById} = require('../controllers/items')
const router = express.Router();
const { requireSignin,isAuth} = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post('/:itemId/:userId',requireSignin,isAuth,createCart);
router.get('/:userId',requireSignin,isAuth,getUserCart);

router.delete('/:cartId/:userId',requireSignin,isAuth,cartById,remove);
router.param("userId", userById);
router.param("itemId", itemById);
router.param("cartId", cartById);
module.exports = router;