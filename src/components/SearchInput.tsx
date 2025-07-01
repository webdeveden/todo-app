import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const searchValue = searchRef.current?.value.trim();
        if (searchValue !== undefined) {
          onSearch(searchValue);
        }
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={searchRef}
          borderRadius={10}
          placeholder="Search todo..."
          variant="filled"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
