const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const { auth, isAdmin } = require('../middleware/auth');

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Get IP address
    const ipAddress = req.headers['x-forwarded-for'] || 
                      req.connection.remoteAddress || 
                      req.socket.remoteAddress;

    // Save to database FIRST
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      ipAddress
    });

    await contact.save();

    // Try to send email (optional - won't fail if email not configured)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.EMAIL_PORT) || 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        // Send notification to admin
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          subject: `New Contact: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>IP: ${ipAddress}</small></p>
          `
        });

        // Send confirmation to user
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Thank you for contacting us',
          html: `
            <h2>Thank you for reaching out!</h2>
            <p>Hi ${name},</p>
            <p>We received your message and will get back to you soon.</p>
            <p><strong>Your message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <br>
            <p>Best regards,<br>Portfolio Team</p>
          `
        });

        console.log('✅ Emails sent successfully');
      } catch (emailError) {
        console.log('⚠️ Email sending failed (but contact saved):', emailError.message);
        // Don't throw error - contact is already saved
      }
    } else {
      console.log('ℹ️ Email not configured - skipping email notification');
    }

    // Always return success if contact was saved
    res.status(201).json({ 
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({ message: 'Error submitting contact form' });
  }
});

// @route   GET /api/contact
// @desc    Get all contacts
// @access  Private (Admin)
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/contact/:id
// @desc    Get single contact
// @access  Private (Admin)
router.get('/:id', auth, isAdmin, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    // Mark as read
    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/contact/:id
// @desc    Update contact status
// @access  Private (Admin)
router.put('/:id', auth, isAdmin, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete contact
// @access  Private (Admin)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;