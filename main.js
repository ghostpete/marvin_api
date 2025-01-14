import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { generateHTMLForEmailToClient } from './email.js';

dotenv.config();

const app = express();
const upload = multer(); // Initialize multer


const PORT = process.env.PORT || 3000;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const RECEPIENT_EMAIL = process.env.RECEPIENT_EMAIL;

app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for parsing JSON
app.use(bodyParser.json());

const corsOptions = {
  origin: 'https://marvin-api.vercel.app', // Allow only your frontend
  methods: 'GET,POST',
};
app.use(cors(corsOptions));

app.use(cors()); // Enable CORS for all routes

app.get('/', async(req, res) => {
  console.log("EMAIL_PASSWORD: ", EMAIL_PASSWORD)
  console.log("EMAIL_USER: ", EMAIL_USER)
  res.status(200).json({message: "This API is working fine..."})
})

// POST route to send email
app.post('/api/send-email', upload.none(), async (req, res) => {

  const data = await req.body;
  const { name, email, phone, country, amount, transaction: transaction_date, comment, tmethod,  } = data;

  console.log(name)

  console.log("This is the expected data: ", data)

  // Validate the request body
  if (!name || !email || !phone || !country || !amount || !transaction_date || !comment) {
    return res.status(400).json({ error: 'All fields are required: name, email, phone, country, amount, transaction date and story.' });
  }

  

  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service provider (e.g., Gmail, Outlook)
      auth: {
        user: EMAIL_USER, // Your email address
        pass: EMAIL_PASSWORD,   // Your email password (or app-specific password for Gmail)
      },
    });

    // Email options
    const mailOptions = {
      from: EMAIL_PASSWORD, // Sender address
      to: RECEPIENT_EMAIL,   // Recipient's email
      subject: " An email from: " + email, // Email subject
      html: generateHTMLForEmailToClient(
        name, 
        email, 
        phone, 
        country, 
        amount, 
        transaction_date, 
        comment,
        tmethod
      ), 
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully!', info });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



