import { Todo } from "@/utils/types";
import { instanceApi } from "./api";
import { AxiosError, HttpStatusCode } from "axios";
import { getRandomDate } from "@/utils/date";

interface TodoService {
    getTodoList(): Promise<Todo[] | Error>
}
export class TodoServiceImpl implements TodoService {
   async  getTodoList(): Promise<Todo[] | Error> {
            try {
                const response = await instanceApi.get("/todos")
                if (response.status === HttpStatusCode.Ok) {
                    const todos =  response.data 
                    const startDate = new Date('2024-01-01');
                    const endDate = new Date();
                    const todosWithDates = todos.map((todo: Todo) => ({
                        ...todo,
                        createdDate: getRandomDate(startDate, endDate).toISOString(),
                        description : `${todo.id} ${todo.title } lorem ipsum dolor sit amet consectetur adipisicing elit. lorem sit amet consectetur adipisicing elit `
                    }));
                    return todosWithDates
                } else {
                    return new Error("Failed Feth Data Todo")
                }
            } catch (error) {
                if (error instanceof Error) {
                    return new Error (`Error Fetch Data Todo : ${error.message}`)
                } else if (error instanceof AxiosError) {
                    return new Error(`Axios error: ${error.message}, Status Code: ${error.response?.status}`);
                } else {
                    return new Error("unknown error occurred");
                }
            }    
    }
}