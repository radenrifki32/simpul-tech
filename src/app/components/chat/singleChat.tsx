import { Chats } from "@/utils/types";
import PersonIcon from "../../../icons/person";
import ButtonRound from "../button/ButtonRounded";
import { formatDateTime } from "@/utils/date";

interface ChatProps {
    chat: Chats;
}
 const formatnameFromEmail = (email: string): string => {
    const nameFromEmail = email.split('@')[0];
    return nameFromEmail.replace(/_/g, ' ');
  }
 const truncateText = (text: string, maxLength: number = 40): string =>  {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}
export default function SingleChat({ chat }: ChatProps) {
    return (
        <>
            <div className="flex  justify-between gap-6 my-vertical overflow-hidden">
            <div className="flex  gap-6">
                <div className="relative me-3"> 
                    <ButtonRound size="sm" backgroundColor="bg-primary-white">
                        <PersonIcon color="#4F4F4F"/>
                    </ButtonRound>
                    <ButtonRound size="sm" backgroundColor="bg-primary-blue absolute left-[22px]">
                        <PersonIcon color="white"/>
                    </ButtonRound>
                </div>
                <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                        <p className="font-lato font-bold text-title text-primary-blue">{chat.id} - {chat.email}</p>
                    </div>
                    <div>
                    <p className="font-lato font-bold text-name text-primary-black">{formatnameFromEmail(chat.email)} : </p>
                    <p className="font-lato font-light text-name text-primary-black">{truncateText(chat.body)}</p>
                    </div>
                </div>
            </div>
            <div className="flex-shrink-0">
                <h1 className="font-lato font-light text-name text-gray-500">{formatDateTime(new Date())}</h1>
            </div>
        </div>
        <hr className="w-full border-t border-gray-300" />

        </>
    
    );
}
