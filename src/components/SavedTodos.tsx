import { Box, Button, HStack, Text, Tooltip } from "@chakra-ui/react";
import type { Todo } from "./TodoList";
import { MdDeleteForever } from "react-icons/md";

export interface SavedSession {
  id: number;
  name: string;
  todos: Todo[];
  complete: Todo[];
  date: string; // must be ISO string
}

interface Props {
  savedSessions: SavedSession[];
  onClick: (session: SavedSession) => void;
  currentSessionId: number | null;
  onRemove: (session: SavedSession) => void;
}

const SavedTodos = ({
  savedSessions,
  onClick,
  currentSessionId,
  onRemove,
}: Props) => {
  return (
    <>
      {savedSessions.map((session) => {
        const formattedDateTime = session.date
          ? new Date(session.date).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })
          : "No date";

        const isActive = currentSessionId === session.id;

        return (
          <Button
            key={session.id}
            onClick={() => onClick(session)}
            my={1}
            width="100%"
            textAlign="left"
            justifyContent="start"
            flexDirection="column"
            alignItems="flex-start"
            whiteSpace="wrap"
            height="auto"
            padding={2}
            // backgroundColor={isActive ? "blue.100" : "transparent"} // Highlight
            border={isActive ? "2px solid orange" : ""}
          >
            <HStack spacing="80px">
              <Box>
                <Text fontWeight="bold">{session.name}</Text>
                <Text fontSize="xs" color="gray.500">
                  {formattedDateTime}
                </Text>
              </Box>
              <Box>
                <Tooltip
                  label="Delete"
                  hasArrow
                  justifySelf="right"
                  paddingLeft={5}
                  contentEditable
                >
                  <MdDeleteForever
                    onClick={() => onRemove(session)}
                    size="20px"
                    color="tomato"
                    cursor="pointer"
                  />
                </Tooltip>
              </Box>
            </HStack>
          </Button>
        );
      })}
    </>
  );
};

export default SavedTodos;
