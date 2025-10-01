import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import useStore from '../context/StoreContext'

const ProductRow = ({ item }) => {
  const { product, quantity, variantIndex } = item

  const { removeLineItem, lowerCartItemQuantity, addCartItemQuantity } =
    useStore()

  return (
    <section className='product-row-container'>
      <div className='product-details'>
        <GatsbyImage
          image={
            product.media[0]?.image.localFile.childImageSharp.gatsbyImageData
          }
          className='product-row-image'
        ></GatsbyImage>
        <article className='product-row-info'>
          <p className='cart-product-title'>
            <span>{product.title}</span>
          </p>
          <p>
            <span>{`$${product.priceRangeV2.minVariantPrice.amount}`}</span>
          </p>
        </article>
      </div>
      <div className='product-right-info'>
        <article>
          <p>PRICE</p>
          <p>
            <span>{`$${product.priceRangeV2.minVariantPrice.amount}`}</span>
          </p>
        </article>
        <article className='product-row-quantity'>
          <p>QUANTITY</p>
          <div className='quantity-buttons'>
            <button
              className='quantity-btn'
              onClick={() => {
                if (quantity > 1) {
                  lowerCartItemQuantity(
                    product.variants[variantIndex]?.shopifyId,
                    variantIndex
                  )
                } else {
                  removeLineItem(
                    product.variants[variantIndex]?.shopifyId,
                    variantIndex
                  )
                }
              }}
            >
              -
            </button>
            <p>{quantity}</p>
            <button
              onClick={() =>
                addCartItemQuantity(
                  product.variants[variantIndex]?.shopifyId,
                  variantIndex
                )
              }
              className='quantity-btn'
            >
              +
            </button>
          </div>
        </article>
        <article>
          <p>TOTAL</p>
          <p>${product.priceRangeV2.minVariantPrice.amount * quantity}</p>
        </article>
      </div>
    </section>
  )
}

export default ProductRow
