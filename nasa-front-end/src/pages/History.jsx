import React, { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box
} from '@mui/material';
import AnimatedFrame from '../components/AnimatedFrame';

const History = ({ launches = [], entered = true }) => {
  const tableBody = useMemo(() => {
    return launches
      .filter((launch) => !launch.upcoming)
      .map((launch) => (
        <TableRow key={launch.flightNumber}>
          <TableCell>
            <span
              style={{
                color: launch.success ? 'greenyellow' : 'red',
                fontWeight: 'bold',
              }}
            >
              █
            </span>
          </TableCell>
          <TableCell>{launch.flightNumber}</TableCell>
          <TableCell>{new Date(launch.launchDate).toDateString()}</TableCell>
          <TableCell>{launch.mission}</TableCell>
          <TableCell>{launch.rocket}</TableCell>
          <TableCell>{launch.customers?.join(', ') || 'N/A'}</TableCell>
        </TableRow>
      ));
  }, [launches]);

  if (!entered) return null;

  return (
    <AnimatedFrame style={{ padding: '1rem', marginTop: '2rem' }} corners={8}>
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
            History of Mission Launches
          </Typography>

          <Typography
            variant="body1"
            gutterBottom
            sx={{ color: 'rgb(0, 224, 255)' }}
          >
            Including SpaceX launches starting from the year 2006.
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
                  <TableCell sx={{ color: '#fff' }}>Customers</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableBody.length > 0 ? (
                  tableBody
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ color: 'rgb(0, 224, 255)' }}>
                      No history available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </AnimatedFrame>
  );
};

export default History;
