import "./global.css";
import styles from "./App.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { PlusCircle } from "@phosphor-icons/react";
import { Header } from "./components/Header";
import { Badge } from "./components/Badge";
import { Task, TaskType } from "./components/Task";
import notFoundImg from "./assets/img/task-not-found.svg";

function App() {
  const [newTask, setNewText] = useState("");
  const [tasks, setTasks] = useState<TaskType[]>([]);

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    setTasks((state) => [
      ...state,
      {
        description: newTask,
        isDone: false,
      },
    ]);
    setNewText("");
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setNewText(event.target.value);
  }

  function handleCheck(checkedTask: TaskType) {
    setTasks((state) =>
      state.map((task) => {
        if (task === checkedTask) {
          return { ...task, isDone: !checkedTask.isDone };
        }
        return task;
      })
    );
  }

  function handleDeleteTask(deletedTask: TaskType) {
    setTasks((state) => state.filter((task) => task !== deletedTask));
  }

  const isInputEmpty = newTask.length === 0;
  const totalTasks = tasks.length;
  const totalDoneTasks = tasks.filter((task) => task.isDone).length;

  return (
    <div>
      <Header />
      <main>
        <div className={styles.wrapper}>
          <form onSubmit={handleFormSubmit} className={styles.taskForm}>
            <input
              onChange={handleInputChange}
              type="text"
              name="task"
              value={newTask}
              required
            />
            <button type="submit" disabled={isInputEmpty}>
              Criar <PlusCircle size={20} />
            </button>
          </form>

          <div className={styles.tasksInfo}>
            <span className={styles.created}>
              Tarefas criadas <Badge content={totalTasks.toString()} />
            </span>
            <span className={styles.done}>
              Concluídas
              <Badge content={`${totalDoneTasks} de ${totalTasks}`} />
            </span>
          </div>

          <div className={styles.tasksContainer}>
            {tasks.length > 0 ? (
              tasks.map((task) => {
                return (
                  <Task
                    key={task.description}
                    task={task}
                    onCheck={handleCheck}
                    onDelete={handleDeleteTask}
                  />
                );
              })
            ) : (
              <div className={styles.noTasksFound}>
                <img src={notFoundImg} />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;