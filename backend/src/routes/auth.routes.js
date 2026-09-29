import express from 'express'

import { registerManager , loginManager } from '../controllers/auth.controller.js'

const router = express.Router();

router.post('/register-manager', registerManager) ;
router.post('/login-manager' , loginManager)

export default router ; 