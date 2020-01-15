import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

export default function App(props) {

  const SNIPPETS = [
    'Bears, beets, battlestar galactica',
    "What's Forrest Gump's password? 1Forrest1",
    'Where do programmers like to hangout? The Foo Bar'
  ];
  const INITIAL_GAME_STATE = { victory: false, startTime: null, endTime: null };
  const [snippet, setSnippet] = useState('Choose a snippet!');
  const [userText, setUserText] = useState('');
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [inputColor, setInputColor] = useState('green');

  const updateUserText = event => {
    setUserText(event.target.value);
    if (event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
      setInputColor('green');
    } else {
      setInputColor('red');
    }
  }

  const chooseSnippet = snippetIndex => () => {
    setSnippet(SNIPPETS[snippetIndex]);
    setGameState({ ...gameState, victory: false, startTime: new Date().getTime() });
    setUserText('');
  };

  useEffect(() => {
    if (gameState.victory) document.title = 'Victory!';
  });

  return (
    <div>
      <h2>Type Race</h2>
      <hr />
      <h3>Snippet</h3>
      <p>{snippet}</p>
      <input value={userText} onChange={updateUserText} style={{ color: inputColor }} />
      <h4 className={!gameState.victory && 'hidden' ? 'hidden':''}>{gameState.victory ? `Done! 🎉 Time: ${gameState.endTime}ms` : '&nbsp;'}</h4>
      <br />
      <hr />
      {
        SNIPPETS.map((SNIPPET, index) => (
          <button onClick={chooseSnippet(index)} key={index}>
            {SNIPPET.substring(0, 10)}
          </button>
        ))
      }
    </div>

  );

}
