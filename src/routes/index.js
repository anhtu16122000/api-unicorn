import express from 'express'
import userAction from './userAction'

const initWebRoutes = ( app ) => {
    app.use('/user', userAction)

}

export default initWebRoutes

