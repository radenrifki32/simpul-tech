import * as React from "react";
import Image from "next/image";
import Clock from "@/icons/Clock";
import { Todo } from "@/utils/types";
import PencilIcon from "@/icons/pencil";

interface AddTodoProps {
    handleChangeFormTodo : (event : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
    formTodo : Todo
}

export default function AddTodo({ handleChangeFormTodo, formTodo }: AddTodoProps) {
    const createdDate = formTodo.createdDate ? new Date(formTodo.createdDate) : null;
    const [openDescription,setOpenDescription] = React.useState<boolean>(false)
    
    return (
        <>
            <div className="py-vertical">
                <div className="flex items-start gap-3">
                    <div className="flex gap-3 flex-1">
                        <label>
                            <input name="completed" type="checkbox"  onChange={handleChangeFormTodo}/>
                            <span className="custom-checkbox me-2">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2H16V16ZM13.58 4.58L14.99 6L6.99 14L2.99 10.01L4.41 8.6L6.99 11.17L13.58 4.58Z" fill="#828282"/>
                                </svg>
                            </span>
                        </label>
                        <div className="rounded-md">
                            <input  type="text" name="title" onChange={handleChangeFormTodo} placeholder="Type Task Title" className="w-[300px] border-[1px] border-primary-gray px-2 py-1 rounded-md text-primary-black placeholder:text-primary-black" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 relative">
                        <Image src="/icons/arrow.svg" alt="arrow" width={20} height={20} />
                        <p className="font-lato font-light text-primary-black text-name mb-2 cursor-pointer">....</p>
                    </div>
                </div>
                <div className="flex items-center gap-6 mx-vertical mt-4">
                    <Clock color={createdDate !== null && isNaN(createdDate.getTime()) || formTodo.createdDate === null ? '#4F4F4F' : '#2F80ED'} />
                    <div className="relative flex items-center w-2/5">
                        <input
                            name="createdDate"
                            onChange={handleChangeFormTodo}
                            type="text"
                            onFocus={(event) => { event.target.type = 'date'; }}
                            onBlur={(event) => { event.target.type = 'text'; }}
                            placeholder="Set Date"
                            className="border-[1px] border-primary-gray px-1 py-1 rounded-md w-full text-primary-black placeholder:text-primary-black"
                        />
                    </div>
                </div>
                <div className="flex items-start gap-6 mx-vertical mt-4 w-full">
                    <PencilIcon color={formTodo.description === '' ? '#4F4F4F' : '#2F80ED'} handleClick={()=> setOpenDescription(!openDescription)} />
                    <div className="w-full me-vertical">
                        {
                            !openDescription ? <p className="font-lato font-bold text-small  text-primary-black">No Description</p>
                             : 
                             <textarea
                            name="description"
                            onChange={handleChangeFormTodo}
                            className="border-[1px] border-primary-gray px-2 py-2 rounded-md font-lato text-name text-primary-black w-full"
                        />
                        }
                        
                    </div>
                </div>
            </div>
        </>
    );
}
