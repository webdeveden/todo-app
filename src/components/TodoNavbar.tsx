import { HStack, Tooltip } from "@chakra-ui/react";
import { VscNewFile } from "react-icons/vsc";

interface Props {
  onClick: () => void;
}

const TodoNavbar = ({ onClick }: Props) => {
  return (
    <HStack justifyContent="space-between">
      <div></div>
      <Tooltip label="New" hasArrow placement="left">
        <VscNewFile
          size="25px"
          color="orange"
          onClick={onClick}
          cursor="pointer"
        />
      </Tooltip>
    </HStack>
  );
};

export default TodoNavbar;
