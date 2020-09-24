const app = require("./app");

const db = require("./models");

const PORT = process.env.PORT || 4000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running at PORT: ${PORT}`));
});
