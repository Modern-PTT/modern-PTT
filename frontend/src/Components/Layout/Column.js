import styled from 'styled-components';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${props=>props.justify};
  align-items: ${props=>props.align};
`;

export default Column;