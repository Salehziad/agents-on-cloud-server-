const express = require('express');
const {createFavourites,getUserFavourites,favouriteById,remove} = require('../controllers/favourites')
const {itemById} = require('../controllers/items')
const router = express.Router();
const { requireSignin,isAuth} = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post('/:itemId/:userId',requireSignin,isAuth,createFavourites);
router.get('/:userId',requireSignin,isAuth,getUserFavourites);

router.delete('/:favouriteId/:userId',requireSignin,isAuth,favouriteById,remove);
router.param("userId", userById);
router.param("itemId", itemById);
router.param("favouriteId", favouriteById);
module.exports = router;