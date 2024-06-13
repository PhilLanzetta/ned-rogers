import React, { useState } from 'react'
import ReactPlayer from 'react-player'

const VideoListing = ({ id, aspectRatio }) => {
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <div className='video-module' style={{aspectRatio: aspectRatio}}>
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
    </div>
  )
}

export default VideoListing
