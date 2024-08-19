
export default function Loading({ title }: { title: string }) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="w-12 h-12 border-[6px] border-gray-200 border-t-primary-black border-t-[6px] border-solid rounded-full animate-spin mb-3"></div>
            <h1 className="text-gray-700">{title}</h1>
        </div>
    );
 }
