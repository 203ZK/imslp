import express from "express";
import cors from 'cors';
// import { getWorksByQuery } from "./controllers/works.js";
import { getScoreByLink, getScoresByWorkId } from "./controllers/scores.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Parse incoming requests with URL-encoded payloads (form data)
app.use(express.urlencoded({ extended: true }));

// app.get("/:query", getWorksByQuery);
// app.get("/work/:workId", getScoresByWorkId);
app.post("/score", getScoreByLink);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});