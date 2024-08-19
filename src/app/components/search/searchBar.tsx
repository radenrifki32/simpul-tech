import SearchIcon from "../../../icons/SearchIcon";

interface SearchBarProps {
    value: string;
    handleClick : (query : string)=> void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchBar({value,handleClick,onChange} : SearchBarProps) {
  return (
    <div className="w-full">
      <div className="container flex items-center justify-between mx-auto border-black border-[1px] rounded-md px-12 py-[2px]">
        <input
          type="text"
          onChange={onChange}
          value={value}
          placeholder="Search"
          className="w-full outline-none placeholder:text-primary-black"
        />
        <div onClick={()=> handleClick(value)} className="cursor-pointer">
        <SearchIcon width="15" height="15" color="000000" />
        </div>
      </div>
    </div>
  );
}
