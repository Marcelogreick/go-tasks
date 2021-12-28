import { FormEvent, useState} from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import { useTasks } from '../../hooks/useTasks';
import Calendar from '../Calendar';
import { Container } from './styles';

interface NewTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTaskModal({isOpen, onRequestClose}: NewTaskModalProps) {
  const { createTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState('Não');
  const [dateToFinish, setDateToFinish] = useState(String(new Date()));

  async function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    await createTask({
      title,
      description,
      completed,
      dateToFinish
    })

    setTitle('');
    setDescription('');
    setCompleted('Não');
    setDateToFinish(String(new Date()));
    onRequestClose();
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

        <Container onSubmit={handleCreateNewTask}>
          <h2>Cadastrar atividade</h2>

          <input 
            placeholder="Titulo"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />

          <Calendar 
            value={dateToFinish}
            onChange={(newValue: string) => {
              setDateToFinish(newValue);
            }}
          />

          <input 
            placeholder="Descrição"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
            
          <button type="submit">Cadastrar</button>
        </Container>
      </Modal>
    );
}