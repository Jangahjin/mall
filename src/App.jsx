import './App.css'
import { RouterProvider } from 'react-router-dom';
import Root from './router/Root';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <RouterProvider router={Root} />
    </>
  );
}

export default App;