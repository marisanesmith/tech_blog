const router = require('express').Router();
const { User, Comment, Post } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('homepage');
});

router.get('/post', async (req, res) => {
  let postData = await Post.findAll({
  });
  const post = postData.map((post) => post.get({ plain: true }));
  console.log("this is my latest" + post);
  res.render('dashboard', { post, logged_in: req.session.logged_in});
});


router.get('/dashboard', async (req, res) => {
  const commentData = await Post.findAll({
    include: [
      {
        model: Comment,
        attributes: ['comment', 'user_id', 'post_id','date_created'],
      },
    ]
  });

  const postData = await Post.findAll({
    // sort: [Post.date_created, 'DESC'],
    include: [
      {
        model: User,
        attributes: ['name'],
      },
      {
        model: Comment,
        attributes: ['comment', 'user_id', 'post_id', 'date_created'],
      },
    ]
  }).catch((err) => {
    res.json(err);
  });
  const post = postData.map((post) => post.get({ plain: true }));
  const comments = commentData.map((comment) => comment.get({ plain: true}));
  console.log(post);
  res.render('dashboard', { post, logged_in: req.session.logged_in, comments});
});

router.get('/signup', async (req, res) => {
  res.render('signup', {
    title: "Sign Up"
  })
});

router.get('/createpost', async (req, res) => {
  res.render('createpost', {
    title: 'Create Post'
  })
});

// router.get('/post', async (req, res) => {
//   res.render('post', {
//     title: 'Post'
//   })
// });

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login', {
    title: "Login"
  });

});

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).redirect('/');
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;