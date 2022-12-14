import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './app.css';
import axios from 'axios';

function App() {

  const [flashcard, setFlashcard] = useState([]);

  const [categories, setCategories] = useState([])

  const categoryRef = useRef();
  const amountRef = useRef();

  useEffect(() => {
      axios.get('https://opentb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories)
      })
  }, [])

  useEffect(() => {
    
  }, [])

  function decodeString(str) {
    const textarea = document.createElement('textarea')
    textarea.innerHTML = str
    return textarea.value
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.get('https://opentdb.com/api.php', {
      params: {
        amount: amountRef.current.value,
        category: categoryRef.current.value
      }
    })
    .then(res => {
      setFlashcard(res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)

        const options = [...questionItem.incorrect_answers.map(a => decodeString(arguments)), answer]

        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
    })
  }

;  return (
    <>
    <form className='header' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='category'>Category</label>
        <select id='category' ref={categoryRef}>
          {categories.map(category => {
            return <option key={category.id} value={category.id}>{category.name}</option>
          })}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='amount'>Number of questions</label>
        <input type='number' id='amount' min='1' step='1' defaultValue={10} ref={amountRef} />
      </div>
      <div className='form-group'>
        <button className='btn'>Generate</button>
      </div>
    </form>

    <div className='container'>
      <FlashcardList flashcards={flashcard} />
    </div>
    </>
  );
}

export default App;