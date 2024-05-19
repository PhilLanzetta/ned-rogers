import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby-plugin-modal-routing-3'

const ProjectTile = ({ tile, mobile }) => {
  const {
    title,
    featuredImage,
    mobileWidth,
    mobileAlignment,
    desktopWidth,
    desktopAlignment,
    project,
  } = tile
  let alignment
  if (mobile) {
    if (mobileAlignment === 'left') {
      alignment = 'flex-start'
    } else if (mobileAlignment === 'right') {
      alignment = 'flex-end'
    } else {
      alignment = 'center'
    }
  } else {
    if (desktopAlignment === 'left') {
      alignment = 'flex-start'
    } else if (desktopAlignment === 'right') {
      alignment = 'flex-end'
    } else {
      alignment = 'center'
    }
  }
  let styles
  if (mobile) {
    styles = { width: `${mobileWidth}%`, alignSelf: alignment }
  } else {
    styles = { width: `${desktopWidth}%`, alignSelf: alignment }
  }

  return (
    <Link
      to={`/${project.slug}`}
      asModal
      className='project-tile'
      style={styles}
    >
      <GatsbyImage
        image={featuredImage.gatsbyImageData}
        alt={featuredImage.description}
      ></GatsbyImage>
      {title}
    </Link>
  )
}

export default ProjectTile
