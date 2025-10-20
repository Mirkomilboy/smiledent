import React from 'react'
import { Atom } from 'react-loading-indicators'

const LoadingUI = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background'>
      <Atom color="#e78a53" size="large" />
    </div>
  )
}

export default LoadingUI
