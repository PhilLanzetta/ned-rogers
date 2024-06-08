import React from 'react'
import { graphql } from 'gatsby'
import ConditionalLayout from '../components/ConditionalLayout'
import useWindowSize from '../utils/useWindowSize'
import { GatsbyImage } from 'gatsby-plugin-image'
import VideoPlayer from '../components/videoPlayer'

const Project = ({ data }) => {
  const { title, media } = data.contentfulProject
  const { width } = useWindowSize()
  const isMobile = width < 900

  return (
    <ConditionalLayout>
      <h2 className='page-title'>{title}</h2>
      <div className='project-media-container'>
        {media.map((item) => {
          if (item.imageMediaId) {
            let alignment
            let clearValue
            if (item.desktopAlignment === 'left') {
              alignment = 'left'
              clearValue = 'both'
            } else if (item.desktopAlignment === 'right') {
              alignment = 'right'
              clearValue = 'none'
            } else {
              alignment = 'center'
              clearValue = 'none'
            }
            let styles
            if (isMobile) {
              styles = { width: '100%', justifySelf: 'center', padding: '20px' }
            } else {
              styles = {
                width: `${item.desktopWidth}%`,
                float: alignment,
                padding: '20px',
                clear: clearValue
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
          } else {
            return (
              <VideoPlayer
                title={item.title}
                videoId={item.videoId}
              ></VideoPlayer>
            )
          }
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
        ... on ContentfulImage {
          imageMediaId: id
          desktopAlignment
          desktopWidth
          image {
            description
            gatsbyImageData
          }
        }
        ... on ContentfulVideo {
          videoMediaId: id
          videoId
          title
          showTitleAsCaption
        }
      }
    }
  }
`

export default Project
