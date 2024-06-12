import React, { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { AnimatePresence, motion } from 'framer-motion'
import play from '../images/play.svg'
import Control from './control'
import { formatTime } from '../utils/formatTIme'
import full from '../images/fullScreen.svg'
import screenfull from 'screenfull'

let count = 0

const VideoPlayer = ({ title, videoId, aspectRatio }) => {
  const videoPlayerRef = useRef(null)
  const controlRef = useRef(null)
  const fullScreenRef = useRef(null)

  const [videoState, setVideoState] = useState({
    playing: false,
    muted: false,
    volume: 1,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    buffer: true,
  })

  //Destructuring the properties from the videoState
  const { playing, muted, volume, playbackRate, played, seeking, buffer } =
    videoState

  const currentTime = videoPlayerRef.current
    ? videoPlayerRef.current.getCurrentTime()
    : '00:00'
  const duration = videoPlayerRef.current
    ? videoPlayerRef.current.getDuration()
    : '00:00'

  const formatCurrentTime = formatTime(currentTime)
  const formatDuration = formatTime(duration)

  const playPauseHandler = () => {
    //plays and pause the video (toggling)
    setVideoState({ ...videoState, playing: !videoState.playing })
  }

  const rewindHandler = () => {
    //Rewinds the video player reducing 5
    if (videoPlayerRef.current.getCurrentTime() > 5) {
      videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5)
    } else {
      videoPlayerRef.current.seekTo(0)
    }
  }

  const handleFastFoward = () => {
    //FastFowards the video player by adding 5
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 5)
  }

  //console.log("========", (controlRef.current.style.visibility = "false"));
  const progressHandler = (state) => {
    if (count > 15) {
      controlRef.current.style.visibility = 'hidden'
      fullScreenRef.current.style.visibility = 'hidden' // toggling player control container
    } else {
      count += 1
    }

    if (!seeking) {
      setVideoState({ ...videoState, ...state })
    }
  }

  const seekHandler = (e, value) => {
    setVideoState({ ...videoState, played: parseFloat(value / 100) })
    videoPlayerRef.current.seekTo(parseFloat(value / 100))
  }

  const seekMouseUpHandler = (e, value) => {
    console.log(value)

    setVideoState({ ...videoState, seeking: false })
    videoPlayerRef.current.seekTo(value / 100)
  }

  const volumeChangeHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
    })
  }

  const volumeSeekUpHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0 ? true : false,
    })
  }

  const muteHandler = () => {
    //Mutes the video player
    setVideoState({ ...videoState, muted: !videoState.muted })
  }

  const onSeekMouseDownHandler = (e) => {
    setVideoState({ ...videoState, seeking: true })
  }

  const mouseMoveHandler = () => {
    controlRef.current.style.visibility = 'visible'
    fullScreenRef.current.style.visibility = 'visible'
    count = 0
  }

  const bufferStartHandler = () => {
    console.log('Bufering.......')
    setVideoState({ ...videoState, buffer: true })
  }

  const bufferEndHandler = () => {
    console.log('buffering stoped ,,,,,,play')
    setVideoState({ ...videoState, buffer: false })
  }

  const handleClickFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.request(videoPlayerRef.current.wrapper)
    }
  }

  return (
    <div
      className='video-module'
      style={{ aspectRatio: aspectRatio }}
      onMouseMove={mouseMoveHandler}
    >
      <ReactPlayer
        url={`https://player.vimeo.com/video/${videoId}`}
        ref={videoPlayerRef}
        width={'100%'}
        height={'100%'}
        className='module-video-player'
        progressInterval={1}
        controls={false}
        playing={playing}
        playsinline
        volume={volume}
        muted={muted}
        onProgress={progressHandler}
        onBuffer={bufferStartHandler}
        onBufferEnd={bufferEndHandler}
        onEnded={() => videoPlayerRef.current.seekTo(0)}
      ></ReactPlayer>
      <Control
        ref={controlRef}
        onPlayPause={playPauseHandler}
        playing={playing}
        onRewind={rewindHandler}
        onForward={handleFastFoward}
        played={played}
        onSeek={seekHandler}
        onSeekMouseUp={seekMouseUpHandler}
        volume={volume}
        onVolumeChangeHandler={volumeChangeHandler}
        onVolumeSeekUp={volumeSeekUpHandler}
        mute={muted}
        onMute={muteHandler}
        playRate={playbackRate}
        duration={formatDuration}
        currentTime={formatCurrentTime}
        onMouseSeekDown={onSeekMouseDownHandler}
      ></Control>
      <div
        className='full-screen-btn'
        ref={fullScreenRef}
        onClick={handleClickFullscreen}
      >
        <img src={full} alt='full screen'></img>
      </div>
      <button
        className='video-play-pause-overlay'
        onClick={playPauseHandler}
      ></button>
    </div>
  )
}

export default VideoPlayer
