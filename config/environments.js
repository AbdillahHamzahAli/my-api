import "dotenv/config";

const CONFIG = {
  db: process.env.DB,
  port: process.env.PORT,
  privateKey: process.env.PRIVATE_KEY,
};

export default CONFIG;
