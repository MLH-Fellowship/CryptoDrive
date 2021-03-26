import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Container,Grid} from '@material-ui/core'
import {DragAndDrop,Header, Info} from './components'
ReactDOM.render(
  <React.StrictMode>
    <Container>
      <Header/>
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

