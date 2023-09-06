import * as express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./user/routes";
import authRoutes from "./auth/routes";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized.");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization: ", error);
  });

const app = express();
const port = 3000;

app.use(express.json());

app.use("/users", userRoutes);
app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
