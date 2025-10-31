import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby-plugin-modal-routing-3'
import { GatsbyImage } from 'gatsby-plugin-image'
import VideoListing from './videoListing'
import useWindowSize from '../utils/useWindowSize'

const ProjectListing = ({ listing }) => {
  const [active, setActive] = useState(false)
  const { title, featuredImage, featuredVideo, project, videoPosterImage, product } =
    listing
  const { width } = useWindowSize()
  const [isMobile, setIsMobile] = useState(width < 601)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true)
    }
  }, [])

  const showTip = () => {
    setActive(true)
  }

  const hideTip = () => {
    setActive(false)
  }
  return (
    <>
      <Link to={product ? '/shop' : `/${project.slug}`} asModal className='project-listing-link'>
        <p
          onMouseEnter={isMobile ? null : showTip}
          onMouseLeave={isMobile ? null : hideTip}
          className='project-listing-title'
        >
          {title}
        </p>
      </Link>
      {active && (
        <div className='project-tooltip'>
          {featuredVideo ? (
            <div className='project-listing-video-link'>
              <VideoListing
                id={featuredVideo}
                aspectRatio={project.media[0].aspectRatio}
                videoPoster={videoPosterImage}
              ></VideoListing>
            </div>
          ) : (
            <div className='project-listing-link'>
              <GatsbyImage
                image={featuredImage.gatsbyImageData}
                objectFit='contain'
                alt={featuredImage.description}
                className='tile-image'
              ></GatsbyImage>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ProjectListing
