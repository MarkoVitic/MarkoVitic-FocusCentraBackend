import lodash from "lodash";

import express from "express";
import profesoriRute from "./routing/profesori-routing";
import { dbConnection } from "./common/db-conection";
import subjetsRute from "./routing/subjects-routing";
import studetsRute from "./routing/students-routing";
import paymentsRute from "./routing/payments-routing";
import cors from "cors";
import professorSubjectRouting from "./routing/professor-subject-routing";
import globalDateRouting from "./routing/globalDate-routing";

const app = express();
app.use(cors());
app.use(express.json());

app.use(profesoriRute);
app.use(subjetsRute);
app.use(studetsRute);
app.use(paymentsRute);
app.use(professorSubjectRouting);
app.use(globalDateRouting);

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
