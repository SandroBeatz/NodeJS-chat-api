import express from "express";
import messagesDb from "../db";
import {IMessage} from "../types";

const messagesRouter = express.Router();

messagesRouter.get('', async (req, res) => {
    const{query} = req;

    res.send({
        data: await messagesDb.getMessages(query.date as string | undefined)
    });
})

messagesRouter.post('', async (req, res) => {
    const{body} = req;

    if(!body.author) {
        res.render('422', { error: {author: 'This field is required'} });
        return;
    }

    if(!body.message) {
        res.render('422', { error: {message: 'This field is required'} });
        return;
    }

    const message = await messagesDb.addMessage({...body as IMessage})
    res.send(message);
})

export default messagesRouter
