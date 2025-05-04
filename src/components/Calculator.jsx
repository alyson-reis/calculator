import React, { useState } from 'react';
import "./Calculator.css";
import { Box, Container } from '@mui/material';

export default function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [openParen, setOpenParen] = useState(true); // Alternar parênteses
  
  function input(value) {
    setExpression(prev => {
      if (result) {
        setResult('');
        return result + value;
      }
      return prev + value;
    });
  }

  function clear() {
    setExpression('');
    setResult('');
  }

  function percentage() {
    try {
      const num = parseFloat(expression);
      if (!isNaN(num)) {
        const newExpr = (num / 100).toString();
        setExpression(newExpr);
        setResult('');
      }
    } catch {
      setResult('Erro');
    }
  }

  function toggleSign() {
    try {
      const num = parseFloat(expression);
      if (!isNaN(num)) {
        const newExpr = (-num).toString();
        setExpression(newExpr);
        setResult('');
      }
    } catch {
      setResult('Erro');
    }
  }

  function handleParentheses() {
    setExpression(prev => prev + (openParen ? '(' : ')'));
    setOpenParen(!openParen);
  }

  function calculate() {
    try {
      const cleanedExpr = expression.replace(/x/g, '*').replace(/,/g, '.');
      const evaluated = Function('"use strict";return (' + cleanedExpr + ')')();
      const final = parseFloat(Number(evaluated).toPrecision(10)).toString();
      setResult(final);
      setExpression(final);
    } catch {
      setResult('Erro');
    }
  }

  return (
    <div>
      <Box m={10} />
      <Container>
        <div className='wrapper'>
          <h1 id='num'>{result || expression || '0'}</h1>
          <button onClick={clear} id='red'>C</button>
          <button onClick={handleParentheses} className='green'>()</button>
          <button onClick={percentage} className='green'>%</button>
          <button onClick={() => input('/')} className='green'>/</button>

          {[7, 8, 9].map(n => (
            <button key={n} onClick={() => input(n)}>{n}</button>
          ))}
          <button onClick={() => input('x')} className='green'>x</button>

          {[4, 5, 6].map(n => (
            <button key={n} onClick={() => input(n)}>{n}</button>
          ))}
          <button onClick={() => input('-')} className='green'>-</button>

          {[1, 2, 3].map(n => (
            <button key={n} onClick={() => input(n)}>{n}</button>
          ))}
          <button onClick={() => input('+')} className='green'>+</button>

          <button onClick={toggleSign}>+/-</button>
          <button onClick={() => input('0')}>0</button>
          <button onClick={() => input(',')}>,</button>
          <button onClick={calculate} id='result'>=</button>
        </div>
      </Container>
    </div>
  );
}
