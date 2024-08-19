import * as React from 'react'
import { Chats } from "@/utils/types";
import SearchBar from "../search/searchBar";
import Loading from '../Loading/loading'
import SingleChat from "./singleChat";

interface ChatProps {
    loading : boolean
    chats : Chats[],
    setChats :  React.Dispatch<React.SetStateAction<Chats[]>>
    dataChat : (isLoading : boolean)=> void
    getChatDetail : (id : number)=> void
}


export default function Chat({ loading, chats,setChats ,dataChat,getChatDetail}: ChatProps) {
    const [searchQuery, setSearchQuery] = React.useState<string>('');

    const searchDataChat = (query: string) => {
        if(searchQuery === ''){ 
            dataChat(false)
        } else {
            const filterDataChat =  chats.filter((chat) =>
                chat.email.toLowerCase().includes(query.toLowerCase())
            );
            setChats(filterDataChat)
        }
    };
    const handleClickById =  (id : number) => {
        getChatDetail(id)
    }
    
    return (
        <div className="w-full h-full">
            <SearchBar  value={searchQuery} handleClick={searchDataChat} onChange={(e)=> setSearchQuery(e.target.value)}/>
            <div className=" w-full h-full">
            {loading ? (
                <div className="flex items-center justify-center h-full">
            <Loading title="Loading Chats.." />
                </div>
               
            ) : (
                chats.map((item : Chats) => (
                    <div className="my-vertical cursor-pointer" key={item.id} onClick={()=> handleClickById(item.id)}>
                      <SingleChat chat={item}/>
                    </div>
                ))
            )}
            </div>
          
        </div>
    );
}