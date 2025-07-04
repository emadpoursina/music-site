import express from 'express'
import pageRouter from './page.js'
import singerRouter from './singer.js'
import albumRouter from './album.js'
import genreRouter from './genre.js'
import trackRouter from './track.js'
import postRouter from './post.js'
import authRouter from './auth.js'

const router = express.Router();

// Middlewares
// const redirectIfAuthenticated = require('app/http/middleware/redirectIfAuthenticated');
// const redirectIfNotAuthenticated = require('app/http/middleware/redirectIfNotAuthenticated');
// const redirectIfNotAdmin = require('app/http/middleware/redirectIfNotAdmin');
// const errorHandler = require('app/http/middleware/errorHandler');

// Admin Router
// const adminRouter = require('app/routes/web/admin');
// router.use('/admin' , redirectIfNotAuthenticated.handle,  redirectIfNotAdmin.handle, adminRouter);

// Home Router
router.use('/' , pageRouter);

// Singer Router
router.use('/singer' , singerRouter);

// Album Router
router.use('/album', albumRouter);

// Genre Router
router.use('/genre', genreRouter);

// Music Router
router.use('/track', trackRouter);

// Post Router
router.use('/post', postRouter);

// Dashboard Router
// const dashboardRouter = require('app/routes/web/dashboard');
// router.use('/dashboard' , dashboardRouter);

// Auth Router
// router.use('/auth' , redirectIfAuthenticated.handle ,authRouter);
router.use('/auth', authRouter);

// Handle Errors
// router.all('*' , errorHandler.error404);
// router.use(errorHandler.handler)

export default router