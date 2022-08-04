import React from 'react'
import './SpeechBubble.css'

function SpeechBubble({
    setBubbleOpen,
    text
}) {
  return (
    <>
        <div className="speech top">
            <p>{text}</p>
            <button onClick={() => {setBubbleOpen(false)}} className="close-speech-bubble">
                Tutup
            </button>
        </div>
    </>
  )
}

export default SpeechBubble