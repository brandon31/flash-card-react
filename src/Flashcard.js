import React, { useState, useEffect, useRef } from 'react';

export default function Flashcard({ flashcard }) {

    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('initial')

    const frontRef = useRef();
    const backRef = useRef();

    function setMaxHeight() {
        const frontHeight = frontRef.current.getBoundingClientRect().height
        const backHeight = backRef.current.getBoundingClientRect().height

        Math.max(frontHeight, backHeight, 100)
    }

    useEffect(() => {

    }, [flashcard.question, flashcard.answer, flashcard.options])

    useEffect(() => {
        window.addEventListener('resize', setMaxHeight)
        return () => window.removeEventListener('resize', setMaxHeight)
    }, [])

  return (
    <div 
    className={`card ${flip ? 'flip' : ''}`}
    onClick={() => setFlip(!flip)} style={{ height: height }}>
        
        <div className='front' ref={frontRef}>
            {flashcard.question}
            <div className='flashcard-options'>
                {flashcard.options.map(option => {
                    return <div className='flashcard-option' key={option}>{option}</div>
                })}
            </div>
        </div>
        <div className='back' ref={backRef}>{flashcard.answer}</div>
        </div>
  )
}
