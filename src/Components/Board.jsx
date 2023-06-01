import React, { useEffect, useState } from "react";
import Squares from "./Squares";
import Scoreboard from "./Scoreboard";
import Button from "./Button";



function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null)); // Create an array with 9 elements and fill it null in order to know which squares are playable
    const [xIsNext, setXIsNext] = useState(true); 
    const [ScoreP1, setScoreP1] = useState(0); 
    const [ScoreP2, setScoreP2] = useState(0);
    const [finish,FinishGame] = useState(false); //Variable that stores if the game is finished yet
    const [result,setResult] = useState(''); // Dynamically show who won
    const [nTurns,setTurns] = useState(0);

    

    function handleClick(i){
        const nextSquares = squares.slice(); // create an copy of the array squares created above
        
        // Check if square is empty or filled
        if (squares[i] || calculateWinner(squares)) {
            
            return;
        }

        //Define Player
        if (xIsNext) {
            
            nextSquares[i] = "X";
        } else {
            
            nextSquares[i] = "O";
        }

        setSquares(nextSquares); // Set the value of square
        setXIsNext(!xIsNext); // Define who plays next
        setTurns(nTurns+1);
        //if(nTurns===8){FinishGame(true)}
        console.log("Turnos" + nTurns);
    }

    const CheckWinner = calculateWinner(squares);
    if(!finish){
    
    let status;
    
    if (CheckWinner) {
        status = "Winner: " + CheckWinner;
        CheckWinner === 'X' ? setScoreP1(ScoreP1 + 1 )  : setScoreP2(ScoreP2+1) ;
        CheckWinner === 'X' ? setResult("Player 1 Wins") : setResult("Player 2 Wins");
        FinishGame(true);        
        return;
    } else {
        if(nTurns===9){setResult("It's a tie");FinishGame(true); return}
        status = "Next player: " + (xIsNext ? "X" : "O");
        
    }
    }
   

    function handleClickButton(){
        setSquares(Array(9).fill(null));
        FinishGame(false);
        setResult('');
        setTurns(0);
        
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            
            return squares[a];
        }
    }
        return null;
    }

    return (
        <>
        <Scoreboard P1Score={ScoreP1} P2Score={ScoreP2}/>
        <div> <p className="PlayerTurn" >Player <span style={!xIsNext ? { color: "#ff4c4c" } : { color: "dodgerblue" } }>{!xIsNext ? "O" : "X" }</span>'S Turn</p></div>
        <div className="board-bg">
      <div className="board">
         
      <div className="board-row">
        <Squares value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Squares value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Squares value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Squares value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Squares value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Squares value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Squares value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Squares value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Squares value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      </div>
      </div>
      <p className="Result" style={xIsNext ? { color: "#ff4c4c" } : { color: "dodgerblue" } }>{result}</p>
      <Button finish={finish} onClick={() => handleClickButton()}/>
      
      </>
    );
  }
  
  export default Board;