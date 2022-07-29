const express = require('express');

const router = express.Router();

router.get('/categories', async (_, res, next) => {
  try {
    res.status(501).json({ message: 'Not Implemented' });
  } catch (err) {
    next(err);
  }
});

router.get('/cashflow', async (_, res, next) => {
  try {
    res.status(501).json({ message: 'Not Implemented' });
  } catch (err) {
    next(err);
  }
});

router.get('/merchants', async (_, res, next) => {
  try {
    res.status(501).json({ message: 'Not Implemented' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
