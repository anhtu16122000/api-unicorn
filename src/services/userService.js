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
            const data = await model.User.findOne({
                where: {
                    userUserName: username
                }
            })
          
            resolve(data)
           
        } catch (err) {
            reject(err)
        }
       
    })  
}
export const update = (data, userId) => {
    console.log('update', data)
    return new Promise( async (resolve, reject) => {
        try {
            await model.User.update(data, {
                where: {
                    userId: userId 
                }
            })
            resolve(data)
        } catch (err) {
            reject(err)
        }
    })
}