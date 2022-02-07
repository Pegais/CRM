// here in user.model ,we will write queries to the database;
const { UserSchema } = require('./use.schema')

// insert query
const insert = (userObj) => {
    return new Promise((resolve, reject) => {
        
        UserSchema(userObj).save()
            .then(data => resolve(data))
            .catch(error => reject(error));
    })
}

module.exports = {
    insert,
};
