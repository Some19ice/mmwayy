import React, { Component } from 'react';
import ModalStyles from './styles/ModalStyles';
import AddProductStyles from './styles/AddProductStyles';
import CreateProduct from './CreateProduct';

class Modal extends Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <AddProductStyles>
        <div className="modal">
          <div className="modal-main">{this.props.children}</div>
        </div>
      </AddProductStyles>
    );
  }
}

export default Modal;
