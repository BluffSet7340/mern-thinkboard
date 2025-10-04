import express from 'express'
import { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth } from '../controllers/authController.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

// to check if user is logged in or not, we can use the middleware, as a way to protect routes
// after passing middleware, we do the checkAuth function
router.get("/check-auth", verifyToken, checkAuth)

// here we can write what each route does
router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

router.post("/verify-email", verifyEmail)
// just using this as a test to debug routing issues
router.post("/forgot-password", forgotPassword)

router.post("/reset-password/:token", resetPassword)

export default router;