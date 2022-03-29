import bcrypt from 'bcrypt'

const matchPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

export default {
    matchPassword
}