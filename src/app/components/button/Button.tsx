interface ButtonProps {
     children: React.ReactNode;
     handleClick : ()=> void;
     disabled? : boolean;
     loading?: boolean;
     size : 'sm' | 'md' | 'lg';
     color? : 'primary-blue' | 'primary-white' | 'primary-black';
    }
export default function Button ({children,handleClick,disabled = false,loading = false, size = 'md', color} : ButtonProps) { 
    return (
        <div>
            <button className="bg-primary-blue text-white px-4 py-2 rounded-md font-lato" onClick={handleClick}>{children}</button>
        </div>
    )
}