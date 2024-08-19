export type Chats = {
postId : number 
id : number 
name : string 
email : string 
body : string
}

export type Message = {
    id : string
    sender: 'user' | 'ai' | 'public';
    message: string;
    createdDate: Date
}

export type Todo = {
    userId? : number
    id? : number
    title : string
    completed : boolean
    createdDate : Date | null
    description? : string
}