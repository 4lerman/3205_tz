import express from "express";
import "dotenv/config";
import middlewares from "./middlewares/error";
import { api } from "./handlers";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", api);
app.use(middlewares.errorHandler);

app.listen(port, () => {
	console.log(`Listening to port - ${port}`);
});
