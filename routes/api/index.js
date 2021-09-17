const router = require('express').Router();

const userRoutes =require ('./user-routes.js');
//basicamente estamos creando este file para meter todas las rutas por aqui

router.use('/users',userRoutes);


module.exports=router;