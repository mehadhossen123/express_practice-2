import app from "./app/app";
import config from "./config";
import { initDB } from "./database/db";

const main = () => {
  // the server is start here
  initDB();
  app.listen(config.port, () => {
    console.log(`the server is running on port : ${config.port}`);
  });
};
main()