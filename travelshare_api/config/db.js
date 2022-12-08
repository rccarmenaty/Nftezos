const { sequelize } = require("../models");

const connectDB = async () => {
  try {
    // console.log("Authenticating");
    await sequelize.sync({ logging: false });
    // console.log("Successfully authenticated");
  } catch (error) {
    // console.log("Error connecting DB" + error);
  }
};

module.exports = connectDB;

//  docker run -d -p 5432:5432 --name travelshare -e POSTGRES_PASSWORD=travelshare postgres
// docker exec -tiu postgres travelshare psql
