import * as userService from '../services/userService'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


class userController {
    constructor() {
        console.log('constructor userController')
    }
    // [POST] /create
    create(req, res, next) {
        userService.createUser(req.body)
            .then( res => res.send(res))
            .catch( error => res.send(error));
    }
    // [POST] /login
    async login(req, request, next) {
        const { username, password } = req.body
        const errorMessage = 'Tài khoản hoặc mật khẩu không đúng'

        userService.getUser(username)
            .then( async dataUser => {
                if(!dataUser) return request.status(400).json({
                    message: errorMessage,
                })
                const { userPassword, ...dataJWT } = dataUser
  
                const checkPassword = await bcrypt.compareSync(password, userPassword) 
                if(checkPassword) {

                    const accessToken = jwt.sign(
                        dataJWT, 
                        process.env.ACCESS_SECRET_KEY, 
                        { expiresIn: process.env.EXPIRE_ACCESS_TOKEN }
                    )
                    const refreshToken = jwt.sign(
                        dataJWT,
                        process.env.REFRESH_SECRET_KEY,
                        { expiresIn: process.env.EXPIRE_REFRESH_TOKEN }
                    )

                    return request.status(200).json({
                        message: 'Đăng nhập thành công',
                        accessToken,
                        refreshToken
                    })
                }else {
                    return request.status(400).json({
                        message: errorMessage
                    })
                }

            })
            .catch( error => {
                console.log('error', error)
                return request.status(500).json(error)
            });
    }
    // [GET] /get-info
    getInfo(req, res, next) {
        res.status(200).json(req.headers.authorization)
    }

    // [POST] /refresh-token 
    refreshToken(req, res, next) {
        const refreshToken     = req.body.refreshToken
        const listRefreshToken = []
        if(!refreshToken) 
            return res.sendStatus(401)

        if(!listRefreshToken.includes(refreshToken)) 
            return res.sendStatus(403)

        jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (error, dataUser) => {
            if(error) 
                return res.sendStatus(403)
                const { iat, exp , ...data } = dataUser
                const accessToken = jwt.sign(
                    data,
                    process.env.ACCESS_SECRET_KEY,
                    { expiresIn: process.env.EXPIRE_ACCESS_TOKEN }
                )
                const refreshToken = jwt.sign(
                    data,
                    process.env.REFRESH_SECRET_KEY,
                    { expiresIn: process.env.EXPIRE_REFRESH_TOKEN }
                )
            return res.status(200).json({
                accessToken,
                refreshToken
            })
        })
    

    }
}
export default new userController()