import {useState} from "react"
import words from "./wordList.json"
import { HangmanDrawing } from "./HangmandDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"

function App () {
  const [wordToGuess, setWordToGuess] = useState (() => {
    return words [Math.floor(Math.random() * words.length)]
  })
  const [guessedLetters, setGuessedLetters] = useState <string[]>([])

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  console.log(wordToGuess)
  
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
