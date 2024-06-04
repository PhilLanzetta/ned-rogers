import React, { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import useOnScreen from '../utils/useOnScreen'
import { Link } from 'gatsby-plugin-modal-routing-3'

const VideoTile = ({ id, slug }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const elementRef = useRef(null)
  const isOnScreen = useOnScreen(elementRef)

  useEffect(() => {
    if (isOnScreen) {
      setIsPlaying(true)
    }
  }, [isOnScreen])

  return (
      <div className='video-module' ref={elementRef}>
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
        ></ReactPlayer>
        <Link to={`/${slug}`} asModal className='video-project-link'></Link>
      </div>
  )
}

export default VideoTile
