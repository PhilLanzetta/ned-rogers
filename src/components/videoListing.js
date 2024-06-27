import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { GatsbyImage } from 'gatsby-plugin-image'
import { AnimatePresence, motion } from 'framer-motion'

const VideoListing = ({ id, aspectRatio, videoPoster }) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className='video-module' style={{ aspectRatio: aspectRatio }}>
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
              className="poster-image"
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
    </div>
  )
}

export default VideoListing
