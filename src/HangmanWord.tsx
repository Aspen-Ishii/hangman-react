type HangmanWordProps = {
    guessedLetters: string[]
    wordToGuess: string
    reveal? : boolean
}

export function HangmanWord({guessedLetters, wordToGuess, reveal= false}: HangmanWordProps) {
    return (
    <div 
        style ={{ 
            display: "flex",
            gap: ".25em",
            fontSize: "6rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: 'Rubik Mono One, helvetica',
            color: "#53565a",
        }}>
{/* render the wordToGuess by slitting it apart into its individual letters.
note: Index is the unique id for the word and thus can be used as an exception for the key*/}

            {wordToGuess.split("").map((letter, index) => (
            <span key={index} style={{ borderBottom: ".1em solid black" }}>
                <span
                style={{
                    visibility: guessedLetters.includes(letter) || reveal
                    ? "visible" 
                    : "hidden",
                    color: !guessedLetters.includes(letter) && reveal ? "red" : "#53565a",
                }}
                >
                {letter}
                </span>
            </span>
            ))}
    </div>
    )
}