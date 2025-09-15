import React from 'react'
  import videoDaschame from '../assets/videos/video2.mp4'
const LiveDaschameVideo = () => {

  return (
    <>
      <video
        className=" object-cover"
        // autoPlay
        // loop
        muted
        playsInline
        controls width={"100%"} height={500}
      >
        <source src={videoDaschame} type="video/mp4" />
      </video>
    </>
  )
}

export default LiveDaschameVideo
