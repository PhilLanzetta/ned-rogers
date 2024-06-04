import React, { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { AnimatePresence, motion } from 'framer-motion'
import play from '../images/play.svg'

const VideoPlayer = ({ title, videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)

  return (
    <div className='video-module'>
      <ReactPlayer
        url={`https://player.vimeo.com/video/${videoId}`}
        width={'100%'}
        height={'100%'}
        className='module-video-player'
        controls={false}
        playing={isPlaying}
        playsinline
        volume={volume}
        muted={isMuted}
      ></ReactPlayer>
      <AnimatePresence>
        {!isPlaying && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='main-play'
            onClick={() => setIsPlaying(true)}
          >
            <img src={play} alt='play'></img>
          </motion.button>
        )}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='video-controls'
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default VideoPlayer
