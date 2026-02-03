const express = require('express');
const router = express.Router();
const pool = require('./db');

// GET all skills
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM skills ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new skill
router.post('/', async (req, res) => {
  try {
    const { skill_name, category, proficiency_level } = req.body;
    const result = await pool.query(
      'INSERT INTO skills (skill_name, category, proficiency_level) VALUES ($1, $2, $3) RETURNING *',
      [skill_name, category, proficiency_level]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;