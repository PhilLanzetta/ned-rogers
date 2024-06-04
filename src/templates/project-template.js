import React from 'react'
import { graphql } from 'gatsby'
import ConditionalLayout from '../components/ConditionalLayout'
import useWindowSize from '../utils/useWindowSize'
import { GatsbyImage } from 'gatsby-plugin-image'

const Project = ({ data }) => {
  const { title, media } = data.contentfulProject
  const { width } = useWindowSize()
  const isMobile = width < 900

  return (
    <ConditionalLayout>
      <h2 className='page-title'>{title}</h2>
      <div className='project-media-container'>
        {media.map((item) => {
          let alignment
          if (item.desktopAlignment === 'left') {
            alignment = 'left'
          } else if (item.desktopAlignment === 'right') {
            alignment = 'right'
          } else {
            alignment = 'center'
          }
          let styles
          if (isMobile) {
            styles = { width: '100%', justifySelf: 'center', padding: '20px' }
          } else {
            styles = {
              width: `${item.desktopWidth}%`,
              float: alignment,
              padding: '20px',
            }
          }
          return (
            <div key={item.id} style={styles}>
              <GatsbyImage
                image={item.image.gatsbyImageData}
                alt={item.image.description}
              ></GatsbyImage>
            </div>
          )
        })}
      </div>
    </ConditionalLayout>
  )
}

export const query = graphql`
  query getSingleProject($slug: String) {
    contentfulProject(slug: { eq: $slug }) {
      title
      media {
        id
        desktopAlignment
        desktopWidth
        image {
          description
          gatsbyImageData
        }
      }
    }
  }
`

export default Project
