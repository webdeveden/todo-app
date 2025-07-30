import { HStack, Tooltip } from "@chakra-ui/react";
import { FaRegSave } from "react-icons/fa";
import { VscNewFile } from "react-icons/vsc";

interface Props {
  onClick: () => void;
  onSave: () => void;
}

const TodoNavbar = ({ onClick, onSave }: Props) => {
  return (
    <HStack justifyContent="space-between">
      <div></div>
      <HStack gap={4}>
        <Tooltip label="New" hasArrow>
          <VscNewFile
            size="25px"
            color="orange"
            onClick={onClick}
            cursor="pointer"
          />
        </Tooltip>
        <Tooltip label="Save" hasArrow>
          <FaRegSave
            onClick={onSave}
            size="25px"
            color="orange"
            cursor="pointer"
          />
        </Tooltip>
      </HStack>
    </HStack>
  );
};

export default TodoNavbar;
