import styled from "@emotion/styled";
import type { CalendarDay } from "../../types/calendar";
import { useTasksStore } from "../../store/tasksStrore";
import { useEffect, useRef, useState } from "react";
import { TaskComponent } from "./TaskComponent";
import { useDrop } from "react-dnd";
import { ItemTypes, type Task } from "../../types/tasks";

const Content = styled.div<{ isCurrentMonth: boolean; isOver: boolean }>`
  background: ${({ isCurrentMonth, isOver }) => {
    if (isOver) {
      return "var(--color-gray-400)";
    }

    return isCurrentMonth ? "white" : "";
  }};
  min-height: 5rem;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-bottom: 2rem;
  border-radius: 0.5rem;
`;
const TaskInput = styled.textarea`
  resize: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  min-height: 8rem;
`;

type DayContentProps = {
  day: CalendarDay;
};

export const DayContent = ({ day }: DayContentProps) => {
  const tasksStore = useTasksStore((state) => state);

  const keyDate = day.date.toLocaleDateString("en-CA");
  const tasks = tasksStore.getTasks();
  const currentTasks = tasks[keyDate];

  const [inputText, setInputText] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const dayRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: { task: Task; fromDate: string }) => {
      const isTaskFromAnotherDay = item.fromDate !== keyDate;

      if (isTaskFromAnotherDay) {
        tasksStore.removeTask(item.fromDate, item.task.id);
        tasksStore.addTask(keyDate, item.task);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const isInputShowing = isEdit || inputText.trim();

  function handleAddTask() {
    const trimmed = inputText.trim();

    if (!trimmed) {
      return;
    }

    tasksStore.addTask(keyDate, {
      id: Date.now().toString(),
      title: inputText,
    });
    setInputText("");
    tasksStore.setEditDay("");
  }

  function moveTask(dragId: string, hoverId: string) {
    const tasks = [...currentTasks];
    const dragIndex = tasks.findIndex((task) => task.id === dragId);
    const hoverIndex = tasks.findIndex((task) => task.id === hoverId);

    if (dragIndex < 0 || hoverIndex < 0) {
      return;
    }

    const moved = tasks.splice(dragIndex, 1);
    tasks.splice(hoverIndex, 0, ...moved);

    tasksStore.setTasksForDay(keyDate, tasks);
  }

  function toggleEditDay() {
    if (isEdit) {
      setIsEdit(false);
      return;
    }

    tasksStore.setEditDay(keyDate);
    setIsEdit(true);
  }

  useEffect(() => {
    setIsEdit(tasksStore.editDay === keyDate);
  }, [tasksStore.editDay, keyDate]);

  drop(dayRef);

  return (
    <Content
      ref={dayRef}
      isCurrentMonth={day.isCurrentMonth}
      isOver={isOver}
      onClick={toggleEditDay}
    >
      {currentTasks &&
        currentTasks.map((task) => (
          <TaskComponent
            key={task.id}
            task={task}
            keyDate={keyDate}
            moveTask={moveTask}
          />
        ))}

      {isInputShowing && (
        <TaskInput
          autoFocus
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAddTask();
            }
          }}
          placeholder="New task..."
        />
      )}
    </Content>
  );
};
