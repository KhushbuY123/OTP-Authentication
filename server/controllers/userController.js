const users = require("../models/userSchema");
const userOtp = require("../models/userOtp");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new twilio(accountSid, authToken);

exports.userregisteration = async (req, res) => {
    const { name, email, password,phone } = req.body;
    if (!name || !email || !password || !phone) {
        res.status(400).json({ error: "Please fill all the fields" });
    }
    try{
        const userExist = await users.findOne({ email: email });
        if (userExist) {
            res.status(400).json({ error: "User already exists" });
        }
        else{
            const userregister = new users({ name, email, password ,phone});
        
        // here password hashing will be done
        const storeData=await userregister.save();
        console.log(storeData);
        res.status(200).json({ message: "User registered successfully" ,storeData});}
        alert("Registered Successfully")
    }catch(err){
        console.log(err);
        res.status(400).json({ error: "Failed to register",err});
    };
}


exports.userOtpSend = async (req, res) => {
    const { email, phone } = req.body;

    if (!email || !phone) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    try {
        const userExist = await users.findOne({ email: email ,phone:phone});

        if (!userExist) {
            return res.status(400).json({ error: "User does not exist" });
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Check if the email is already associated with an OTP and update it
        const existEmail = await userOtp.findOne({ email: email });
        if (existEmail) {
            const updateData = await userOtp.findByIdAndUpdate(
                { _id: existEmail._id },
                { otp: otp },
                { new: true }
            );
            await updateData.save();
        } else {
            const saveOtpData = new userOtp({
                email: email,
                otp: otp
            });
            await saveOtpData.save();
        }

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "OTP for Login Validation",
            text: `Your OTP is ${otp}`
        };

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log("Error Occurs", err);
                return res.status(400).json({ error: "Failed to send OTP via email", err });
            } else {
                console.log("Email sent!!!");
            }
        });
        twilioClient.messages.create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER, 
            to: `+91${phone}`  
        })
        .then((message) => {
            console.log(`SMS sent: ${message.sid}`);
            return res.status(200).json({ message: "OTP sent successfully via email and SMS" });
        })
        .catch((err) => {
            console.error("Error sending SMS", err);
            return res.status(400).json({ error: "Failed to send OTP via SMS", err });
        });

    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: "Failed to send OTP", err });
    }
};


exports.userverify = async (req, res) => {
    const { email, otp, phone } = req.body;
    if (!email || !otp || !phone) {
        res.status(400).json({ error: "Please fill all the fields" });
    }
    try{
        const userExist = await users.findOne({ email: email });
        if (!userExist) {
            res.status(400).json({ error: "User does not exists" });
        }
        else{
            const userOtpExist = await userOtp.findOne({ email: email });
            if (!userOtpExist) {
                res.status(400).json({ error: "OTP does not exists" });
            }
            else{
                if (userOtpExist.otp == otp) {
                    const preuser=await users.findOne({email:email});
                    
                    //token generation
                    const token = await preuser.generateAuthToken();
                    res.status(200).json({ message: "OTP verified successfully", userToken:token });
                } else {
                    res.status(400).json({ error: "Invalid OTP" });
                }
            }
        }
    }catch(err){
        console.log(err);
        res.status(400).json({ error: "Failed to verify OTP",err});
    };
}