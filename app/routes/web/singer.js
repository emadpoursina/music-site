import express from 'express'

const router = express.Router();

// Home Routes
router.get('/' , (req, res) => {
    res.send("singer");
});

export default router