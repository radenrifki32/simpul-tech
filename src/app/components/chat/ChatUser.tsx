import * as React from 'react';
import { Chats, Message } from '@/utils/types';
import Image from 'next/image';
import { MessageBubble } from './messageBuble';
import { v4 as uuidv4 } from 'uuid';
import Button from '../button/Button';

interface ChatUserProps {
    conversation: Message[];
    detailChat: Chats | null;
    value: string;
    handleClick: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setYourChat : React.Dispatch<React.SetStateAction<string>>
    setConversation : React.Dispatch<React.SetStateAction<Message[]>>
    back : React.Dispatch<React.SetStateAction<boolean>>
    close : ()=> void
}

export function ChatUser({ conversation, detailChat, handleClick, value, onChange, setYourChat,setConversation,back,close }: ChatUserProps) {
    const [publicMessages, setPublicMessages] = React.useState<Message[]>([]);
    const [lastMessageDate, setLastMessageDate] = React.useState<Date | null>(null);
    const [showNewMessage, setShowNewMessage] = React.useState(false);
    const [editingId, setEditingId] = React.useState<string | null>(null);
    const [activeMenuId, setActiveMenuId] = React.useState<string | null>(null);


    const allMessages = [...conversation, ...publicMessages].sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime());
    const handleEdit = (id: string) => {
        setActiveMenuId(null)
        const editText = allMessages.find((message)=> message.id === id)
        if(editText) {
            setYourChat(editText.message)
            setEditingId(id)
        }
    };
    const handleDelete = (id: string) => {
        const removeChatUser =  conversation.filter((message)=> message.id !== id)
        setConversation(removeChatUser)
    };
    const handleMenuToggle = (id: string) => {
        setActiveMenuId(prevId => (prevId === id ? null : id));
    };
    const getDateSeparator = (index: number) => {
        return index === 3;
    };
    const submitMessage = ()=> {
        if(editingId) {
            const updatedConversation = conversation.map((message) =>
                message.id === editingId ? { ...message, message: value } : message
            );
            setConversation(updatedConversation);
            setEditingId(null);
            setYourChat('');
        } else {
            handleClick()
        }
    }
    const handleBackToFirstPageChat = ()=> {
        setPublicMessages([])
        setConversation([])
        setShowNewMessage(false)
        back(false)
    }
    const handleCloseChat = () => {
        close()
        setPublicMessages([])
        setConversation([])
        setShowNewMessage(false)
    }

    React.useEffect(() => {
        const addPublicMessage = () => {
            if (publicMessages.length < 10) {
                setPublicMessages((prevPublicMessages) => [
                    ...prevPublicMessages,
                    {
                        id : uuidv4(),
                        sender: 'public',
                        message: "Hansohee my Girlfriend BTW.",
                        createdDate: new Date()
                    }
                ]);
            }
        };
        const intervalId = setInterval(addPublicMessage, 10000);
        return () => clearInterval(intervalId);
    }, [publicMessages]);

    React.useEffect(() => {
        const lastMessage = [...conversation, ...publicMessages].sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime()).pop();
        if (lastMessage) {
            if (lastMessageDate && lastMessage.createdDate > lastMessageDate) {
                if (lastMessage.sender !== 'user') {
                    setShowNewMessage(true);
                }
            }
            setLastMessageDate(lastMessage.createdDate);
        }
    }, [conversation, publicMessages]);
    React.useEffect(() => {
        if (showNewMessage) {
            const timer = setTimeout(() => {
                setShowNewMessage(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showNewMessage]);
   



    return (
        <div className="relative h-full flex flex-col">
            <div className='sticky top-0 bg-white'>
                <div className='flex gap-4 items-start px-vertical'>
                    <Image src="/icons/back.svg" width={25} height={25} alt='back-icon' className='cursor-pointer' onClick={handleBackToFirstPageChat}/>
                    <div className='flex flex-col gap-1'>
                        <p className="font-lato font-bold text-title text-primary-blue">{detailChat?.id} - {detailChat?.email}</p>
                        <p className='font-lato font-light text-small text-primary-black'>3 Participants</p>
                    </div>
                    <button className="ml-auto flex-shrink-0 flex justify-center">
                        <Image src="/icons/close.svg" width={18} height={18} alt='close-icon' className='cursor-pointer' onClick={handleCloseChat}/>
                    </button>
                </div>
                <hr className="w-full mx-0 border-t-2 border-gray-300 mt-3" />
            </div>

            <div className='flex-grow overflow-y-auto my-vertical px-vertical'>
                {allMessages.map((msg, index) => (
                    <MessageBubble
                        onEdit={() => handleEdit(msg.id)}
                        onDelete={()=> handleDelete(msg.id)}
                        isNewMessage={showNewMessage && (index === allMessages.length - 1) && msg.sender !== 'user'}
                        key={index}
                        sender={msg.sender}
                        createdDate={msg.createdDate}
                        message={msg.message}
                        username={detailChat?.email.split('@')[0] ?? null}
                        showDate={getDateSeparator(index)}
                        index={msg.id}
                        showMenu={activeMenuId === msg.id}
                        onMenuToggle={() => handleMenuToggle(msg.id)}
                    />
                ))}
            </div>

            <div className="sticky bottom-0 w-full bg-white px-vertical py-2 flex items-center gap-2">
                <input
                    onChange={onChange}
                    value={value}
                    type="text"
                    placeholder="Type a message"
                    className="flex-grow p-2 border border-primary-black rounded-md placeholder:text-primary-black"
                />
                {/* <button className="px-4 py-2 bg-primary-blue text-white rounded-lg font-lato" onClick={submitMessage}>
                    Send
                </button> */}
                <Button handleClick={()=>submitMessage()} size='md' color='primary-blue'>Send</Button>
            </div>
        </div>
    );
}
