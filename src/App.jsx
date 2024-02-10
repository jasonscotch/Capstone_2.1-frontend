import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Game from './Game';
import NavBar from "./NavBar";
import DeathPopup from './DeathPopup';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import SettingsPage from './SettingsPage';
import { GameProvider } from './GameContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <GameProvider>
          <NavBar />
          <Routes>
            <Route path='/sign-up' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Home />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path='/settings' element={<SettingsPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path='/game' element={<Game />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path='/death' element={<DeathPopup />} />
            </Route>
            
            {/* Redirect unknown paths to Home */}
            <Route path='*' element={<Navigate to="/" replace />} />
          </Routes>
        </GameProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;