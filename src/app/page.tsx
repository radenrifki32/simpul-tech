'use client'
import * as React from "react";
import Image from "next/image";
import ButtonRound from "./components/button/ButtonRounded";
import Modal from "./components/modals/chatModal";
import Chat from "./components/chat/chat";
import { ChatServiceImpl } from "@/service/chats";
import { Chats, Message, Todo } from "@/utils/types";
import MessageIcon from "@/icons/messaging";
import { ChatUser } from "./components/chat/ChatUser";
import { v4 as uuidv4 } from 'uuid';
import TodoIcon from "@/icons/todo";
import Todos from "./components/todos/todos";
import { TodoServiceImpl } from "@/service/todo";
import { groq } from "@/utils/goq";


const chatService = new ChatServiceImpl()
const todoService = new TodoServiceImpl()
export default function Home() {
  const [openChatAndTodo, setOpenChatAndTodo] = React.useState<boolean>(false);
  const [openChatModal, setOpenChatModal] = React.useState<boolean>(false);
  const [openTodoModal, setOpenTodoModal] = React.useState<boolean>(false);
  const [loadingChat, setLoadingChat] = React.useState<boolean>(false)
  const [loadingTodo, setLoadingTodo] = React.useState<boolean>(false)
  const [chats,setChats] = React.useState<Chats[]>([])
  const [error, setError] = React.useState<string | null>(null);
  const [nextStepChat, setNextStepChat] = React.useState<boolean>(false)
  const [groupChat,setGroupChat] = React.useState<Message[]>([])
  const [detailChat,setDetailChat] = React.useState<Chats | null>(null)
  const [yourChat,setYourChat] = React.useState<string>('')
  const [dataTodo,setDataTodo] = React.useState<Todo[]>([])


  const handleClickOpenChatAndTodo = () => {
    setOpenChatAndTodo(!openChatAndTodo);
  };
  const handleClickChatOpen =  () => {
    setOpenChatModal(!openChatModal);
    setOpenTodoModal(false)
     getDataChats(true)

  };
  const handleClickCloseChat = () => {
    setNextStepChat(false)
    setOpenChatModal(false)
  }
  const handleClickOpenTodo =   () => {
    setOpenTodoModal(!openTodoModal)
    setNextStepChat(false)
    setOpenChatModal(false)
     getDataTodo()
  }
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const fetchAndSetChats = async () => {
    try {
      const response = await chatService.getDataChat();
      if (Array.isArray(response)) {
        const limitedChats = response.slice(0, 4);
        setChats(limitedChats);
        setError(null);
      } else {
        setError((response as Error).message);
        setChats([]);
      }
    } catch (error) {
      setError("Unexpected error occurred");
      setChats([]);
    }
  };
  
  const getDataChats = async (isLoading: boolean) => {
    setLoadingChat(isLoading);
    
    try {
      if (isLoading) {
        await delay(3000); 
      }
      await fetchAndSetChats(); 
    } catch (error) {
      setError("Unexpected error occurred");
      setChats([]);
    } finally {
        setLoadingChat(false); 
    }
  };
  


const fetchAndSetTodo = async () => {
  try {
    const response = await todoService.getTodoList();
    console.log(response);
    
    if (Array.isArray(response)) {
      const limitedTodo = response.slice(0, 4);
      setDataTodo(limitedTodo);
      setError(null);
    } else {
      console.log("Error response");
      setError((response as Error).message);
      setDataTodo([]);
    }
  } catch (error) {
    setError("Unexpected error occurred");
    setDataTodo([]);
  }
};

const getDataTodo = async () => {
  setLoadingTodo(true);
  
  try {
    await delay(2000); 
    await fetchAndSetTodo(); 
  } catch (error) {
    setError("Unexpected error occurred");
    setDataTodo([]);
  } finally {
    setLoadingTodo(false); 
  }
};



const getDataChatById = async (id: number) => {
  setNextStepChat(true);
  try {
    const response = await chatService.getDataChatById(id);
    if (response && !(response instanceof Error)) {
      setGroupChat([
        {
          id : uuidv4(),
          message: response.body,
          sender: 'ai', 
          createdDate : new Date()
        },
      ]);
      setDetailChat(response)
      setError(null);
    } else {
      setError((response as Error).message);
      setGroupChat([]);
    }
  } catch (error) {
    setError("Unexpected error occurred");
    setGroupChat([]);
  } finally {
    setLoadingChat(false);
  }
};


// const submitYourChat = async () => {
//   if (yourChat === '') return;  
//   setGroupChat((prevGroupChat) => [
//     ...prevGroupChat, 
//     {
//       id : uuidv4(),
//       sender: 'user',
//       message: yourChat,
//       createdDate: new Date()
//     }
//   ]);
//   setYourChat("");
//   await new Promise(resolve => setTimeout(resolve, 3000));
//   try {
//     const response = await groq.chat.completions.create({
//       messages: [{
//         role: 'user',
//         content: yourChat
//       }],
//       model: 'llama3-70b-8192'
//     });
//     const aiMessage = response?.choices[0]?.message?.content as string;
//     if (aiMessage) {
//       setGroupChat((prevGroupChat) => [
//         ...prevGroupChat, 
//         {
//           id : uuidv4(),
//           sender: 'ai',
//           message: aiMessage as string,
//           createdDate: new Date()
//         }
//       ]);
//     } else {
//       setGroupChat((prevGroupChat) => [
//         ...prevGroupChat, 
//         {
//           id : uuidv4(),
//           sender: 'ai',
//           message: "Saya Bingung Harus Jawab Apa ya?.",
//           createdDate: new Date()
//         }
//       ]);
//     }
//   } catch (error) {
//     setGroupChat((prevGroupChat) => [
//       ...prevGroupChat, 
//       {
//         id : uuidv4(),
//         sender: 'ai',
//         message: "AI nya Sudah Terkena Limit,Mohon Maaf! :).",
//         createdDate: new Date()
//       }
//     ]);
//   }
// };

const submitYourChat = async () => {
  if (yourChat === '') return;  
  setGroupChat((prevGroupChat) => [
    ...prevGroupChat, 
    {
      id : uuidv4(),
      sender: 'user',
      message: yourChat,
      createdDate: new Date()
    }
  ]);
  setYourChat("");
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGroupChat((prevGroupChat) => [
      ...prevGroupChat, 
      {
        id : uuidv4(),
        sender: 'ai',
        message: yourChat,
        createdDate: new Date()
      }
    ]);

}
const getTodoButtonClassNames = () => {
  if (openChatModal) {
    return 'translate-x-[-150%]';
  } else if (openTodoModal) {
    return 'translate-x-[20%] opacity-100';
  }
   else if (openChatAndTodo) {
    return 'translate-x-[-300%] opacity-100';
  } else {
    return 'translate-x-0 opacity-0';
  }
};





  return (
    <div className="relative flex justify-end items-end w-full" style={{ height: 'calc(100vh - 2.5rem)' }}>
    <div className="relative me-8 mb-10 flex items-center">
    <ButtonRound backgroundColor={openChatModal || openTodoModal ? 'bg-primary-black' :"bg-primary-blue"} onClick={handleClickOpenChatAndTodo}>
      <Image src="/icons/electricity.svg" height={13} width={13} alt="electricity-icon" />
    </ButtonRound>

    <div
     className={`absolute top-0 left-0 transition-transform duration-300 ease-out transform ${
      openChatModal ? 'translate-x-[20%]' : 'translate-x-[-150%]'
     } ${openChatAndTodo ? 'opacity-100' : 'opacity-0'} `}
   style={{ visibility: openChatAndTodo ? 'visible' : 'hidden', zIndex: openChatModal ? 10 : 1 }}
    >
      <div className="flex flex-col items-center space-y-2 cursor-pointer">
        <ButtonRound backgroundColor={ openChatModal  ? 'bg-indicators-purple' :`bg-primary-white`} onClick={handleClickChatOpen}>
          <MessageIcon color={!openChatModal  ? '#8885FF' :`#ffffff`} />
        </ButtonRound>
      </div>
    </div>

    <div
    className={`absolute top-0 left-0 transition-all duration-300 ease-out transform ${getTodoButtonClassNames()}`}
    style={{ visibility: openChatAndTodo || openChatModal ? 'visible' : 'hidden' }}
    >
      <div className="flex flex-col items-center space-y-2">
        <ButtonRound backgroundColor={openTodoModal ? "bg-indicators-orange" :"bg-primary-white"} onClick={handleClickOpenTodo}>
         <TodoIcon color={openTodoModal ? '#FFFFFF' : '#F8B76B'}/>
        </ButtonRound>
      </div>
    </div>
  </div>

      {openChatModal && (
          <Modal>
            {nextStepChat === true 
            ?
            <div className="w-full h-full py-vertical">
            <ChatUser conversation={groupChat} detailChat={detailChat} handleClick={submitYourChat} onChange={(e)=> setYourChat(e.target.value)} value={yourChat} setYourChat={setYourChat} setConversation={setGroupChat} back={setNextStepChat} close={handleClickCloseChat} />
            </div>

            : 
            <div className="w-full h-full px-horizontal py-vertical">
            <Chat loading={loadingChat} chats={chats} setChats={setChats} dataChat={getDataChats} getChatDetail={getDataChatById}/>
            </div>
            }
           
          </Modal>
      )}
      {openTodoModal && (
          <Modal>
            <div className="w-full h-full px-horizontal py-vertical">
              <Todos loading={loadingTodo}  todo={dataTodo} setTodo={setDataTodo}/>
            </div>
          </Modal>
      )}
    </div>
  );
}
