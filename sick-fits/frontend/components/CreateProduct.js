import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $image: String
    $largeImage: String
    $quantity: Int!
    $unitPrice: Int!
    $salesPrice: Int
  ) {
    createProduct(
      name: $name
      description: $description
      image: $image
      largeImage: $largeImage
      quantity: $quantity
      unitPrice: $unitPrice
      salesPrice: $salesPrice
    ) {
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

class CreateProduct extends Component {
  state = {
    name: 'Super',
    description: 'Oleum Super',
    image: 'ols.jpg',
    largeImage: 'OLS.jpg',
    quantity: 45,
    unitPrice: 3500,
    salesPrice: 4000
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadFile = async e => {
    console.log('uploading file ...');
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'mmwayy');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/some19ice/image/upload',
      {
        method: 'POST',
        body: data
      }
    );
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_PRODUCT_MUTATION} variables={this.state}>
        {(createProduct, { loading, error }) => (
          <Form
            onSubmit={async e => {
              // Prevent Form from submitting.
              e.preventDefault();
              // Call the mutation
              const res = await createProduct();
              // Redirect to the Product list page
              Router.push({
                pathname: '/product',
                query: { id: res.data.createProduct.id }
              });
              console.log(res);
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an Image"
                  required
                  value={this.state.image}
                  onChange={this.uploadFile}
                />
                {this.state.image && (
                  <img
                    width="200 "
                    src={this.state.image}
                    alt="Upload Preview"
                  />
                )}
              </label>

              <label htmlFor="name">
                Name
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  required
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter A Description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="quantity">
                Quantity
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder="Quantity"
                  required
                  value={this.state.quantity}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="unitPrice">
                Cost
                <input
                  type="number"
                  id="unitPrice"
                  name="unitPrice"
                  placeholder="Unit Price"
                  required
                  value={this.state.unitPrice}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="salesPrice">
                Sales Price
                <input
                  type="number"
                  id="salesPrice"
                  name="salesPrice"
                  placeholder="Sales Price"
                  value={this.state.salesPrice}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Add Product</button>
              {/* <button onClick={handleClose}>Close</button> */}
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}
export default CreateProduct;
export { CREATE_PRODUCT_MUTATION };
