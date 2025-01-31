import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import LaptopIcon from '@mui/icons-material/Laptop';
import MemoryIcon from '@mui/icons-material/Memory';
import SpeedIcon from '@mui/icons-material/Speed';
import '@fontsource/orbitron';
import '@fontsource/roboto-mono';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00a2ff',
      light: '#5dd5ff',
    },
    secondary: {
      main: '#ff0055',
    },
    background: {
      default: '#0a1929',
      paper: '#0a1929',
    },
  },
  typography: {
    fontFamily: 'Orbitron, sans-serif',
    h1: {
      fontFamily: 'Orbitron, sans-serif',
    },
    h2: {
      fontFamily: 'Orbitron, sans-serif',
    },
    body1: {
      fontFamily: 'Roboto Mono, monospace',
    },
  },
});

const CountdownBox = ({ value, label }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, type: 'spring' }}
  >
    <Box
      sx={{
        background: 'linear-gradient(135deg, rgba(0,162,255,0.1) 0%, rgba(0,162,255,0.2) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0,162,255,0.3)',
        borderRadius: '10px',
        p: { xs: 1, sm: 2 },
        minWidth: { xs: '80px', sm: '120px' },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00a2ff)',
          animation: 'scanline 2s linear infinite',
        },
      }}
    >
      <Typography 
        variant="h3" 
        sx={{ 
          color: '#00a2ff', 
          fontFamily: 'Roboto Mono',
          fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3rem' }
        }}
      >
        {value}
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          color: '#5dd5ff', 
          textTransform: 'uppercase',
          fontSize: { xs: '0.7rem', sm: '0.875rem' }
        }}
      >
        {label}
      </Typography>
    </Box>
  </motion.div>
);

function App() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date('2025-03-31') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0a1929 0%, #001e3c 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '200%',
            height: '200%',
            background: 'repeating-linear-gradient(45deg, #00a2ff 0%, transparent 1px, transparent 50%, #00a2ff 51%)',
            backgroundSize: '10px 10px',
            opacity: 0.05,
            animation: 'backgroundMove 20s linear infinite',
          },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
              py: { xs: 4, md: 0 },
            }}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 4,
                flexDirection: { xs: 'column', sm: 'row' },
                textAlign: { xs: 'center', sm: 'left' }
              }}>
                <LaptopIcon sx={{ 
                  fontSize: { xs: 40, sm: 60 }, 
                  color: '#00a2ff', 
                  mr: { xs: 0, sm: 2 },
                  mb: { xs: 2, sm: 0 }
                }} />
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.5rem' },
                    background: 'linear-gradient(45deg, #00a2ff, #5dd5ff)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold',
                  }}
                >
                  Laptop Expert
                </Typography>
              </Box>
            </motion.div>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
                  color: '#5dd5ff',
                  mb: { xs: 4, md: 6 },
                  textAlign: 'center',
                  px: 2
                }}
              >
                NEXT GENERATION TECH COMING SOON
              </Typography>
            </motion.div>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: { xs: 2, sm: 3 },
                justifyContent: 'center',
                mb: { xs: 4, md: 6 },
                px: 2
              }}
            >
              {Object.keys(timeLeft).length > 0 && (
                <>
                  <CountdownBox value={timeLeft.days} label="Days" />
                  <CountdownBox value={timeLeft.hours} label="Hours" />
                  <CountdownBox value={timeLeft.minutes} label="Minutes" />
                  <CountdownBox value={timeLeft.seconds} label="Seconds" />
                </>
              )}
            </Box>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: { xs: 3, sm: 4 },
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  mb: 4,
                  px: 2
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <MemoryIcon sx={{ 
                    fontSize: { xs: 30, sm: 40 }, 
                    color: '#00a2ff', 
                    mb: 1 
                  }} />
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#5dd5ff',
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                  >
                    Advanced Hardware
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <SpeedIcon sx={{ 
                    fontSize: { xs: 30, sm: 40 }, 
                    color: '#00a2ff', 
                    mb: 1 
                  }} />
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#5dd5ff',
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                  >
                    Maximum Performance
                  </Typography>
                </Box>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(93, 213, 255, 0.7)',
                  textAlign: 'center',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  letterSpacing: 1,
                }}
              >
                Solution by{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(45deg, #00a2ff, #5dd5ff)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold',
                  }}
                >
                  olexto Digital Solutions
                </Box>
              </Typography>
            </motion.div>
          </Box>
        </Container>
      </Box>
      <style jsx global>{`
        @keyframes scanline {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes backgroundMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-50%, -50%); }
        }
      `}</style>
    </ThemeProvider>
  );
}

export default App; 