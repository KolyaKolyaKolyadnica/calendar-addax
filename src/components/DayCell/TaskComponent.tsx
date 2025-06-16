import styled from "@emotion/styled";
import { ItemTypes, type DragItem, type Task } from "../../types/tasks";
import { useTasksStore } from "../../store/tasksStrore";
import { useRef, useState, type ChangeEvent, type MouseEvent } from "react";
import { useDrag, useDrop } from "react-dnd";

const Container = styled.div<{ isDragging: boolean }>`
  position: relative;
  gap: 1rem;
  background: var(--color-gray-200);
  padding: 0.5rem;
  margin: 0.125rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  transition: all 0.3s;

  &:hover {
    background: var(--color-gray-300);
  }
`;
const Content = styled.div`
  width: 95%;
`;
const RemoveButton = styled.button`
  position: absolute;
  right: 0;
  top: 0.5rem;
  color: red;
  padding: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: var(--color-red-400);
    border-color: var(--color-red-300);
  }
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  grid-gap: 0.25rem;
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-gap: 0.25rem;
  width: 100%;
`;
const TaskInput = styled.textarea`
  width: 100%;
  min-height: 2rem;
  resize: none;
  overflow: hidden;
  font: inherit;
  padding: 0.25rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;
const CancelButton = styled.button`
  padding: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  background-color: transparent;
  cursor: pointer;
  color: var(--color-red-100);

  &:hover {
    color: var(--color-red-200);
    background-color: var(--color-red-400);
    border-color: var(--color-red-300);
  }
`;
const SaveButton = styled.button`
  padding: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  background-color: transparent;
  cursor: pointer;
  color: white;
  background-color: rgb(0, 136, 2);
  padding: 0.25rem 0.5rem;

  &:hover {
    background-color: rgb(0, 104, 2);
    border-color: rgb(19, 128, 7);
  }
`;

type Props = {
  task: Task;
  keyDate: string;
  moveTask: (dragId: string, hoverId: string) => void;
};

export const TaskComponent = ({ task, keyDate, moveTask }: Props) => {
  const tasksStore = useTasksStore((state) => state);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [text, setText] = useState(task.title);
  const [isEdit, setIsEdit] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: {
      type: ItemTypes.TASK,
      task,
      fromDate: keyDate,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover(item: DragItem) {
      if (item.fromDate === keyDate && item.task.id !== task.id) {
        moveTask?.(item.task.id, task.id);
      }
    },
  });

  function handleRemoveTask(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    tasksStore.removeTask(keyDate, task.id);
  }

  function handleEditTask(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setIsEdit(true);
  }

  function handleChangeTask(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  function handleSaveChanges(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    tasksStore.editTask(keyDate, task.id, text);
    setIsEdit(false);
  }

  function handleCancelChanges(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setText(task.title);
    setIsEdit(false);
  }

  drag(drop(containerRef));

  return (
    <Container
      ref={containerRef}
      isDragging={isDragging}
      onClick={handleEditTask}
    >
      {isEdit ? (
        <EditContainer>
          <TaskInput ref={inputRef} value={text} onChange={handleChangeTask} />
          <ButtonsContainer>
            <CancelButton onClick={handleCancelChanges}>Cancel</CancelButton>
            <SaveButton onClick={handleSaveChanges}>Save</SaveButton>
          </ButtonsContainer>
        </EditContainer>
      ) : (
        <>
          <Content>{task.title}</Content>
          <RemoveButton onClick={handleRemoveTask}>❌</RemoveButton>
        </>
      )}
    </Container>
  );
};
