import { Button, FormControl, HStack, Input } from "@chakra-ui/react";
import type { FormEvent } from "react";

interface Props {
  description: string;
  setDescription: (value: string) => void;
  onSubmit: () => void;
  isEditing: boolean;
}

const TodoForm = ({
  description,
  setDescription,
  onSubmit,
  isEditing,
}: Props) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl mt={4}>
        <HStack>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a todo..."
          />
          <Button type="submit" size="sm" colorScheme="blue" ml={2}>
            {isEditing ? "Update" : "Add"}
          </Button>
        </HStack>
      </FormControl>
    </form>
  );
};

export default TodoForm;
