// here in user.model ,we will write queries to the database;
const { ResetPinSchema} = require('./resetPassword.schema')
const randomNumGenerator = require("../../utils/randomNumGenerator");
const { reject } = require('bcrypt/promises');
// insert query
const getresetPin = async(email) => {
    // create a obj with email and random pin
    try {
        const length = 6;
    const randPin = await randomNumGenerator(length)
    let testObj = {
        email,
        pin:randPin
    }
    return new Promise((resolve, reject) => {

        ResetPinSchema(testObj).save()
            .then(data => resolve(data))
            .catch(error => reject(error));
    })
    } catch (error) {
        console.log(error);
    }
}

// getting userEmail from Database;



module.exports = {
    getresetPin,
  
};
