import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './ErrorPage';
import RecipeDetail from './RecipeDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
  }, 
  {
    path: "/RecipeDetail/:id",
    element: <RecipeDetail/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider
    basename="/Vegetarian-Recipes"
    router={router}/>
  </React.StrictMode>
);