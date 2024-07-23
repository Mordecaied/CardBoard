import React from 'react';
import { Box, Container } from '@mui/material';
import Header from './common/Header';
import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {isAuthenticated && <Header />}
      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;