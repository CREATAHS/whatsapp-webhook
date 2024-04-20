const nodemailer = require("nodemailer");

const sendMail = async () => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'creatahmailenquiry001@gmail.com',
          pass: 'izykktxgvyjuwvzl'
        }
      });
      
      var mailOptions = {
        from: 'dineshanbu999@gmail.com',
        to: 'dineshanbu999@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
};

module.exports = sendMail;
