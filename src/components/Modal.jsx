import styled from "styled-components";
import { Close } from "../icons/Close";
import { Spacer } from "./Spacer";

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 4px 4px 8px;

  > span {
    font-size: 1.3rem;
    text-transform: uppercase;
  }
`;

const Box = styled.div`
  width: 400px;
  height: 250px;
  background: white;
  box-shadow: 0 1px 73px rgb(0 0 0 / 26%);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
`;

const StyledClose = styled(Close)`
  cursor: pointer;
  transition: stroke-width 0.3s ease;
  &:hover {
    stroke-width: 2px;
  }
`;

const Contents = styled.div`
  margin: 0.6rem 0.8rem 0.8rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Modal = ({ children, title, onClose = () => {} }) => (
  <Container>
    <Box>
      <Title>
        <span>{title}</span>
        <Spacer />
        <StyledClose onClick={() => onClose()} />
      </Title>
      <Contents>{children}</Contents>
    </Box>
  </Container>
);
