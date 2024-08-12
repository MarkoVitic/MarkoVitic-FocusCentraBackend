import lodash from "lodash";

import express from "express";
import profesoriRute from "./routing/profesori-routing";
import { dbConnection } from "./common/db-conection";

const app = express();
app.use(express.json());

app.use(profesoriRute);

dbConnection
  .initialize()
  .then(() => console.log("Data Source has been initialized!"))
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const port = 3000;

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
