import React, { useState } from 'react'
import { Link } from 'gatsby-plugin-modal-routing-3'
import { GatsbyImage } from 'gatsby-plugin-image'
import VideoListing from './videoListing'
import { Fade } from 'react-awesome-reveal'

const ProjectListing = ({ listing }) => {
  const [active, setActive] = useState(false)
  const { title, featuredImage, featuredVideo, project } = listing

  const showTip = () => {
    setActive(true)
  }

  const hideTip = () => {
    setActive(false)
  }
  return (
    <Link to={`/${project.slug}`} asModal>
      <p
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
        className='project-listing-title'
      >
        {title}
      </p>
      {active && (
        <div className='project-tooltip'>
            {featuredVideo ? (
              <div className='project-listing-video-link'>
                <VideoListing
                  id={featuredVideo}
                  aspectRatio={project.media[0].aspectRatio}
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
    </Link>
  )
}

export default ProjectListing
