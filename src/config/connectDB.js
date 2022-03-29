import Sequelize from 'sequelize'

const sequelize = new Sequelize('db-unicorn', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
})

const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log('connection has been established successfully')
    } catch(error) {
        console.log('Unable to connect to the database', error)
    }
}
export default connectDB