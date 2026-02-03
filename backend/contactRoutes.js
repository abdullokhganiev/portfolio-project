const express = require('express');
const router = express.Router();
const pool = require('./db');

// GET all contact submissions
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contact_submissions ORDER BY submitted_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new contact submission
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const result = await pool.query(
      'INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;