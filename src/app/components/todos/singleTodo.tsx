import * as React from "react";
import { formatDateTime, getDaysLeft } from "@/utils/date";
import { Todo } from "@/utils/types";
import Image from "next/image";
import Clock from "@/icons/Clock";
import PencilIcon from "@/icons/pencil";

interface SingleTodoProps {
  todo: Todo;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
  handleEditTodoList: (id: number, value: string) => void;
  handleDeleteTodoList: (id: number) => void;
}

export default function SingleTodo({
  todo,
  handleChange,
  handleEditTodoList,
  handleDeleteTodoList,
}: SingleTodoProps) {
  const [changeToInput, setChangeToInput] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>(todo.title);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [expandedTodoId, setExpandedTodoId] = React.useState<number | null>(
    null
  );

  const handleShowTodo = (id: number) => {
    setExpandedTodoId(expandedTodoId === id ? null : id);
  };

  const handleEdit = () => {
    setChangeToInput(!changeToInput);
  };

  const openModalDelete = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  const { days, status } = getDaysLeft(todo.createdDate ? new Date(todo.createdDate) : new Date());

  return (
    <>
      <div className="py-vertical">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3 flex-1">
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(event) => handleChange(event, todo.id || 0)}
              />
              <span className="custom-checkbox me-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2H16V16ZM13.58 4.58L14.99 6L6.99 14L2.99 10.01L4.41 8.6L6.99 11.17L13.58 4.58Z"
                    fill="#828282"
                  />
                </svg>
              </span>
            </label>
            <div>
              <p
                className={`${
                  todo.completed
                    ? "line-through text-primary-gray"
                    : "no-underline text-primary-black"
                } font-lato font-bold text-name text-wrap`}
              >
                {todo.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 relative">
            {days === 0 ? (
              <p className="font-lato font-light text-chats-green-primary text-name">
                Today
              </p>
            ) : status === "Day Left" ? (
              <p className="font-lato font-light text-indicators-red text-name">
                {days} Days Left
              </p>
            ) : (
              <p className="font-lato font-light text-primary-blue text-name">
                {days} Days Reminder
              </p>
            )}

            <p className="font-lato font-light text-primary-black text-name">
              {formatDateTime(new Date(todo.createdDate || ""), false)}
            </p>
            <Image
              src="/icons/arrow.svg"
              alt="arrow"
              width={20}
              height={20}
              className={`${
                expandedTodoId === todo.id ? "rotate-180" : ""
              } cursor-pointer transition-transform`}
              onClick={() => handleShowTodo(todo?.id || 0)}
            />
            <p
              className="font-lato font-light text-primary-black text-name mb-2 cursor-pointer"
              onClick={openModalDelete}
            >
              ....
            </p>
            {showDeleteModal && (
              <div className="z-10 bg-white border-[1px] border-primary-gray rounded-md absolute right-0 -bottom-[40px]">
                <p
                  className="font-lato text-name font-light text-indicators-red py-2 px-3 text-left w-[120px] cursor-pointer"
                  onClick={() => handleDeleteTodoList(todo?.id || 0)}
                >
                  Delete
                </p>
              </div>
            )}
          </div>
        </div>

        <div
          className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
            expandedTodoId === todo.id ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="flex items-center gap-6 mx-vertical mt-4">
            <Clock/>
            <div className="relative flex items-center w-2/5">
              <input
                value={todo.createdDate ? new Date(todo.createdDate).toISOString().split("T")[0] : ""}
                type="date"
                className="border-[1px] border-primary-gray px-1 py-1 rounded-md w-full text-primary-black"
              />
            </div>
          </div>
          <div className="flex items-start gap-6 mx-vertical mt-4 w-full">
            <PencilIcon handleClick={()=> handleEdit()}/>
            <div className="w-full">
              {changeToInput ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={() => handleEditTodoList(todo.id || 0, value)}
                  className="border-[1px] border-primary-gray px-2 py-2 rounded-md font-lato text-small text-primary-black"
                  size={value.length > 0 ? value.length : 1}
                />
              ) : (
                <p className="font-lato text-small text-primary-black">
                  {todo.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full border-t border-primary-black" />
    </>
  );
}
