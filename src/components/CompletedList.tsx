import {
  Button,
  HStack,
  List,
  ListIcon,
  ListItem,
  Tooltip,
} from "@chakra-ui/react";
import type { Todo } from "./TodoList";
import { FaRegCircleCheck } from "react-icons/fa6";
import { BsChevronDown } from "react-icons/bs";
import { GrUndo } from "react-icons/gr";

interface Props {
  completedList: Todo[];
  onSelect: () => void;
  onUndo: (id: number) => void;
}

const CompletedList = ({ completedList, onSelect, onUndo }: Props) => {
  return (
    <>
      <Button
        rightIcon={<BsChevronDown />}
        onClick={onSelect}
        justifyContent="flex-start"
        padding={1}
        margin={5}
      >
        Completed
      </Button>

      <List paddingLeft={0}>
        {completedList.map((list) => (
          <>
            <ListItem
              key={list.id}
              display="flex"
              justifyContent="space-between"
            >
              <HStack justifyContent="space-between" w="100%">
                <div>
                  <ListIcon as={FaRegCircleCheck} color="green.500" />
                  {list.description}
                </div>
                <Tooltip label="Undo" hasArrow placement="right">
                  <span>
                    <GrUndo
                      color="orange"
                      size="25px"
                      onClick={() => onUndo(list.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </span>
                </Tooltip>
              </HStack>
            </ListItem>
          </>
        ))}
      </List>
    </>
  );
};

export default CompletedList;
