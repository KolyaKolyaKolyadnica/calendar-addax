import styled from "@emotion/styled";
import { useCalendarStore } from "../../store/calendarStore";
import { ChevronIcon } from "../Icons/Chevron";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled.button<{ borderRadius: "up" | "down" }>`
  padding: 0.125rem 1rem;
  width: 10rem;
  height: 1rem;
  background: gray;
  border-radius: ${({ borderRadius }) => {
    return borderRadius === "up" ? "0.5rem 0.5rem 0 0" : "0 0 0.5rem 0.5rem";
  }};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border: unset;
    background: #ccc;
  }
`;
const DateText = styled.span`
  font-size: 1.4rem;
  color: #eee;
  font-weight: 700;
`;

export const ToggleButtons = () => {
  const calendarStore = useCalendarStore((state) => state);

  const day = calendarStore.currentDate.getDate();
  const month = calendarStore.currentDate.getMonth();
  const year = calendarStore.currentDate.getFullYear();
  const monthName = calendarStore.currentDate.toLocaleString("en-US", {
    month: "long",
  });

  function setPrevMonth() {
    const prevDate = new Date(year, month - 1, day);
    calendarStore.setDate(prevDate);
  }

  function setNextMonth() {
    const nextDate = new Date(year, month + 1, day);
    calendarStore.setDate(nextDate);
  }

  function setPrevYear() {
    const prevDate = new Date(year - 1, month, day);
    calendarStore.setDate(prevDate);
  }

  function setNextYear() {
    const nextDate = new Date(year + 1, month, day);
    calendarStore.setDate(nextDate);
  }

  return (
    <Container>
      <ButtonContainer>
        <Button borderRadius="up" onClick={setNextMonth}>
          <ChevronIcon direction="up" />
        </Button>
        <DateText>{monthName}</DateText>
        <Button borderRadius="down" onClick={setPrevMonth}>
          <ChevronIcon direction="down" />
        </Button>
      </ButtonContainer>

      <ButtonContainer>
        <Button borderRadius="up" onClick={setNextYear}>
          <ChevronIcon direction="up" />
        </Button>
        <DateText>{year}</DateText>
        <Button borderRadius="down" onClick={setPrevYear}>
          <ChevronIcon direction="down" />
        </Button>
      </ButtonContainer>
    </Container>
  );
};
