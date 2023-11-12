import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/authContext';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import SecondaryScreen from './pages/SecondaryScreen';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/*'
          element={
            isAuthenticated ? (
              <Navigate to='/dashboard' />
            ) : (
              <Navigate to='/signin' />
            )
          }
        />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/error' element={<SecondaryScreen />} />
        <Route path='/detail-1' element={<SecondaryScreen />} />
        <Route path='/detail-2' element={<SecondaryScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
