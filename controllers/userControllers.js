const db = require('../models')
const user = db.User
const { Op } = require('sequelize') //-- function dari sequelize untuk kondisional and/or atau yg lain
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    register: async(req,res) => {
        try {
            const {username,email,phone,password,password_confirmation} = req.body


            if (password.length < 6) {throw ('Password must be at least 6 characters')}
            if (password !== password_confirmation) {
                throw('Password not match')
            }

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password,salt)

            const result = await user.create({username, email, phone, password:hashPassword})

            const data = await fs.readFileSync('verify.html', 'utf-8')
            const tempCompile = await handlebars.compile(data)
            const tempResult = tempCompile({username:username})
            await mailer.sendMail({
                from: "fathir17.fa@gmail.com",
                to: email,
                subject: "Verify account for register",
                html: tempResult
            })

            const payload = { id: result.id, isVerify: result.isVerified }
            const token = jwt.sign(payload,"fathir-achmad",{expiresIn: '1h'})

            res.status(200).send({
                token,
                msg: "Account created",
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
            const result = await user.findAll()
            res.status(200).send({
                msg: "All accounts",
                status: true,
                result
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
    login : async(req, res) => {
        try {
            const { data ,password } = req.body
            const result = await user.findOne({
                where : {
                    [Op.or] : [ 
                    {username : data},
                    {email : data},
                    {phone : data},
                    ]
                }
            })

            if (!result) {
                throw('User not found, please register first')
            }
            
            const isValid = await bcrypt.compare(password, result.password)
            if (!isValid) {
                if (result.attempt == 3) {
                    await result.update({
                        isVerify : false,
                        attempt : 0,
                    })
                    throw('Please verify first')
                }
                let jumlah = result.attempt 
                await result.update({
                    attempt : jumlah +1 
                })
                throw('Wrong password')
            }
            if (!result.isVerify) {
                throw('User not verified')
            }

            const payload = { id: result.id, isVerified: result.isVerified }
            const token = jwt.sign(payload,"fathir-achmad",{expiresIn: '1d'})

            res.status(200).send({
                token,
                msg: "Login success",
                status: true,
                result
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
    keepLogin : async(req, res) => { // Agar bisa keep login 
        try {
            const result = await user.findOne({
                where: {
                    id : req.user.id
                }
            })

            res.status(200).send({
                msg: "All accounts",
                status: true,
                result
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
    verify : async(req, res) => {
        try {
            const result = await user.update(
                {isVerify : true},
                {where: {id : req.user.id}}
            )
            res.status(200).send({
                msg: "Account is verified",
                status: true,
                result
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },

}