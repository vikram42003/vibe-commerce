const app = require("./app");
const config = require("./utils/env");
const { connectDB } = require("./config/mongodb");

// If the DB connection is successful only then start the express backend
connectDB().then(() => {
  app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
  });
});
