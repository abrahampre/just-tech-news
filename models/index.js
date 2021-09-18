// este es el file para empezar a trabajar com los modelos, de aqui sale el modelo USER

const User = require('./User');
const Post = require('./Post');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User,{
    foreignKey: 'user_id'
})

module.exports = {User, Post};

