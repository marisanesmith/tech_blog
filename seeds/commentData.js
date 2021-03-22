const { Comment } = require('../models');

const commentData = [
    {
        "name": "Marisa NeSmith",
        "comment": "This is such an informative blog post with lots of useful tips!"
    },
    {
        "name": "Marisa NeSmith",
        "comment": "This is such an informative blog post with lots of useful tips!"
    },
    {
        "name": "Marisa NeSmith",
        "comment": "This is such an informative blog post with lots of useful tips!"
    }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;