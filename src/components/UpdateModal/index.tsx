import { FormEvent, useCallback, useEffect, useState} from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import { useTasks } from '../../hooks/useTasks';
import Calendar from '../Calendar';
import { Container } from './styles';

interface UpdateModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  taskData: any;
}

export function UpdateModal({isOpen, onRequestClose, taskData}: UpdateModalProps) {
  const {updateTask} = useTasks()

  useEffect(() => {
    setTask(taskData)
  },[taskData])

    const [task, setTask] = useState({
      id: (Number()),
      title: '',
      description: '',
      completed: 'Não',
      dateToFinish: (String(new Date()))
    })

    const handleTitleChange = useCallback(
      event => {
        const { value: newValue } = event.target;
  
        setTask({ ...task, title: newValue });
      },
      [task],
    );

    const handleDescriptionChange = useCallback(
      event => {
        const { value: newValue } = event.target;
  
        setTask({ ...task, description: newValue });
      },
      [task],
    );

    const handleDateChange = useCallback(
      (newValue: string) => {
        setTask({ ...task, dateToFinish: (String(new Date(newValue))) });
      },
      [task],
    );

    async function handleUpdateTask(event: FormEvent) {
      event.preventDefault();
  
      await updateTask(task)

      setTask({
        id: (Number()),
        title: '',
        description: '',
        completed: 'Não',
        dateToFinish: (String(new Date()))
      })

      onRequestClose()
  
    }

    return (
      <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
      <button 
        type="button" 
        onClick={onRequestClose} 
        className="react-modal-close"
        >
        <img src={closeImg} alt="Fechar Modal"/>
      </button>

        <Container onSubmit={handleUpdateTask}>
          <h2>Atualizar atividade</h2>

          <input 
            placeholder="Titulo"
            value={task.title}
            onChange={handleTitleChange}
          />

          <Calendar 
            value={task.dateToFinish}
            onChange={handleDateChange}
          />

          <input 
            placeholder="Descrição"
            value={task.description}
            onChange={handleDescriptionChange}
          />
            
          <button type="submit">Atualizar</button>
        </Container>
      </Modal>
    );
}