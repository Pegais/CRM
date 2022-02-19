const express = require("express");
const LoginRouter = express.Router();


// requiring the insert query from user/modal/user.modal
const { insert, getUserByEmail } = require('../user/model/user.model')

LoginRouter.all("/", (req, res, next) => {
    // res.json({
    //     message:"return user router"
    // })
    next();
})

// import hassedpasswordfunc
const hassedPassFunc = require('../utils/BrcyptingPassword')

// create new user coming to webPage;
LoginRouter.get('/', async (req, res) => {
    const { name, company, address, email, password } = req.body;
    let hasedPassword = await hassedPassFunc(password)
    console.log(hasedPassword)
    try {

        const result = await insert({ name, company, address, email, password: hasedPassword })
        console.log(result);
        res.json({
            message: 'user inserted', result
        })
    } catch (error) {
        console.log(error);
        res.json({
            message: 'error in inserting data', hasedPassword
        })

    }
})


// create  userLogin Route
// check if user is there in DB through email and bcrypt compare
const {ComparePassword} = require('../utils/BrcyptingPassword')
LoginRouter.post('/login', async (req, res) => {
    console.log(ComparePassword,"this is comparePassword function");
    try {

        const { email, password } = req.body
        if (!email || !password) {
            return res.json({ status: "failed", message: "login unsuccessful" })
        }
        const user = await getUserByEmail(email);
        console.log("user from database is:", user);
        const passwordFromDatabase = user && user._id ? user.password : null;
        console.log(passwordFromDatabase, email);
        if (user && user.password) {
            const result = await ComparePassword(password, passwordFromDatabase)
            
            console.log(result);
        } else {
            console.log("User not Found or User password invalid");
        }

    } catch (error) {
        console.log(error)
    }
    // res.json({status:"success",message:"login successully"})

})



module.exports = LoginRouter