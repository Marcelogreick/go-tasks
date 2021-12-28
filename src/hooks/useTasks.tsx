import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import Swal from 'sweetalert2'

interface Task {
  id: number;
  title: string;
  description: string;
  completed: string;
  dateToFinish: string;
  createdAt?: string;
}

type TaskInput = Omit<Task, 'id' | 'createdAt'>;

interface TasksProviderProps {
  children: ReactNode;
}

interface TasksContextData{
  tasks: Task[];
  createTask: (task: TaskInput) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  updateTask: (task: Task) => Promise<void>
}

const TasksContext = createContext<TasksContextData>({} as TasksContextData);

export function TasksProvider({children}: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    api.get('/tasks')
    .then(response => setTasks(response.data.tasks))
  },[tasks]);

  async function createTask(taskInput: TaskInput) {
    const response = await api.post('/tasks', {
      ...taskInput,
      createdAt: new Date(),
    });
    const { task } = response.data;

    setTasks([...tasks, task]);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Atividade cadastrada',
      showConfirmButton: false,
      timer: 2500
    });
  }

  async function updateTask(task: Task) {
    const data = task;

    await api.patch(`/tasks/${data.id}`, task )
  }

  async function deleteTask(id: number) {
    await api.delete(`/tasks/${id}`);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Atividade deletada',
      showConfirmButton: false,
      timer: 2500
    });
  }

  return (
    <TasksContext.Provider value={{tasks, createTask, deleteTask, updateTask}}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);

  return context;
}