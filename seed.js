const sequelize = require('./config/connection');

const UserTbl = require('./models/User');
const ImageTbl = require('./models/Image');

const userData = require('./userData.json');
const imageData = require('./imageData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await UserTbl.bulkCreate(userData, {
    returning: true,
  });

  const images = await ImageTbl.bulkCreate(imageData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
