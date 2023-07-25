const db = require('../models')
const twit = db.Twit
const user = db.User //-- Define db dari models
const like = db.Like

module.exports = {
    createPost : async(req,res) => {
        try {
            const {konten} = req.body

            const result = await twit.create({konten,Image : req.file?.filename || "",UserId : req.user.id}) 
            res.status(200).send({
                msg: "Tweet created",
                status: true,
                result
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
    getAll : async(req, res) => {
        try {
            const result = await twit.findAll({
                include: {
                    model: user,
                },
                order: [[
                    "createdAt","DESC" //--- Untuk order by (ada di sequelize doc)
                ]]
            })
            res.status(200).send({
                msg: "All tweets",
                status: true,
                result
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },

    likeTweet : async(req, res) => {
        try {
            const {TwitId} = req.body;
            const UserId = req.user.id
            
            const result = await like.create ({
                UserId,
                TwitId,
                isLike : true,
            })
            res.status(200).send({
                msg: 'Like it!',
                result
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
    
}