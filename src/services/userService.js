import model from '../models'
import bcrypt from 'bcrypt'

export const createUser =  (data) => {
    const saltRounds = 10

    return new Promise( async (resolve, reject) => {
        try {
            const hashedPassword = await bcrypt.hash(data.password, saltRounds)
            await model.User.create({
                userUserName: data.username,
                userPassword: hashedPassword, 
            })
            resolve('insert successully')
        } catch (err) {
            reject('insert failure')
        }
    })
}
export const getUser = (username) => {
    return new Promise( async (resolve, reject) => {
        try {
            const user = await model.User.findOne({
                where: {
                    userUserName: username
                }
            })
            resolve(user)
        } catch (err) {
            reject(err)
        }
       
    })
   
}