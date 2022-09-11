const express = require('express');
const {getItems, createItem,listByUser,itemById,remove,test} = require('../controllers/items')
const router = express.Router();
const { requireSignin,isAuth} = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get('/', getItems)
router.post('/:userId',requireSignin,isAuth,createItem);
router.get('/:userId',requireSignin,isAuth,listByUser);

router.delete('/:itemId/:userId',requireSignin,isAuth,itemById,remove);
router.put('/test/:itemId',itemById,test);

router.param("userId", userById);
router.param("itemId", itemById);
module.exports = router;