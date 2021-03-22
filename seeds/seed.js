const sequelize = require('../config/connection');
// const { User, Blog, Comment } = require('../models');

const seedComment = require('./commentData');
const seedBlog = require('./blogData');
const seedUser = require('./userData')

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED ----\n');

    await seedUser();
    console.log('\n-----USER SEEDED----\n');

    await seedBlog();
    console.log('\n-----BLOG SEEDED----\n');

    await seedComment();
    console.log('\n-----COMMENT SEEDED----\n');

    process.exit(0);
};

seedAll();

// const sequelize = require('../config/connection');
// const { User } = require('../models');

// const userData = require('./userData.json');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   process.exit(0);
// };

// seedDatabase();