import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      description
      quantity
      unitPrice
      salesPrice
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
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

class UpdateProduct extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    return (
      <Query
        query={SINGLE_PRODUCT_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          return (
            <Mutation mutation={UPDATE_PRODUCT_MUTATION} variables={this.state}>
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
                    <label htmlFor="name">
                      Name
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        required
                        defaultValue={data.product.name}
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
                        defaultValue={data.product.description}
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
                        defaultValue={data.product.quantity}
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
                        defaultValue={data.product.unitPrice}
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
                        defaultValue={data.product.salesPrice}
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">Update</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
export default UpdateProduct;
export { UPDATE_PRODUCT_MUTATION };
