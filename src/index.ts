import dotenv from "dotenv";

dotenv.config();

import { App } from "./app";

async function startServer() {
  try {
    const app = await new App().setupApp();
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 App running on port: ${PORT}`);
    });
  } catch (err) {
    console.warn(err);
    process.exit(1);
  }
}

startServer();
