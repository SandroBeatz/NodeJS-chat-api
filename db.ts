import { promises as fs } from 'fs';
import { v4 as uuid } from 'uuid';
import {IMessage, IMessageMutation} from "./types";

const file = 'messages.json'
const dir = './messages'
const pathName = `${dir}/${file}`

let data: IMessageMutation[] = [];

const messagesDb = {

    async init() {
        // data = [];
        const messages = await fs.readFile(pathName);
        data = JSON.parse(messages.toString())

        console.log(data)
    },

    async getMessages() {
        return data;
    },

    async addMessage(message: IMessage) {
        const date = new Date()

        const mutated: IMessageMutation = {
            id: uuid(),
            created_at: date.toString(),
            ...message
        }
        console.log(22222, data)

        data.push(mutated)

        console.log(55555, data)
        await this.save()
        await this.init()

        return mutated
    },

    async save() {
        try {
            await fs.access(dir);
            await fs.writeFile(pathName, JSON.stringify(data));
        } catch (e) {
            await fs.mkdir(pathName);
            await fs.writeFile(pathName, JSON.stringify(data));
        }
    },
    async delete(id: string) {
        // try {
        //     await fs.unlink(pathName + '/' + id + '.txt');
        //     await this.init();
        //
        //     return `File ${id} was deleted`;
        // } catch (e) {
        //     console.error(e);
        // }
    }



};

export default messagesDb;
