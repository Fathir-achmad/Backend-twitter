const nodeMailer = require('nodemailer');

const mailer = nodeMailer.createTransport({
    service: 'gmail',
    auth : {
        user: "fathir17.fa@gmail.com",
        pass: "msvsqgeixzvgekkz"
    },

    tls : {
        rejectUnauthorized: false
    }
})

module.exports = mailer