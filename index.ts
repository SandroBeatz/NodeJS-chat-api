import express from "express";
import cors from "cors";
import messagesRouter from "./routes/messages";
import db from "./db";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/messages', messagesRouter);


const run = async () => {
    await db.init();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(console.error);
