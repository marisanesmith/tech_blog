const { Post } = require('../models');

const postData = [
    {
        "title": "Learning all about handlebars and MVC",
        "content": "Each day with proper studying I am learning more about coding. This includes full stack web development where you include the front end and the back end.",
        "user_id": 1
    },
    {
        "title": "Learning all about handlebars and MVC",
        "content": "Each day with proper studying I am learning more about coding. This includes full stack web development where you include the front end and the back end.",
        "user_id": 1
    },
    {
        "title": "Learning all about handlebars and MVC",
        "content": "Each day with proper studying I am learning more about coding. This includes full stack web development where you include the front end and the back end.",
        "user_id": 1
    }
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;