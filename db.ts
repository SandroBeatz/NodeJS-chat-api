import { promises as fs } from 'fs';
import { v4 as uuid } from 'uuid';
import {IMessage, IMessageMutation} from "./types";

const file = 'messages.json'
const dir = './messages'
const pathName = `${dir}/${file}`

let data: IMessageMutation[] = [];

const messagesDb = {

    async init() {
        try {
            await fs.access(dir);
            const messages = await fs.readFile(pathName);
            data = JSON.parse(messages.toString())
        } catch (e) {
            await fs.mkdir(dir);
            await fs.writeFile(pathName, JSON.stringify([]));
        }
    },

    async getMessages(date: string | undefined) {
        if(date) {
            const index = data.findIndex(i => i.created_at === date)

            return data.slice(index + 1)
        }

        return data;
    },

    async addMessage(message: IMessage) {
        const date = new Date()

        const mutated: IMessageMutation = {
            id: uuid(),
            created_at: date.toJSON(),
            ...message
        }

        data.push(mutated)
        await this.save()
        await this.init()

        return mutated
    },

    async save() {
        await fs.writeFile(pathName, JSON.stringify(data));
    },
};

export default messagesDb;
