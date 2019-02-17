import styled from 'styled-components';

const AddProductStyles = styled.div`
  text-align: left;
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    box-shadow: ${props => props.theme.bs};
  }

  .modal-main {
    position: fixed;
    background: ${props => props.theme.offWhite};
    width: 30%;
    height: auto;
    top: 50%;
    left: 50%;
    transition: 1.1s ease-out;
    transform: translate(-50%, -50%);
  }

  .display-block {
    display: block;
  }

  .display-none {
    display: none;
  }
`;

export default AddProductStyles;
