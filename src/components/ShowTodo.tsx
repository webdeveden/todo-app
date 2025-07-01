import {
  List,
  ListItem,
  ListIcon,
  HStack,
  Tooltip,
  Text,
  Box,
  Heading,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { FaRegSave } from "react-icons/fa";
import { FaRegCircle, FaCheckCircle, FaEdit } from "react-icons/fa";
import { MdDeleteForever, MdOutlineDoneOutline } from "react-icons/md";
import { BiUndo } from "react-icons/bi";
import type { SavedSession } from "./SavedTodos";

interface Props {
  showSavedSessions: SavedSession;
  onSessionUpdate: (updated: SavedSession) => void;
  onSessionSaved: (updated: SavedSession) => void;
}

const ShowTodo = ({
  showSavedSessions,
  onSessionUpdate,
  onSessionSaved,
}: Props) => {
  const { todos, complete, date, name } = showSavedSessions;

  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    const updatedComplete = complete.filter((t) => t.id !== id);
    onSessionUpdate({
      ...showSavedSessions,
      todos: updatedTodos,
      complete: updatedComplete,
    });
  };

  const handleComplete = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updatedTodos = todos.filter((t) => t.id !== id);
    const updatedComplete = [...complete, todo];
    onSessionUpdate({
      ...showSavedSessions,
      todos: updatedTodos,
      complete: updatedComplete,
    });
  };

  const handleSave = () => {
    onSessionSaved({ ...showSavedSessions });
  };

  const handleUndo = (id: number) => {
    const task = complete.find((t) => t.id === id);
    if (!task) return;

    const updatedComplete = complete.filter((t) => t.id !== id);
    const updatedTodos = [...todos, task];
    onSessionUpdate({
      ...showSavedSessions,
      todos: updatedTodos,
      complete: updatedComplete,
    });
  };

  const handleEdit = (id: number) => {
    const task = todos.find((t) => t.id === id);
    if (!task) return;

    const newDesc = prompt("Edit Todo:", task.description);
    if (newDesc === null || newDesc.trim() === "") return;

    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, description: newDesc } : t
    );
    onSessionUpdate({
      ...showSavedSessions,
      todos: updatedTodos,
      name: updatedTodos[0]?.description || "Untitled",
    });
  };

  return (
    <>
      <HStack justifyContent="space-between">
        <HStack spacing={5} mb={2}>
          <Heading size="md">TODO</Heading>
          <Badge colorScheme="green" fontSize="14px" px={2} borderRadius={4}>
            {todos.length}
          </Badge>
        </HStack>
        <Box>
          <Tooltip label="Save" hasArrow>
            <FaRegSave
              onClick={() => handleSave()}
              size="25px"
              color="orange"
              cursor="pointer"
            />
          </Tooltip>
        </Box>
      </HStack>

      {todos.length === 0 && complete.length === 0 ? (
        <Text mt={5}>There is nothing to do. Take a break...</Text>
      ) : (
        <HStack mt={3}>
          <Heading size="sm">{name}</Heading>
        </HStack>
      )}

      <Box maxHeight="600px" overflowY="auto" mt={5}>
        <List spacing={3} paddingLeft={0}>
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
                <Tooltip label="Complete" hasArrow>
                  <MdOutlineDoneOutline
                    onClick={() => handleComplete(todo.id)}
                    size="18px"
                    color="green"
                    cursor="pointer"
                  />
                </Tooltip>
                <Tooltip label="Edit" hasArrow>
                  <FaEdit
                    onClick={() => handleEdit(todo.id)}
                    size="18px"
                    color="dodgerblue"
                    cursor="pointer"
                  />
                </Tooltip>
                <Tooltip label="Delete" hasArrow>
                  <MdDeleteForever
                    onClick={() => handleDelete(todo.id)}
                    size="20px"
                    color="red"
                    cursor="pointer"
                  />
                </Tooltip>
              </HStack>
            </ListItem>
          ))}

          {todos.length > 0 && complete.length > 0 && <Divider my={2} />}

          {complete.map((todo) => (
            <ListItem
              key={todo.id}
              textAlign="left"
              display="flex"
              justifyContent="space-between"
            >
              <div>
                <ListIcon as={FaCheckCircle} color="green.500" />
                <Text as="span" color="gray.500" textDecoration="line-through">
                  {todo.description}
                </Text>
              </div>
              <Tooltip label="Undo" hasArrow>
                <BiUndo
                  onClick={() => handleUndo(todo.id)}
                  size="20px"
                  color="orange"
                  cursor="pointer"
                />
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>
      <Text fontSize="sm" color="gray.500" marginTop={5} textAlign="center">
        Created on{" "}
        {new Date(date).toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "2-digit",
          year: "numeric",
        })}
      </Text>
    </>
  );
};

export default ShowTodo;
