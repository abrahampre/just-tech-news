const router = require('express').Router();
const userRoutes = require ('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
//basicamente estamos creando este file para meter todas las rutas por aqui

router.use('/users',userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes)

module.exports=router;


