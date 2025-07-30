import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import SavedTodos from "./SavedTodos";
import SearchInput from "./SearchInput";
import type { SavedSession } from "./SavedTodos";

interface ShowMenuProps {
  isOpen: boolean;
  onClose: () => void;
  savedSessions: SavedSession[];
  currentSessionId: number | null;
  onClick: (session: SavedSession) => void;
  onRemove: (session: SavedSession) => void;
  onSearch: (searchText: string) => void;
}

const ShowMenu = ({
  isOpen,
  onClose,
  savedSessions,
  currentSessionId,
  onRemove,
  onSearch,
  onClick,
}: ShowMenuProps) => {
  // const isMobile = useBreakpointValue({ base: true, md: false });
  const bg = useColorModeValue("gray.50", "gray.800");

  const content = (
    <>
      <SearchInput onSearch={onSearch} />
      <SavedTodos
        savedSessions={savedSessions}
        currentSessionId={currentSessionId}
        onClick={(session) => {
          onClick(session);
          onClose();
        }}
        onRemove={onRemove}
      />
    </>
  );

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg={bg}>
        <DrawerHeader>My todos</DrawerHeader>
        <DrawerBody>{content}</DrawerBody>
        <DrawerFooter>
          <Button onClick={onClose} size="sm">
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ShowMenu;
