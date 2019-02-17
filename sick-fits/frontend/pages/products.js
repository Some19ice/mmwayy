import React, { Component, useState, useEffect } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from '../components/Product';
import Modal from '../components/Modal';
import CreateProduct from '../components/CreateProduct';
import Form from '../components/styles/Form';
import AddProductStyles from '../components/styles/AddProductStyles';
import ModalStyels from '../components/styles/ModalStyles';
import Add from '../pages/add';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    products {
      id
      name
      description
      image
      largeImage
      quantity
      unitPrice
      salesPrice
    }
  }
`;

const Centre = styled.div`
  text-align: center;
`;

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 50px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  @media (max-width: 700px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 50px;
  }

  @media (max-width: 400px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 50px;
  }
`;

// Add Product Button
const AddButton = styled.button`
  position: fixed;
  color: ${props => props.theme.offWhite};
  font-size: 2em;
  background: ${props => props.theme.red};
  border: 0;
  padding: 0 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  bottom: 10px;
  right: 10px;
  box-shadow: ${props => props.theme.bs};
`;

const AddProd = styled.div`
  .main {
    width: 500px;
    background: white;
    border: 1px solid #ccc;
    transition: 1.1s ease-out;
    box-shadow: -2rem 2rem 2rem rgba(0, 0, 0, 0.2);
    -webkit-filter: blur(0);
    filter: blur(0);
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
    visibility: visible;
  }

  .main.off {
    opacity: 0;
    visibility: hidden;
    -webkit-filter: blur(8px);
    filter: blur(8px);
    -webkit-transform: scale(0.33);
    transform: scale(0.33);
    box-shadow: 1rem 0 0 rgba(0, 0, 0, 0.2);
  }

  .main h2 {
    border-bottom: 1px solid #ccc;
    padding: 1rem;
    margin: 0;
  }

  .main .content {
    padding: 1rem;
  }

  .main .actions {
    border-top: 1px solid #ccc;
    background: #ccc;
    padding: 0.5rem 1rem;
  }

  .main .actions button {
    border: 0;
    background: #78f89f;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    line-height: 1;
  }

  #centered-toggle-button {
    position: absolute;
  }
`;

class Products extends Component {
  state = {
    show: false
  };

  showModal = e => {
    this.setState({ show: !this.state.show });
  };

  render() {
    return (
      <Centre>
        <Query query={ALL_PRODUCTS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ProductsList>
                {data.products.map(product => (
                  <Product product={product} key={product.id} />
                ))}
              </ProductsList>
            );
          }}
        </Query>

        <AddButton type="button" onClick={this.showModal}>
          +
        </AddButton>

        <Modal onClose={this.showModal} show={this.state.show}>
          <Add>
            <AddProd>
              <div className="main">
                <h2>Add Product</h2>
                <div className="content">
                  <CreateProduct />
                </div>
                <div className="actions">
                  <button class="toggle-button">x</button>
                </div>
              </div>
            </AddProd>
          </Add>
        </Modal>
      </Centre>
    );
  }
}

export default Products;
export { ALL_PRODUCTS_QUERY };
