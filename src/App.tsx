import {useCallback, useEffect, useState} from "react"
import { HangmanDrawing } from "./HangmandDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import words from "./wordList.json"

//generate word to guess from wordList.json file
function App () {
  const [wordToGuess, setWordToGuess] = useState (() => {
    return words [Math.floor(Math.random() * words.length)]
  })
  const [guessedLetters, setGuessedLetters] = useState <string[]>([])

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  console.log(wordToGuess)

  //create array for guessed letters. No penalty for repeated letters, implement useCallback
  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter)) return

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters])

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
  
// rest of page 
  return (
    <div style ={{
      maxwidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center",
    }}
    >
    <div style = {{ fontSize: "2rem", textAlign: "center"}}>Lose Win
    </div>
     <HangmanDrawing numberOfGuesses={incorrectLetters.length}/> 
     <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div className="container" style={{alignSelf: "stretch"}}>
        <Keyboard />
      </div>
      <button id="new-game">New game</button>
    </div>
  )
}

export default App
