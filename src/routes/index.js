import { Router } from 'express'
import userRoutes from './userRoutes.js';
import bookRoutes from './bookRoutes.js';
import loanRoutes from './loanRouters.js'

const routers=Router()
routers.use("/users",userRoutes);
routers.use("/books",bookRoutes);
routers.use("/loans",loanRoutes)

export {routers}