import logoImg from '../../assets/logo.png'
import { Container, Content } from './styles'

interface HeaderProps {
  onOpenNewTaskModalOpen: () => void;
}

export function Header({onOpenNewTaskModalOpen}: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money"/>
        <button type="button" onClick={onOpenNewTaskModalOpen}>
          Nova tarefa
        </button>
      </Content>
    </Container>
  );
}