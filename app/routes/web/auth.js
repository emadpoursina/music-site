import express from 'express'
// const passport = require('passport');

const router = express.Router();

// Controllers
import registerController from '../../http/controllers/auth/registerController.js';
// const loginController = require('app/http/controllers/auth/loginController');
// const forgotPasswordController = require('app/http/controllers/auth/forgotPasswordController');
// const resetPasswordController = require('app/http/controllers/auth/resetPasswordController');

// Routes
// router.get('/login' , loginController.showLoginForm);
// router.post('/login' , loginController.login);

router.get('/register' , registerController.showRegsitrationForm);
router.post('/register' , registerController.register); 

// router.get('/password/sendRecoveryEmail' , forgotPasswordController.showForgotPassword);
// router.post('/password/sendRecoveryEmail' , forgotPasswordController.sendResetLink);

// router.get('/password/reset/:token' , resetPasswordController.showResetPassword);
// router.post('/password/reset/:token' , resetPasswordController.resetPassword);

// router.get('/google' , passport.authenticate('google' , { scope : ['profile' , 'email'] }));
// router.get('/google/callback' , passport.authenticate('google' , { successRedirect : '/' , failureRedirect : '/register' }) )

export default router