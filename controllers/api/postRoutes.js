const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async(req, res) => {
  if (!req.session.logged_in) {
    res.status(400).json({ logged_in: false, message: 'Please log in first' });
    return;
  }

  try {
    let newPost = {
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    }
    let post = await Post.create(newPost);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// router.post('/', async (req, res) => {
//   try {
//     const newBlog = await Blog.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newBlog);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;