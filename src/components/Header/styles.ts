import styled from 'styled-components';

export const Container = styled.header`
  background: var(--black);
`
export const Content = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto; // deixar sempre centralizado
  padding: 2rem 1rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;


  img {
    height: 6rem;
    width: 12rem;
  }

  button {
    font-size: 1rem;
    color: #FFF;
    background: var(--orange-light);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;
    transition: filter 0.2s;
    &:hover {
      filter: brightness(0.9);
    }
  }
`