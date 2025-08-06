// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './app/App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './route/Routes';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { RootApp } from './app/RootApp';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <RootApp />
//     </BrowserRouter>
//   </React.StrictMode>,
// );