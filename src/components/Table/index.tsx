import { useTasks } from "../../hooks/useTasks";
import { AiOutlineEdit } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { Container } from "./styles";
import { UpdateModal } from "../UpdateModal";
import { useState } from "react";

export function Table() {
  const { tasks, deleteTask } = useTasks();
  const [TaskId, setTaskId] = useState<any>({});

  async function handleDelete(id: number) {
    await deleteTask(id);
  }

  const [UpdateModalOpen, setUpdateModalOpen ] = useState(false);

  function handleUpdateModalOpen(id: number) {
    TaskModal(id);
    setUpdateModalOpen(true);
  }

  function handleCloseNewTaskModalOpen() {
    setUpdateModalOpen(false);
  }

  function TaskModal(id: number) {
    const result = tasks.find(task => task.id === id)

    setTaskId(result)

  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Prazo</th>
            <th>Concluida</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
        {tasks.map(tasks => (
          <tr key={tasks.id}>
            <td>{tasks.title}</td>
            <td>{tasks.description}</td>
            <td>{new Intl.DateTimeFormat('pt-Br').format(
              new Date(tasks.dateToFinish)
            )}
            </td>
            <td>{tasks.completed}</td>
            <td>
              <div>
                <button>
                  <AiOutlineEdit size={18} onClick={() => handleUpdateModalOpen(tasks.id)}/>
                </button>

                <button>
                  <BsTrash size={15} onClick={() => handleDelete(tasks.id)}/>
                </button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      <UpdateModal 
        isOpen={UpdateModalOpen}
        onRequestClose={handleCloseNewTaskModalOpen}
        taskData={TaskId}
      />
    </Container>
  );
}