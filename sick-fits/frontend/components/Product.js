import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from './styles/Title';
import ProductStyles from './styles/ProductStyles';
import PriceTag from './styles/PriceTag';
import SalesTag from './styles/SalesTag';
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';

class Product extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired
  };

  render() {
    const { product } = this.props;

    return (
      <ProductStyles>
        {product.image && <img src={product.image} alt={product.name} />}
        <Title>
          <Link
            href={{
              pathname: '/product',
              query: { id: product.id }
            }}
          >
            <a>{product.name}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(product.unitPrice)}</PriceTag>
        <SalesTag>{formatMoney(product.salesPrice)}</SalesTag>
        <p>
          {product.description}, {product.quantity}
        </p>

        <div className="buttonList">
          <Link
            href={{
              pathname: 'update',
              query: { id: product.id }
            }}
          >
            <a>Edit ✏️ </a>
          </Link>
          <button>Add To Cart </button>
          <button>Delete </button>
        </div>
      </ProductStyles>
    );
  }
}

export default Product;
