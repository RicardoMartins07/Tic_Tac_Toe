
import React, { useState } from "react";
import Board from "./Board";


function Squares({value, onSquareClick}) {
    
    return (
        
        <button className="square" onClick={onSquareClick}>
        <p style={value === "X" ? { color: "dodgerblue", disabled:true } : { color: "#ff4c4c" , disabled:true } }>{value}</p>
      </button>
    );
  }
  
  export default Squares;