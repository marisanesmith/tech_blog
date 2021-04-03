const router = require('express').Router();
const { User, Comment, Blog } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('homepage');
});

router.get('/post', async (req, res) => {
  let blogData = await Blog.findAll({
  });
  const blog = blogData.map((post) => blog.get({ plain: true }));
  res.render('post', { blog, logged_in: req.session.logged_in});
});


router.get('/dashboard', withAuth, async (req, res) => {
  const commentData = await Blog.findAll({
    include: [
      {
        model: Comment,
        attributes: ['comment', 'user_id', 'post_id','date_created'],
      },
    ]
  });

  const blogData = await Blog.findAll({
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
  const blog = blogData.map((post) => blog.get({ plain: true }));
  const comments = commentData.map((comment) => comment.get({ plain: true}));
  console.log(posts);
  res.render('dashboard', { blog, logged_in: req.session.logged_in, comments});
});

router.get('/signup', async (req, res) => {
  res.render('signup', {
    title: "Sign Up"
  })
});


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
  // res.render('logout');
});

module.exports = router;