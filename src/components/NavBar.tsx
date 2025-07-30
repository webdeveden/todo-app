import { HStack, Image, useBreakpointValue } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import logo from "../assets/logo.webp";
import { FiMenu } from "react-icons/fi";

interface Props {
  onMenuClick?: () => void;
}

const NavBar = ({ onMenuClick }: Props) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  if (isMobile) {
    return (
      <HStack justifyContent="space-between">
        <FiMenu size="40px" onClick={onMenuClick} cursor="pointer" />
        {/* <Image src={logo} boxSize="60px" /> */}

        <ColorModeSwitch />
      </HStack>
    );
  }
  return (
    <HStack justifyContent="space-between" paddingY={5}>
      <Image src={logo} boxSize="60px" />

      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
