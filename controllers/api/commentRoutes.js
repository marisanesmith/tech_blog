const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newComment = {
      comment: req.body.comment,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    }
    const comment = await Comment.create(newComment);

    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;