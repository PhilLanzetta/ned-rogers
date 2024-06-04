import React, { useState } from 'react'
import { Link } from 'gatsby-plugin-modal-routing-3'
import { GatsbyImage } from 'gatsby-plugin-image'
import { motion, AnimatePresence } from 'framer-motion'
import VideoListing from './videoListing'

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
    <Link
      to={`/${project.slug}`}
      asModal
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {title}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='project-tooltip'
          >
            <Link to={`/${project.slug}`} asModal>
              {featuredVideo ? (
                <div className='project-listing-link'>
                  <VideoListing
                    id={featuredVideo}
                    slug={project.slug}
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
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  )
}

export default ProjectListing
