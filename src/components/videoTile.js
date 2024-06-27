import React, { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import useOnScreen from '../utils/useOnScreen'
import { Link } from 'gatsby-plugin-modal-routing-3'
import { GatsbyImage } from 'gatsby-plugin-image'
import { AnimatePresence, motion } from 'framer-motion'

const VideoTile = ({ id, slug, aspectRatio, videoPoster }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const elementRef = useRef(null)
  const isOnScreen = useOnScreen(elementRef)

  useEffect(() => {
    if (isOnScreen) {
      setIsPlaying(true)
    }
  }, [isOnScreen])

  return (
    <div
      className='video-module'
      style={{ aspectRatio: aspectRatio }}
      ref={elementRef}
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='video-poster'
          >
            <GatsbyImage
              image={videoPoster?.gatsbyImageData}
              alt={videoPoster?.description}
            ></GatsbyImage>
          </motion.div>
        )}
      </AnimatePresence>
      <ReactPlayer
        url={`https://player.vimeo.com/video/${id}`}
        width={'100%'}
        height={'100%'}
        className='module-video-player'
        controls={false}
        playing={isPlaying}
        playsinline
        loop
        muted
        onStart={() => setIsLoading(false)}
      ></ReactPlayer>
      <Link to={`/${slug}`} asModal className='video-project-link'></Link>
    </div>
  )
}

export default VideoTile
