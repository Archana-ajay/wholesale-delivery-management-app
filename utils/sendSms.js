const twilio = require("twilio");

// Create a Twilio client
const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

exports.sendMessage = (to, otp) => {
    // Use the Twilio client to send an SMS
    client.messages
        .create({
            body: `welcome from wholesale app!!!your temporary password is ${otp}. You can use this to login or use forgot password to reset password`,
            to: "+91" + to,
            from: process.env.PHONE_NUMBER, // Twilio phone number
        })
        .then(() => {
            console.log(`Message sent`);
        })
        .catch((error) => {
            console.error("Error sending SMS:", error);
            
        });
};

exports.sendCode = (to, otp) => {
    // Use the Twilio client to send an SMS
    client.messages
        .create({
            body: `welcome from wholesale app!!! your verification code for reset password is ${otp}`,
            to: "+91" + to,
            from: process.env.PHONE_NUMBER, // Twilio phone number
        })
        .then(() => {
            console.log(`Message sent`);
        })
        .catch((error) => {
            console.error("Error sending SMS:", error);
            //res.status(500).json({ error: 'Error sending SMS' });
        });
};
