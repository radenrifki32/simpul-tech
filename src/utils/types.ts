export type Chats = {
postId : number 
id : number 
name : string 
email : string 
body : string
}

export type Reply = {
    id : string
    body : string
    sender : string
}
export type Message = {
    id : string
    sender: 'user' | 'ai' | 'public';
    message: string;
    createdDate: Date
    reply? : Reply
}

export type FavoriteTodo = {
    id : string,
    title : string,
    color? : string
}

export type Todo = {
    userId? : number
    id? : number
    title : string
    completed : boolean
    createdDate : Date | null
    description? : string
    favorite ?: FavoriteTodo[]
}