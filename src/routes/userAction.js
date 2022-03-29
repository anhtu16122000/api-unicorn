import express from 'express'
import userController from '../controllers/userController'
import verify from '../middleware/verify'

const router = express.Router()
const { verifyAccount } = verify



router.post('/create', userController.create)
router.post('/login', userController.login)
router.get('/get-info', verifyAccount, userController.getInfo)
router.post('/refresh-token', userController.refreshToken)


export default router