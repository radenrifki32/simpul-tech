interface ModalProps {
    children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
    return (
        <div className="absolute bottom-[110px] right-10 w-[50%] h-[70vh] z-20 bg-white shadow-lg rounded-md  overflow-hidden">
           <div className="flex flex-col items-center w-full h-full">
             {children}
           </div>
        </div>
    );
}
