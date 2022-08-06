const redis = require('redis')


const client = redis.createClient(process.env.REDIS_URL);
// bydefault = //localhost:6379
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();
const setJwt = async (key, value) => {
    console.log(typeof key, value);
  try {
    await client.set(key,value);
  } catch (error) {
    console.log(error);
  }


}
const getJwt = async(key) => {
   try {
       const value = await client.get(key);
       return value
   } catch (error) {
    console.log(error);
   }
}

module.exports = {
    setJwt,getJwt
}