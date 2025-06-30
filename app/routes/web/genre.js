import express from 'express'

const router = express.Router();

// Home Routes
router.get('/' , (req, res) => {
    res.send("genre");
});

export default router