import styled from 'styled-components';

const SalesTag = styled.span`
  background: ${props => props.theme.black};
  transform: rotate(-3deg);
  color: white;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  line-height: 1;
  font-size: 1rem;
  display: inline-block;
  position: absolute;
  top: -3px;
  left: -3px;
`;

export default SalesTag;
