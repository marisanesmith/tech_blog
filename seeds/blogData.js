const { Blog } = require('../models');

const blogData = [
    {
        "title": "Learning all about handlebars and MVC",
        "content": "Each day with proper studying I am learning more about coding. This includes full stack web development where you include the front end and the back end."
    },
    {
        "title": "Learning all about handlebars and MVC",
        "content": "Each day with proper studying I am learning more about coding. This includes full stack web development where you include the front end and the back end."
    },
    {
        "title": "Learning all about handlebars and MVC",
        "content": "Each day with proper studying I am learning more about coding. This includes full stack web development where you include the front end and the back end."
    }
];

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;