import { Header } from "./components/Header";
import { Table } from "./components/Table"; 
import Modal from 'react-modal';
import { NewTaskModal } from "./components/NewTasksModal";
import { GlobalStyle } from "./styles/global";
import { TasksProvider } from "./hooks/useTasks";
import { useState } from "react";

Modal.setAppElement('#root');

export function App() {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen ] = useState(false);

  function handleOpenNewTaskModalOpen() {
    setIsNewTaskModalOpen(true);
  }

  function handleCloseNewTaskModalOpen() {
    setIsNewTaskModalOpen(false);
  }
  return (
    <TasksProvider>
      <Header onOpenNewTaskModalOpen={handleOpenNewTaskModalOpen}/>
      <Table />

      <NewTaskModal 
        isOpen={isNewTaskModalOpen}
        onRequestClose={handleCloseNewTaskModalOpen}
      />

      <GlobalStyle />
    </TasksProvider>
  );
}
