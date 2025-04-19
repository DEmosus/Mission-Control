import React, { useMemo } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  Paper,
  TableContainer,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AnimatedFrame from '../components/AnimatedFrame';

const Upcoming = ({ launches, abortLaunch }) => {
  const tableBody = useMemo(() => {
    return launches?.filter((launch) => launch.upcoming).map((launch) => (
      <TableRow key={launch.flightNumber}>
        <TableCell>
          <IconButton
            color="error"
            onClick={() => abortLaunch(launch.flightNumber)}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </TableCell>
        <TableCell>{launch.flightNumber}</TableCell>
        <TableCell>{new Date(launch.launchDate).toDateString()}</TableCell>
        <TableCell>{launch.mission}</TableCell>
        <TableCell>{launch.rocket}</TableCell>
        <TableCell>{launch.target}</TableCell>
      </TableRow>
    ));
  }, [launches, abortLaunch]);

  return (
    <AnimatedFrame style={{ marginTop: '2rem' }} corners={10}>
      <Box
        sx={{
          padding: 4,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '1200px',
          }}
        >
          <Typography variant="h5" gutterBottom color="rgb(0, 224, 255)">
            Upcoming Missions
          </Typography>

          <Typography
            variant="body1"
            gutterBottom
            sx={{ color: 'rgb(0, 224, 255)' }}
          >
            Missions, including SpaceX launches and newly scheduled rockets.
          </Typography>

          <Typography variant="subtitle2" color="error" gutterBottom>
            Warning! Clicking on the ✖ aborts the mission.
          </Typography>

          <TableContainer
            component={Paper}
            sx={{
              marginTop: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)',
              overflowX: 'auto',
            }}
          >
            <Table sx={{ minWidth: 1000 }} size="small">
              <TableHead sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <TableRow>
                  <TableCell />
                  <TableCell sx={{ color: '#fff' }}>No.</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Date</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Mission</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Rocket</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Destination</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{tableBody}</TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </AnimatedFrame>
  );
};

export default Upcoming;
