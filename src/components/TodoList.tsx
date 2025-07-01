import { List, ListItem, ListIcon, HStack, Tooltip } from "@chakra-ui/react";
import { FaRegCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
// import { MdOutlineDoneOutline } from "react-icons/md";

export interface Todo {
  id: number;
  description: string;
}

interface TodoListProps {
  todos: Todo[];
  ondelete: (id: number) => void;
  onUpdate: (id: number) => void;
  onComplete?: (id: number) => void;
}

const TodoList = ({ todos, ondelete, onUpdate }: TodoListProps) => {
  // if (todos.length === 0) {
  //   return <p>There is nothing to do. Take a break...</p>;
  // }

  return (
    <List spacing={3} mt={10} paddingLeft={0}>
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          textAlign="left"
          display="flex"
          justifyContent="space-between"
        >
          <div>
            <ListIcon as={FaRegCircle} color="yellow.500" />
            {todo.description}
          </div>

          <HStack>
            {/* <Tooltip label="Completed" hasArrow placement="left">
              <MdOutlineDoneOutline
                onClick={() => onComplete(todo.id)}
                size="18px"
                color="green"
                cursor="pointer"
              />
            </Tooltip> */}
            <Tooltip label="edit" hasArrow placement="left">
              <FaEdit
                onClick={() => onUpdate(todo.id)}
                size="18px"
                color="dodgerblue"
                cursor="pointer"
              />
            </Tooltip>
            <Tooltip label="Delete" hasArrow placement="left">
              <MdDeleteForever
                size="20px"
                onClick={() => ondelete(todo.id)}
                color="red"
                cursor="pointer"
              />
            </Tooltip>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
