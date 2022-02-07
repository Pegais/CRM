const express = require("express");
const { status } = require("express/lib/response");
const LoginRouter = express.Router();

// requiring the insert query from user/modal/user.modal
const {insert} =require('../user/model/user.model')

LoginRouter.all("/", (req, res, next) => {
    // res.json({
    //     message:"return user router"
    // })
    next();
})
LoginRouter.get('/', async (req, res) => {
    try {
        
        const result = await insert(req.body)
        console.log(result);
        res.json({
            message:'user inserted',result
        })
    } catch (error) {
        console.log(error);
        res.json({
            message:'error in inserting data',
        })
        
    }
})




module.exports=LoginRouter