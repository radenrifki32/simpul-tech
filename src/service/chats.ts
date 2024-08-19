import { Chats } from "@/utils/types"
import { instanceApi } from "./api"
import { AxiosError, HttpStatusCode } from "axios"

interface ChatService {
    getDataChat (): Promise<Chats[] | Error>
    getDataChatById (id : number): Promise<Chats | Error>
}

export class ChatServiceImpl implements ChatService {
    async getDataChat(): Promise<Chats[] | Error > {
        try {
            const response = await instanceApi.get("/comments")
            if (response.status === HttpStatusCode.Ok) {
                return response.data 
            } else {
                return new Error("Failed Feth Data Chat")
            }
        } catch (error) {
            if (error instanceof Error) {
                return new Error (`Error Fetch Data Chat : ${error.message}`)
            } else if (error instanceof AxiosError) {
                return new Error(`Axios error: ${error.message}, Status Code: ${error.response?.status}`);
            } else {
                return new Error("unknown error occurred");
            }
        }
    }
    async getDataChatById(id : number): Promise<Chats | Error> {
        try {
            const response = await instanceApi.get(`/comments/${id}`)
            if (response.status === HttpStatusCode.Ok) {
                return response.data 
            } else {
                return new Error("Failed Feth Data Chat Detail")
            }
        } catch (error) {
            if (error instanceof Error) {
                return new Error (`Error Fetch Data Chat Detail : ${error.message}`)
            } else if (error instanceof AxiosError) {
                return new Error(`Axios error: ${error.message}, Status Code: ${error.response?.status}`);
            } else {
                return new Error("unknown error occurred");
            }
        }
    }
}