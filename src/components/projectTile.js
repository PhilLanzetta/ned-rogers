import React, { useRef } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby-plugin-modal-routing-3'
import useOnScreen from '../utils/useOnScreen'
import VideoTile from './videoTile'

const ProjectTile = ({ tile, mobile }) => {
  const {
    title,
    featuredImage,
    mobileWidth,
    mobileAlignment,
    desktopWidth,
    desktopAlignment,
    featuredVideo,
    project,
  } = tile
  const elementRef = useRef(null)
  const isOnScreen = useOnScreen(elementRef)
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
    <Link to={`/${project.slug}`} asModal style={styles} className="project-tile">
      <div
        ref={elementRef}
        className={isOnScreen ? 'project-tile-show' : 'project-tile-hide'}
      >
        {featuredVideo ? (
          <VideoTile id={featuredVideo} slug={project.slug}></VideoTile>
        ) : (
          <GatsbyImage
            image={featuredImage.gatsbyImageData}
            alt={featuredImage.description}
            className='tile-image'
          ></GatsbyImage>
        )}
        <div className='project-tile-title'>{title}</div>
      </div>
    </Link>
  )
}

export default ProjectTile
