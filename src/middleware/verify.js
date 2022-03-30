import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const verifyAccount = (req, res, next) => {
    const headerAuth     = req.headers.authorization
    if(!headerAuth) 
        return res.status(401).json({ message: 'Bạn chưa đăng nhập' })
    
    const accessToken    = headerAuth.split(' ')[1]
    
    jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, (error, dataDecoded) => {
        if(error) {
            return res.status(403).json({
                message: 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại'
            })
        }
        req.dataDecoded = dataDecoded
        next()       
    })
}
const verifyPrivileges = (req, res, next) => {
    verifyAccount(req, res, () => {
        
    })
}

export default {
    verifyAccount
}