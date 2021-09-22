const router = require('express').Router();
const sequelize = require('../../config/connection');
const{Post, User, Vote} = require('../../models');

/// get all

  router.get('/', (req, res) => {
    Post.findAll({
      attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id =vote.post_id)'), 'vote_count']
      ],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

 // get 1 

  router.get('/:id',(req,res)=>{
      Post.findOne({
          where:{
              id: req.params.id
          },
          attributes:[
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id =vote.post_id)'), 'vote_cout']
          ],
          include:[
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(dbPostData=>{
          if(!dbPostData){
              res.status(404).json({message:'No post found with this ID'});
              return;
          }
          res.json(dbPostData);
      })
      .catch(err=>{
          console.log(err);
          res.status(500).json(err);
      });
  });

  // post 1 post 

  router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.body.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

///////// PUT/api/posts/upvote///////////////////////////////
  router.put('/upvote',(req,res)=>{
    // Vote.create({
    //   user_id: req.body.user_id,
    //   post_id: req.body.post_id
    // })
    // .then(() => {
    //   // then find the post we just voted on
    //   return Post.findOne({
    //     where: {
    //       id: req.body.post_id
    //     },
    //     attributes: [
    //       'id',
    //       'post_url',
    //       'title',
    //       'created_at',
    //       // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name `vote_count`
    //       [
    //         sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
    //         'vote_count'
    //       ]
    //     ]
    //   })
    // })
    Post.upvote(req.body, { Vote })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  });
  /// update title 
  router.put('/:id',(req,res)=>{
    Post.update(
      {
        title: req.body.title
      },
      {
        where:{
          id: req.body.id
        }
      }
    )
    .then(dbPostData =>{
      if(!dbPostData){
        res.status(404).json({message:'No post found with this id'});
        return;
      }
      res.json(dbPostData);
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json(err);
    });
  })
///////////////delete post
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
 
module.exports = router;