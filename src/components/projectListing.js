import React, { useState } from 'react'
import { Link } from 'gatsby-plugin-modal-routing-3'
import { GatsbyImage } from 'gatsby-plugin-image'

const ProjectListing = ({ listing }) => {
  const [active, setActive] = useState(false)
  const { title, featuredImage, project } = listing

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
      {active && (
        <Link to={`/${project.slug}`} className='project-tooltip'>
          <GatsbyImage
            objectFit='contain'
            image={featuredImage.gatsbyImageData}
          ></GatsbyImage>
        </Link>
      )}
    </Link>
  )
}

export default ProjectListing
