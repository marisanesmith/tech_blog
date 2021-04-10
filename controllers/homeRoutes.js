const router = require('express').Router();
const { User, Comment, Post } = require('../models');
// const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
//   // Send the rendered Handlebars.js template back as the response
//   res.render('homepage');
// });

router.get('/', async (req, res) => {
  try {
      const postData = await Post.findAll({
          include: [
              {   model: User,
                  attributes: ['name']
              },
          ],
      });
      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('homepage', { 
          posts,
          logged_in: req.session.logged_in
       });
  } catch (err) {res.status(500).json(err);
  }
});

router.get('/post', async (req, res) => {
  let postData = await Post.findAll({
  });
  const post = postData.map((post) => post.get({ plain: true }));
  console.log("this is my latest" + post);
  res.render('dashboard', { post, logged_in: req.session.logged_in});
});

router.get('post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User 
        },
        {
          model: Comment
        }
      ]
    });
    if (!postData) res.status(400).json({ message: "Post not found with this ID."});

    const post = postData.get({ plain: true });

    res.render('editPost', { post, name: req.session.user_name, logged_in: req.session.logged_in});
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/dashboard', async (req, res) => {
  try {
    const userData = await User.findByPk(
      req.session.user_id,
      {
        attributes: {
          exclude: ['password']
        },
        include: [
          {
            model: Post
          }
        ]
      });

    const user = userData.get({
      plain: true
    });

    res.render('dashboard',
      {
        ...user,
        logged_in: true
      });

  } catch (err) {
    res.status(500).json(err);
  }
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