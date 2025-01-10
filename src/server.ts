import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("Hello bro!");
});

app.listen(port, () => {
	console.log(`Listening to port - ${port}`);
});
