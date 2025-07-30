import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import ShowTodo from "./ShowTodo";
import type { SavedSession } from "./SavedTodos";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  showSavedSessions: SavedSession;
  onSessionUpdate: (updated: SavedSession) => void;
  onSessionSaved: (updated: SavedSession) => void;
}

const ViewTodo = ({
  isOpen,
  onClose,
  showSavedSessions,
  onSessionSaved,
  onSessionUpdate,
}: Props) => {
  const bg = useColorModeValue("gray.50", "gray.800");

  const content = (
    <>
      <ShowTodo
        showSavedSessions={showSavedSessions}
        onSessionSaved={onSessionSaved}
        onSessionUpdate={onSessionUpdate}
      />
    </>
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent bg={bg}>
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewTodo;
