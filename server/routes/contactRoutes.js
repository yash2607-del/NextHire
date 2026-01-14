import express from 'express';
import Contact from '../models/Contact.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// POST /api/contact - Submit contact form
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').notEmpty().withMessage('Message is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, phone, subject, message } = req.body;
      
      const contact = new Contact({
        name,
        email,
        phone,
        subject,
        message
      });

      await contact.save();

      res.status(201).json({ 
        message: 'Thank you for your message! We will get back to you soon.',
        success: true 
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({ 
        error: 'Failed to submit contact form. Please try again later.' 
      });
    }
  }
);

// GET /api/contact - Get all contact submissions (admin only)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Fetch contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
});

export default router;
