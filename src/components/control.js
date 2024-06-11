import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import Slider from '@mui/material/Slider'
import back from '../images/rewind.svg'
import playPauseSvg from '../images/playPause.svg'
import forward from '../images/forward.svg'
import sound from '../images/sound.svg'


const Control = forwardRef((props, controlRef) => {
  const {
    onPlayPause,
    playing,
    onRewind,
    onForward,
    played,
    onSeek,
    onSeekMouseUp,
    onVolumeChangeHandler,
    onVolumeSeekUp,
    volume,
    mute,
    onMute,
    duration,
    currentTime,
    onMouseSeekDown,
    userInteraction,
  } = props
  return (
    <div
      className={`video-controls ${
        userInteraction ? 'controls-show' : 'controls-hide'
      }`}
      ref={controlRef}
    >
      <div className='progress-bar'>
        <Slider
          min={0}
          max={100}
          value={played * 100}
          onChange={onSeek}
          onChangeCommitted={onSeekMouseUp}
          onMouseDown={onMouseSeekDown}
          sx={{
            '& .MuiSlider-thumb': {
              color: '#fff',
              height: '10px',
              width: '10px',
            },
            '& .MuiSlider-track': {
              color: '#fff',
              height: '2px',
            },
            '& .MuiSlider-rail': {
              color: '#fff',
              height: '2px',
            },
          }}
        />
      </div>
      <div className='controls-container'>
        <div>
          {currentTime} / {duration}
        </div>
        <div className='seek-and-play-controls'>
          <img src={back} alt='seek back' onClick={onRewind}></img>
          <img
            src={playPauseSvg}
            alt='play or pause'
            onClick={onPlayPause}
          ></img>
          <img src={forward} alt='seek forward' onClick={onForward}></img>
        </div>
        <div className='sound-container'>
          <img src={sound} alt='sound icon'></img>
          <Slider
            onChange={onVolumeChangeHandler}
            value={volume * 100}
            onChangeCommitted={onVolumeSeekUp}
            sx={{
              width: '50%',
              '& .MuiSlider-thumb': {
                color: '#fff',
                height: '10px',
                width: '10px',
              },
              '& .MuiSlider-track': {
                color: '#fff',
                height: '2px',
              },
              '& .MuiSlider-rail': {
                color: '#fff',
                height: '2px',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
})

export default Control
