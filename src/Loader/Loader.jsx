import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
const Loader = () => {
  return (
    <div className='loader_Container'>
    <CircularProgress size={100} color="inherit" />
    </div>
  )
}

export default Loader