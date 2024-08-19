import SearchIcon from "../../../icons/SearchIcon";

export default function Header () {
    return (
        <div className="w-full bg-primary-black h-10">
        <div className="container-md mx-auto flex items-center justify-start pl-6 h-full">
           <SearchIcon color="F2F2F2" height="15" width="15"/>
        </div>
    </div>
    )
}