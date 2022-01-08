import styled from 'styled-components';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${props=>props.justify};
  align-items: ${props=>props.align};
`;
//center flex-start flex-end space-between space-around
export default Column;