import styled from "styled-components";

const Round = styled.div`
  border-radius: 50%;
  width: 25px;
  height: 25px;
`;

const Blank = styled(Round)`
  background: gray;
  position: relative;
`;

const Badge = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.5);
  bottom: -2px;
  right: -2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export const Avatar = () => {
  return (
    <Blank>
      <Badge>?</Badge>
    </Blank>
  );
};
