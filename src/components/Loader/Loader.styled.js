import styled from 'styled-components';

export const Wrapper = styled.div`
  z-index: 1500; //чтобы перекрыть хедер с з-индексом 999

  display: flex;
  position: fixed;

  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.6);
`;
