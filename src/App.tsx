import {useCallback, useEffect, useState} from "react"
import { HangmanDrawing } from "./HangmandDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import './App.css'

//use an API to generate random word with 5 characters
async function getWord() {
  const response = await fetch('https://random-word-api.herokuapp.com/word?length=5');
  const words = await response.json();

  return words[0]; // The API returns an array with one word
}

//generate word to guess from wordList.json file
function App () {
  const [wordToGuess, setWordToGuess] = useState("")
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  //create lose and win states
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))

  console.log(wordToGuess)

  //create array for guessed letters. No penalty for repeated letters, implement useCallback
  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return;

    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters, isWinner, isLoser]);

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
  }, [guessedLetters]);

  // reset game
  const gameReset = useCallback(async () => {
    setGuessedLetters([]);
    const newWord = await getWord();
    setWordToGuess(newWord);
  }, []);

  useEffect(() => {
    gameReset();
  }, [gameReset]);

 //reload game with enter key 
 useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    const key = e.key;
    if (key !== "Enter") return;
    e.preventDefault();
    gameReset();
  };
  document.addEventListener("keypress", handler);
  return () => {
    document.removeEventListener("keypress", handler);
  };
}, [gameReset]);

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
      {isLoser && "You lost. Try again"}
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
