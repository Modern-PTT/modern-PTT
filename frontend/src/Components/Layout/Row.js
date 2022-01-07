import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props=>props.justify};
  align-items: ${props=>props.align};
`;
 
export default Row;