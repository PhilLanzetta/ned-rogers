import React, { useRef } from 'react'
import { graphql } from 'gatsby'
import ConditionalLayout from '../components/ConditionalLayout'
import Slider from 'react-slick'
import { GatsbyImage } from 'gatsby-plugin-image'
import useStore from '../context/StoreContext'

const Shop = ({ data }) => {
  const products = data.allShopifyProduct.nodes
  const { addVariantToCart } = useStore()
  const sliderRef = useRef()
  const settings = {
    slidesToShow: 1,
    infinite: true,
    useTransform: false,
    dots: true,
    fade: true,
    arrows: false,
    appendDots: (dots) => (
      <div style={{ position: 'relative', top: '10px' }}>
        <ul className='dots-container'>
          <button
            className='prev-button'
            onClick={() => sliderRef.current.slickPrev()}
            onKeyDown={() => sliderRef.current.slickPrev()}
            tabIndex={0}
            aria-label='go to previous'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 30 30'
              className='hero-svg'
            >
              <path
                id='Path_118'
                data-name='Path 118'
                d='M0,0,5.436,8,11,0'
                transform='translate(18.313 9.5) rotate(90)'
                fill='none'
              />
            </svg>
          </button>
          {dots}
          <button
            className='next-button'
            onClick={() => sliderRef.current.slickNext()}
            onKeyDown={() => sliderRef.current.slickNext()}
            tabIndex={0}
            aria-label='go to next'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 30 30'
              className='hero-svg'
            >
              <path
                id='Path_118'
                data-name='Path 118'
                d='M0,8,5.436,0,11,8'
                transform='translate(19.688 9.5) rotate(90)'
                fill='none'
              />
            </svg>
          </button>
        </ul>
      </div>
    ),
  }

  return (
    <ConditionalLayout>
      <div className='product-page'>
        {products.map((product) => (
          <div className='product-row'>
            <div className='product-media'>
              {product.media && (
                <Slider
                  ref={sliderRef}
                  {...settings}
                  className='product-slider'
                >
                  {product.media.map((item) => {
                    return (
                      <div key={item.id}>
                        <div className='product-image-slide'>
                          <GatsbyImage
                            alt={item.image.altText}
                            image={
                              item.image.localFile.childImageSharp
                                .gatsbyImageData
                            }
                            imgStyle={{ objectFit: 'contain' }}
                            className='product-image'
                          ></GatsbyImage>
                        </div>
                      </div>
                    )
                  })}
                </Slider>
              )}
            </div>
            <div className='product-info'>
              <h2 className='product-title'>{product.title}</h2>
              <p className='product-price'>
                ${product.priceRangeV2.minVariantPrice.amount}
              </p>
              <div
                className='product-description'
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              ></div>
              <button
                onClick={() => addVariantToCart(product, 0, 1)}
                className='add-to-cart-btn'
                disabled={product.totalInventory < 1}
              >
                {product.totalInventory > 0 ? 'Add to Cart' : 'Sold Out'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </ConditionalLayout>
  )
}

export const query = graphql`
  query {
    allShopifyProduct {
      nodes {
        id
        descriptionHtml
        media {
          ... on ShopifyMediaImage {
            id
            image {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH)
                  original {
                    height
                    width
                  }
                }
              }
            }
          }
        }
        priceRangeV2 {
          minVariantPrice {
            amount
          }
        }
        totalInventory
        title
        variants {
          shopifyId
        }
      }
    }
  }
`

export default Shop

export const Head = () => <title>Ned Rogers</title>
