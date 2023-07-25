const express = require('express');
const PORT = 2000;
const db = require('./models')
const cors = require('cors') //---Kegunaanya untuk dapat melakukan pertukaran data


const server = express();
server.use(express.json());
server.use(cors()) //---Kegunaanya untuk dapat melakukan pertukaran data

server.get('/',(req,res) => {
    res.status(200).send("This is Twitter API")
})

server.use(express.static('./public')) //--- Baca gambar di FE

const {userRouters, twitRouters} = require('./routers');
server.use('/user',userRouters) //-----------------------Setiap ada routers baru jangan lupa di server.use
server.use('/tweet',twitRouters)
server.listen(PORT,() => {
    // db.sequelize.sync({ alter:true })
    console.log(`Server running at Port : ${PORT}`);
})