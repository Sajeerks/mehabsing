const nodeMailer = require("nodemailer")


const sendEmail = async (options) =>{

    const transporter = nodeMailer.createTransport({
        // service:process.env.SMPT_SERVICE,
        // port:465,
        // secure: true,
        // secureConnection: false,

        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD, 
            // user:"sajeersayed@gmail.com", 
            // pass:"rugmfhhjlqxiqwuz" 
        },
        // tls:{
        //     rejectUnAuthorized:true
        // }
/////////////////////////////////
        // port: 25,
        // secure: false,
        // logger: true,
        // debug: true,
        // ignoreTLS: true 
    })
    const mailOptions ={
        from:process.env.SMPT_MAIL, 
        to:options.email,
        subject:options.subject, 
        text:options.message
    }

    // await transporter.sendMail(mailOptions)
    console.log(transporter.options.host);
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
transporter.verify((err, success) => {
    if (err) console.error(err);
    console.log('Your config is correct');
});
////////////////////////////
    let info = await transporter.sendMail(mailOptions);
console.log(`Message Sent: ${info.messageId}`);
//////////


};


module.exports = sendEmail;