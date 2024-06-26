import React from 'react'
import { graphql } from 'gatsby'
import ConditionalLayout from '../components/ConditionalLayout'
import useWindowSize from '../utils/useWindowSize'
import { GatsbyImage } from 'gatsby-plugin-image'
import VideoPlayer from '../components/videoPlayer'
import { Fade } from 'react-awesome-reveal'

const Project = ({ data }) => {
  const { title, media, id } = data.contentfulProject
  const { width } = useWindowSize()
  const isMobile = width < 900

  return (
    <ConditionalLayout id={id}>
      <h2 className='page-title'>{title}</h2>
      <div className='project-media-container'>
        {media.map((item) => {
          if (item.imageMediaId) {
            let alignment
            let clearValue
            let marginValue
            if (item.desktopAlignment === 'left') {
              alignment = 'left'
              clearValue = 'both'
              marginValue = '0'
            } else if (item.desktopAlignment === 'right') {
              alignment = 'right'
              clearValue = 'none'
              marginValue = '0'
            } else {
              alignment = 'center'
              clearValue = 'both'
              marginValue = '0 auto'
            }
            let styles
            if (isMobile) {
              styles = { width: '100%', justifySelf: 'center', padding: '15px' }
            } else {
              styles = {
                width: `${item.desktopWidth}%`,
                float: alignment,
                padding: '15px',
                clear: clearValue,
                margin: marginValue,
              }
            }
            return (
              <div key={item.imageMediaId} style={styles}>
                <Fade>
                  <GatsbyImage
                    image={item.image.gatsbyImageData}
                    alt={item.image.description}
                  ></GatsbyImage>
                </Fade>
              </div>
            )
          } else {
            return (
              <div style={{ padding: '20px' }} key={item.videoMediaId}>
                <Fade>
                  <VideoPlayer
                    title={item.title}
                    videoId={item.videoId}
                    aspectRatio={item.aspectRatio}
                  ></VideoPlayer>
                </Fade>
              </div>
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
      id
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
          aspectRatio
        }
      }
    }
  }
`

export default Project

export const Head = ({ data }) => (
  <title>Ned Rogers | {data.contentfulProject.title}</title>
)
