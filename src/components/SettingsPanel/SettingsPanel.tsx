import styled from "@emotion/styled";
import { SearchInput } from "./SearchInput";
import { ToggleButtons } from "./ToggleButtons";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: var(--color-bg-gray-600);
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const SettingsPanel = () => {
  return (
    <Container>
      <ToggleButtons />
      <SearchInput />
    </Container>
  );
};
