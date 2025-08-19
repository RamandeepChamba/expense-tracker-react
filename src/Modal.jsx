import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

function Modal({ children }) {
  return <StyledModal>{children}</StyledModal>;
}

export default Modal;
