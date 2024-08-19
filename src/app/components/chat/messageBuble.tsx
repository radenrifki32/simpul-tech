import { fomatDateHours } from '@/utils/date';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
    sender: 'user' | 'ai' | 'public';
    message: string;
    username: string | null;
    createdDate: Date;
    isNewMessage: boolean;
    showDate: boolean;
    onEdit: (id : string) => void;
    onDelete: (id : string) => void;
    index : string
    showMenu: boolean; 
    onMenuToggle: () => void; 
}

export function MessageBubble({
    sender, message, username, createdDate, isNewMessage, showDate,index,showMenu,onMenuToggle,onEdit,onDelete
}: MessageBubbleProps) {
    let bubbleClass = '';
    let textColorClass = '';
    let backgroundColorClass = '';
    const displayUsername = sender === 'public' ? 'Hansohe' : (sender === 'user' ? 'You' : username);

    switch (sender) {
        case 'user':
            bubbleClass = 'text-right';
            backgroundColorClass = 'bg-chats-purple-light';
            textColorClass = 'text-primary-black';
            break;
        case 'ai':
            bubbleClass = 'text-left';
            backgroundColorClass = 'bg-chats-orange-light';
            textColorClass = 'text-primary-black';
            break;
        case 'public':
            bubbleClass = 'text-left';
            backgroundColorClass = 'bg-chats-green-light'; 
            textColorClass = 'text-primary-black';
            break;
    }

    const formatDate = (date: Date): string => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        
        return `Today ${month} ${day}, ${year}`;
    };
    return (
        <div className={`mb-2 ${bubbleClass}`}>
            {showDate && (
                <div className="flex items-center my-4">
                    <hr className="flex-grow border-t border-gray-300" />
                    <p className="px-4 font-lato font-medium text-primary-black">{formatDate(createdDate)}</p>
                    <hr className="flex-grow border-t border-gray-300" />
                </div>
            )}
            {isNewMessage && (
                <div className="flex items-center justify-center my-4">
                    <p className="px-4 font-lato font-medium text-primary-blue bg-[#E9F3FF] py-2 rounded-md">New Message</p>
                </div>
            )}
            <p className={`font-lato font-bold text-name ${sender === 'user' ? 'text-chats-purple-primary' : sender === 'ai' ? 'text-chats-orange-primary' : 'text-chats-green-primary'} mb-1`}>
                {displayUsername}
            </p>
            <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} items-start relative`}>
                {sender === 'user' && (
                    <div onClick={onMenuToggle} className="mr-4 cursor-pointer">
                        <span className="material-icons">...</span>
                    </div>
                )}
                <div className={`p-2 max-w-md rounded-lg ${backgroundColorClass} ${textColorClass}`}>
                    <ReactMarkdown className='font-lato font-light text-small text-left'>{message}</ReactMarkdown>
                    <p className='font-lato font-light text-small pt-1 text-left'>{fomatDateHours(createdDate)}</p>
                </div>
                {sender !== 'user' && <div className="ml-4">...</div>}
                {sender === 'user' && showMenu && (
                    <div className="absolute right-20 mt-2 bg-white border border-gray-300 shadow-md rounded-md w-1/6">
                        <button onClick={()=> onEdit(index)} className=" font-lato text-name block px-4 py-2 text-primary-blue hover:bg-gray-100 w-full text-left">Edit</button>
                        <hr className='w-full'/>
                        <button onClick={()=> onDelete(index)} className="block px-4 font-lato text-name py-2 text-indicators-red hover:bg-gray-100 w-full text-left">Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
}
