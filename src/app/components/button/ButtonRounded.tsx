interface ButtonRoundProps {
  children: React.ReactNode;
  onClick?: () => void;
  backgroundColor?: string;
  size?: 'sm' | 'md' | 'xl'; 
}

export default function ButtonRound({
  children,
  onClick,
  backgroundColor,
  size = 'md' 
}: ButtonRoundProps) {
  const sizeClasses = {
      sm: 'w-10 h-10',
      md: 'w-14 h-14',
      xl: 'w-20 h-20' 
  };

  return (
      <button
          className={`rounded-full ${sizeClasses[size]} ${backgroundColor}`}
          onClick={onClick}
      >
          <div className="flex items-center justify-center">
              {children}
          </div>
      </button>
  );
}
