import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'

const PrettoSlider = styled(Slider)({
  root: {
    height: '20px',
    color: '#9556CC',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#9556CC',
    border: '2px solid currentColor',
    marginTop: -3,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 5,
    borderRadius: 4,
    width: '100%',
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
})

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
  } = props
  return (
    <div className='video-controls' ref={controlRef}>
      <div className='progress-bar'>
        <PrettoSlider
          min={0}
          max={100}
          value={played * 100}
          onChange={onSeek}
          onChangeCommitted={onSeekMouseUp}
          onMouseDown={onMouseSeekDown}
        />
      </div>
      <div className='controls-container'></div>
    </div>
  )
})

export default Control
