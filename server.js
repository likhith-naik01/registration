// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Route to handle form submissions
app.post('/register', (req, res) => {
    const { username, email } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'likhithnaik01@gmail.com',
        subject: 'New Registration',
        text: `A new user has registered:\n\nUsername: ${username}\nEmail: ${email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email');
        }

        // Send a thank you email to the user
        const thankYouMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank You for Registering',
            text: 'Thank you for registering on our website!'
        };

        transporter.sendMail(thankYouMailOptions, (error) => {
            if (error) {
                return res.status(500).send('Error sending thank you email');
            }

            res.status(200).send('Registration successful');
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
