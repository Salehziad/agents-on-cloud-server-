const express = require('express');
const {getItems, createItem,itemById,test} = require('../controllers/items')
const {createComment,getItemComments,remove,commentById} = require('../controllers/comment')
const router = express.Router();
const { requireSignin,isAuth} = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get('/:itemId', getItemComments)
router.post('/:userId/:itemId',requireSignin,isAuth,createComment);
// router.get('/:userId',requireSignin,isAuth,listByUser);

router.delete('/:commentId/:userId',requireSignin,isAuth,commentById,remove);
// router.put('/test/:itemId',itemById,test);

router.param("userId", userById);
router.param("itemId", itemById);
router.param("commentId", commentById);
module.exports = router;