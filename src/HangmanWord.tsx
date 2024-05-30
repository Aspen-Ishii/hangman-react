export function HangmanWord() {
    const word = "test"
    const guessedLetters = ["t", "e", "a" ]
    return (
    <div 
        style ={{ 
            display: "flex",
            gap: ".25em",
            fontSize: "6rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: 'Rubik Mono One',
            color: "#53565a",
        }}>
{/* render the wordToGuess by slitting it apart into its individual letters.
note: Index is the unique id for the word and thus can be used as an exception for the key*/}

            {word.split("").map((letter, index) => (
            <span key={index} style={{ borderBottom: ".1em solid black" }}>
                <span
                style={{
                    visibility: guessedLetters.includes(letter) 
                    ? "visible" 
                    : "hidden"
                }}
                >
                {letter}
                </span>
            </span>
            ))}
    </div>
    )
}