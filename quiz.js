
//Quiz
//I used nodeJS to solve the quiz

let fernet = require('./node_modules/fernet')
let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABcE4WZ34BGvLDod-S2pIbw7GV_5QkEdo257OqWgu2mN9dkZiXcuct8N1Efq_4FeVgtcTSK3nVRrdmLxkZgfO0qI3uNHDLzXpgDVkoj39473YqVfE37x2vR9vROyWZyAnf9liRJTy9053eLAt9VbK4kSYSf3nNEjpwqNHedEj_TKKx8m8H0U6qWG41maWO6gVjzzV1M'
let token = new fernet.Token({ secret: secret, token: message, ttl: 0 })
console.log(token.decode());
