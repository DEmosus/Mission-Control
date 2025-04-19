import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import usePlanets from '../hooks/usePlanets';
import useLaunches from '../hooks/useLaunches';
import useSounds from '../hooks/useSounds';

import Header from '../components/Header';
import Footer from '../components/Footer';

import Launch from './Launch';
import History from './History';
import Upcoming from './Upcoming';
import { useCallback } from 'react';

const AppLayout = () => {
  const { playSound } = useSounds();

  const onSuccessSound = useCallback(() => playSound('success'), [playSound]);
  const onAbortSound = useCallback(() => playSound('abort'), [playSound]);
  const onFailureSound = useCallback(() => playSound('warning'), [playSound]);

  const {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  } = useLaunches(onSuccessSound, onAbortSound, onFailureSound);

  const { planets, isLoading: planetsLoading, error: planetsError } = usePlanets();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          maxWidth: '1400px', 
          margin: '0 auto',  
          px: { xs: 2, sm: 4, md: 6, lg: 8 },
          py: 4,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Launch
                planets={planets}
                isLoading={planetsLoading}
                isPendingLaunch={isPendingLaunch}
                submitLaunch={submitLaunch}
              />
            }
          />
          <Route
            path="/launch"
            element={
              <Launch
                planets={planets}
                isLoading={planetsLoading}
                isPendingLaunch={isPendingLaunch}
                submitLaunch={submitLaunch}
              />
            }
          />
          <Route
            path="/upcoming"
            element={
              <Upcoming
                entered={true}
                launches={launches}
                abortLaunch={abortLaunch}
              />
            }
          />
          <Route
            path="/history"
            element={<History launches={launches} />}
          />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
};

export default AppLayout;
