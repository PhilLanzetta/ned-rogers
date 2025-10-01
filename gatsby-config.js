/**
 * @type {import('gatsby').GatsbyConfig}
 */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: process.env.CONTENTFUL_API_KEY,
        spaceId: 'kt90pdg8r4ts',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-modal-routing-3`,
      options: {
        appElement: '#___gatsby',
        modalProps: {
          style: {
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
            content: {
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              border: 'none',
              background: 'none',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '0px',
              outline: 'none',
              padding: '0px',
            },
          },
          preventScroll: true,
          htmlOpenClassName: 'ReactModal__Html--open',
        },
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/NED_FAVICON.svg',
      },
    },
    'gatsby-transformer-remark',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
        },
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-shopify',
      options: {
        password: process.env.SHOPIFY_APP_PASSWORD,
        storeUrl: process.env.GATSBY_MYSHOPIFY_URL,
        downloadImages: true,
        shopifyConnections: ['collections'],
      },
    },
  ],
}
