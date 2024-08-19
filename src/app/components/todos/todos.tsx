import * as React from "react";
import Image from "next/image";
import Button from "../button/Button";
import SingleTodo from "./singleTodo";
import { FavoriteTodo, Todo } from "@/utils/types";
import AddTodo from "./AddTodo";
import Loading from "../Loading/loading";

interface TodosProps {
  todo: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
  loading: boolean;
}

export default function Todos({ todo, setTodo, loading }: TodosProps) {
  const [showDropDown, setShowDropDown] = React.useState<boolean>(false);
  const [todoCopied, setTodoCopied] = React.useState<Todo[]>(todo);
  const [filteredTodo, setFilteredTodo] = React.useState(todo);
  const [addTodo, setAddTodo] = React.useState<boolean>(false);
  const [formTodo, setFormTodo] = React.useState<Todo>({
    title: "",
    completed: false,
    description: "",
    createdDate: null,
  });
  const addTodoRef = React.useRef<HTMLDivElement>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { checked } = event.target;
    if (checked) {
      const checkedIsDone = filteredTodo.map((item) => {
        if (item.id === id) {
          item.completed = true;
        }
        return item;
      });
      setTodo(checkedIsDone);
    } else {
      const checkedIsDone = filteredTodo.map((item) => {
        if (item.id === id) {
          item.completed = false;
        }
        return item;
      });
      setTodo(checkedIsDone);
    }
  };
  const handleAddTodo = () => {
    if (addTodo) {
      newTask();
    }
    setAddTodo(!addTodo);
  };
  const handleClick = () => {
    setShowDropDown(!showDropDown);
  };
  const handleChangeFormTodo = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;

    const { name, type, value } = target;
    let convertedValue: any;

    if (type === "checkbox") {
      convertedValue = (target as HTMLInputElement).checked;
    } else if (name === "createdDate") {
      convertedValue = new Date(value);
    } else {
      convertedValue = value;
    }

    setFormTodo({
      ...formTodo,
      [name]: convertedValue,
    });
  };
  const handleClickUrgentTodo = () => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const urgentTodo = [...todo]
      .filter((item) => {
        const createdDate = item.createdDate
          ? new Date(item.createdDate)
          : null;
        return createdDate && createdDate > thirtyDaysAgo && createdDate <= now;
      })
      .sort((a, b) => {
        const dateA = a.createdDate ? new Date(a.createdDate) : new Date(0);
        const dateB = b.createdDate ? new Date(b.createdDate) : new Date(0);
        return dateA.getTime() - dateB.getTime();
      });

    setFilteredTodo(urgentTodo);
  };
  const showAllAgain = () => {
    setFilteredTodo(todoCopied);
  };
  const handleAddFavorite = (favorite : FavoriteTodo,id : number) => {
    const updatedTodos = filteredTodo.map((item) => {
      if (item.id === id) {
        const isAlreadyFavorite = item.favorite && item.favorite.some(
          (fav) => fav.id === favorite.id
        );
    
        if (!isAlreadyFavorite) {
          item.favorite = item.favorite ? [...item.favorite, favorite] : [favorite];
        }
      }
      return item;
    });
    setTodo(updatedTodos);
  };
  

  const handleNotCompleted = () => {
    const notCompleted = todo.filter((item) => !item.completed);
    setFilteredTodo(notCompleted);
  };
  const handleEditTodoList = (id: number, value: string) => {
    console.log('ok')
    const editTodo = filteredTodo.filter((item) => {
      if (item.id === id) {
        console.log(item.description)
        item.description = value;
      }
      return item;
    });
    setTodo(editTodo);
  };
  const handleDeleteTodoList = (id: number) => {
    const deleteTodo = filteredTodo.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });
    setTodo(deleteTodo);
  };
  React.useEffect(() => {
    setTodoCopied(todo);
    setFilteredTodo(todo);
  }, [todo]);
  React.useEffect(() => {
    if (addTodo && addTodoRef.current) {
      addTodoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [addTodo]);

  const newTask = () => {
    console.log(formTodo)
    const newTask = [...todo];
    newTask.push({
      id: todo.length + 2,
      userId: todo.length + 200,
      title: formTodo.title,
      description: formTodo.description,
      completed: formTodo.completed,
      createdDate: formTodo.createdDate,
    });
    console.log(newTask);
    setTodo(newTask);
    setFormTodo({
      title: "",
      completed: false,
      description: "",
      createdDate: null,
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div
          className="flex gap-2 items-center border-primary-gray border-[1px] px-4 py-2 rounded-md ms-12 cursor-pointer relative"
          onClick={handleClick}
        >
          <p className="font-lato text-name text-primary-black">My Task</p>
          <Image src="/icons/arrow.svg" alt="arrow" width={20} height={20} />
          {showDropDown && (
            <div className="absolute top-12 w-[280px] -left-[70px] z-10 bg-white border-[1px] border-primary-gray rounded-md">
              <p
                className="font-lato text-name font-bold text-primary-black px-3 py-3 w-full hover:bg-primary-white"
                onClick={showAllAgain}
              >
                All
              </p>
              <hr className="border-primary-gray" />
              <p
                className="font-lato text-name font-bold text-primary-black px-3 py-3 w-full hover:bg-primary-white"
                onClick={handleNotCompleted}
              >
                Personal Errands
              </p>
              <hr className="border-primary-gray" />
              <p
                className="font-lato text-name font-bold text-primary-black px-3 py-3 w-full hover:bg-primary-white"
                onClick={handleClickUrgentTodo}
              >
                Urgent To-Do
              </p>
            </div>
          )}
        </div>
        <div>
          <Button
            size="sm"
            color="primary-blue"
            handleClick={() => {
              handleAddTodo();
            }}
          >
            {addTodo ? "Add Task" : "New Task"}
          </Button>
        </div>
      </div>

      <div className="h-full overflow-y-scroll flex-1 pb-4">
        {loading ? (
          <div className="flex w-full mt-4 h-full items-center justify-center">
            <Loading title="Loading Todo List" />
          </div>
        ) : (
          filteredTodo.map((item) => (
            <SingleTodo
              key={item.id}
              todo={item}
              handleChange={handleChange}
              handleEditTodoList={handleEditTodoList}
              handleDeleteTodoList={handleDeleteTodoList}
              handleAddFavorite={handleAddFavorite}
            />
          ))
        )}

        <div>
          {addTodo && (
            <div id="todo-add" ref={addTodoRef}>
              <AddTodo
                handleChangeFormTodo={handleChangeFormTodo}
                formTodo={formTodo}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
