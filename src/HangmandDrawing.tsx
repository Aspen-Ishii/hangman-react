/** Hangman body*/
const HEAD = (
    <div key="head"
    style={{
        width: '50px',
        height: "50px",
        borderRadius: "100%",
        border: "10px solid black",
        position: "absolute",
        top: "50px",
        right: "-30px",
    }} />
)
const BODY = (
    <div key="body"
    style={{
        width: '10px',
        height: "100px",
        background: "black",
        position: "absolute",
        top: "120px",
        right: 0,
    }} />
)
const R_ARM = (
    <div key="r-arm"
    style={{
        width: '70px',
        height: "10px",
        background: "black",
        position: "absolute",
        top: "150px",
        right: "-70px",
        rotate: "-30deg",
        transformOrigin: "left bottom",
    }} />
)
const L_ARM = (
    <div key= "l-arm"
    style={{
        width: '70px',
        height: "10px",
        background: "black",
        position: "absolute",
        top: "150px",
        right: "10px",
        rotate: "30deg",
        transformOrigin: "right bottom",
    }} />
)
const R_Leg = (
    <div key="r-leg"
    style={{
        width: '100px',
        height: "10px",
        background: "black",
        position: "absolute",
        top: "210px",
        right: "-90px",
        rotate: "60deg",
        transformOrigin: "left bottom",
    }} />
)
const L_Leg = (
    <div key="l-leg"
    style={{
        width: '100px',
        height: "10px",
        background: "black",
        position: "absolute",
        top: "210px",
        right: 0,
        rotate: "-60deg",
        transformOrigin: "right bottom",
    }} />
)

const BODY_PARTS = [HEAD, BODY, R_ARM, L_ARM, R_Leg, L_Leg]

type HangmanDrawingProps = {
    numberOfGuesses: number
}

/** Hangman tree */
export function HangmanDrawing({numberOfGuesses}: HangmanDrawingProps) {
    return (
    <div style= {{ position: "relative"}}>
        {BODY_PARTS.slice(0, numberOfGuesses)}
        <div 
            style={{
                height: "50px",
                width: "10px",
                background: "black",
                position: "absolute",
                top: 0,
                right: 0,
            }}
        />
        <div 
            style={{
                height: "10px",
                width: "200px",
                background: "black",
                marginLeft: "120px",
            }}
        />
        <div 
            style={{
                height: "400px",
                width: "10px",
                background: "black",
                marginLeft: "120px",
            }}
        />
        <div 
            style={{
                height: "10px", 
                width: "250px", 
                background:"black"
                }}
        />
    </div>
    )
}