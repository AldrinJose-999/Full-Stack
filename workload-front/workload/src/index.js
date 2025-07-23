import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CalendarApp from './calendar/CalendarApp';
import WorkloadPage from './WorkloadPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> 
    {/* Render the WorkloadPage which includes CalendarApp */}
    {/* <App /> Uncomment this if you want to render the default App component */}
    {/* <CalendarApp /> Uncomment this if you want to render CalendarApp directly */}
    {/* You can switch between WorkloadPage and CalendarApp as needed */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
