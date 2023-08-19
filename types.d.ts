export interface IMessage {
    author: string
    messages: string
}

export interface IMessageMutation extends IMessage {
    id: string
    created_at: string
}
