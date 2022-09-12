const express = require('express');
const {getItems, createItem,listByUser,itemById,remove,update,getOneItem} = require('../controllers/items')
const router = express.Router();
const { requireSignin,isAuth} = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get('/', getItems)
router.get('/:itemId',getOneItem)
router.post('/:userId',requireSignin,isAuth,createItem);
router.get('/userItems/:userId',requireSignin,isAuth,listByUser);

router.delete('/:itemId/:userId',requireSignin,isAuth,itemById,remove);
router.put('/:itemId/:userId',requireSignin,isAuth,itemById,update);

router.param("userId", userById);
router.param("itemId", itemById);
module.exports = router;