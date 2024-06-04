import {useCallback, useEffect, useState} from "react"
import { HangmanDrawing } from "./HangmandDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import './App.css';
import words from "./wordList.json"

///* API
/*
fetch('https://type.fit/api/quotes')
			.then((response) => response.json())
			.then((fetchedQuotes) => {
				fetchedQuotes = fetchedQuotes.filter(quote => quote.text.length <= maxLength) 
*/

function getWord() {
  return words [Math.floor(Math.random() * words.length)]
}

//generate word to guess from wordList.json file
function App () {
  const [wordToGuess, setWordToGuess] = useState (getWord)
  const [guessedLetters, setGuessedLetters] = useState <string[]>([])

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  //create lose and win states
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))

  console.log(wordToGuess)

  //create array for guessed letters. No penalty for repeated letters, implement useCallback
  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isWinner, isLoser])

  //hook up keyboard to buttons 
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler )

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  // load new game with Enter key 
  const gameReset = () => {
    setGuessedLetters([])
      setWordToGuess(getWord())
  }
  
  useEffect(()=> {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (key !== "Enter") return

      e.preventDefault()
      gameReset()
    }

    document.addEventListener("keypress", handler )

    return () => {
      document.removeEventListener("keypress", handler)
    }
  })
  
// rest of page 
  return (
    <div style ={{
      maxwidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center",
      maxWidth: "50rem",
    }}
    >
    <div style = {{ fontSize: "2rem", textAlign: "center"}}>
      {isWinner && "You Win!🎉"} 
      {isLoser && "You lost, Nice Try. Press 'Enter' to try again"}
    </div>
     <HangmanDrawing numberOfGuesses={incorrectLetters.length}/> 
     <HangmanWord reveal= {isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div className="container" style={{alignSelf: "stretch" }}>
        <Keyboard 
        disabled = {isWinner || isLoser}
        activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter)
        )}
        inactiveLetters={incorrectLetters}
        addGuessedLetter={addGuessedLetter}
         />
      </div>
      <button onClick={gameReset} id="new-game" className="new-game-button">
        New game</button>
    </div>
  )
}

export default App
