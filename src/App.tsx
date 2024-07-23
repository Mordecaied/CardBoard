import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import { useAuth } from './contexts/AuthContext';
import { useSettings } from './contexts/SettingsContext';
import { lightTheme, darkTheme } from './styles/theme';
import Header from './components/common/Header';
import DashboardView from './pages/DashboardView';
import DataManagementView from './pages/DataManagementView';
import SettingsView from './pages/SettingsView';
import Login from './components/auth/Login';
import Layout from './components/Layout';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { settings } = useSettings();

  return (
    <ThemeProvider theme={settings.theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Router>
        {isAuthenticated && <Header />}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
            <Route 
              path="/" 
              element={isAuthenticated ? <DashboardView /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/data-management" 
              element={isAuthenticated ? <DataManagementView /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/settings" 
              element={isAuthenticated ? <SettingsView /> : <Navigate to="/login" replace />} 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;