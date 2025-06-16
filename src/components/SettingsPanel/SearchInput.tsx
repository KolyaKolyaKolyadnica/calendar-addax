import styled from "@emotion/styled";
import { useTasksStore } from "../../store/tasksStrore";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/dubounce";

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  height: 3.5rem;
  gap: 0.5rem;
`;
const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
`;
const Button = styled.button<{ isVisible: boolean }>`
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  background: none;
  padding: 1rem;

  &:hover {
    background: var(--color-red-400);
  }
`;

export const SearchInput = () => {
  const tasksStore = useTasksStore((state) => state);
  const [inputValue, setInputValue] = useState(tasksStore.searchBy);

  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    if (tasksStore.searchBy !== debouncedValue) {
      tasksStore.setSearchBy(debouncedValue);
    }
  }, [debouncedValue, tasksStore]);

  return (
    <Container>
      <Input
        placeholder="Filter tasks..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button isVisible={!!inputValue} onClick={() => setInputValue("")}>
        ❌
      </Button>
    </Container>
  );
};
