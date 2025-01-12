import { Check, Trash } from "@phosphor-icons/react";
import styles from "./Task.module.css";

export interface TaskType {
  description: string;
  isDone: boolean;
}

interface TaskProps {
  task: TaskType;
  onCheck: (task: TaskType) => void;
  onDelete: (task: TaskType) => void;
}

export function Task({ task, onCheck, onDelete }: TaskProps) {
  return (
    <div className={styles.taskContainer}>
      <div className={task.isDone ? styles.mainDone : styles.main}>
        <button onClick={() => onCheck(task)}>
          <Check />
        </button>
        <p>{task.description}</p>
      </div>
      <div className={styles.deleteIconContainer}>
        <button onClick={() => onDelete(task)} className={styles.deleteIcon}>
          <Trash />
        </button>
      </div>
    </div>
  );
}
