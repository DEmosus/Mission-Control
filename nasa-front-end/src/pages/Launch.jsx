import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Tooltip,
  OutlinedInput,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';
import AnimatedFrame from '../components/AnimatedFrame';

const inputStyles = {
  input: { color: 'rgb(0, 224, 255)' },
  label: { color: 'rgb(0, 224, 255)' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgb(0, 224, 255)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 224, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgb(0, 224, 255)',
    },
  },
  '& .MuiSvgIcon-root': {
    color: 'rgb(0, 224, 255)',
  },
};

const Launch = ({ planets, isLoading, submitLaunch, isPendingLaunch }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [selectedPlanet, setSelectedPlanet] = useState('');
  const [missionName, setMissionName] = useState('');
  const [rocketName, setRocketName] = useState('Explorer IS1');
  const [launchDate, setLaunchDate] = useState(dayjs());

  const isButtonDisabled = isPendingLaunch || !selectedPlanet || !missionName || !rocketName;

  const isFutureDate = (date) => {
    return dayjs(date).isAfter(dayjs(), 'day');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFutureDate(launchDate)) {
      enqueueSnackbar('Launch date must be in the future.', {
        variant: 'warning',
        autoHideDuration: 4000,
      });
      return;
    }

    const launchData = {
      launchDate: launchDate.toDate(),
      mission: missionName,
      rocket: rocketName,
      target: selectedPlanet,
    };

    submitLaunch(launchData);
    setMissionName('');
    setRocketName('Explorer IS1');
    setLaunchDate(dayjs());
    setSelectedPlanet('');
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AnimatedFrame corners={12} style={{ padding: '2rem', margin: '1rem 0' }}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'rgb(0, 224, 255)' }}>
          Schedule a Mission Launch
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: 'rgb(0, 224, 255)' }}>
          Schedule a mission launch for interstellar travel to one of the Kepler Exoplanets.
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Mission Name */}
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Mission Name"
              variant="outlined"
              fullWidth
              value={missionName}
              onChange={(e) => setMissionName(e.target.value)}
              sx={inputStyles}
            />
          </Box>

          {/* Rocket Name */}
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Rocket Type"
              variant="outlined"
              fullWidth
              value={rocketName}
              onChange={(e) => setRocketName(e.target.value)}
              sx={inputStyles}
            />
          </Box>

          {/* Launch Date Picker */}
          <Box sx={{ marginBottom: 2 }}>
            <DatePicker
              label="Launch Date"
              value={launchDate}
              onChange={(newValue) => setLaunchDate(newValue)}
              disablePast
              format="YYYY-MM-DD"
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: inputStyles,
                },
              }}
            />
          </Box>

          {/* Destination Exoplanet */}
          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
              <InputLabel
                id="planet-label"
                sx={{
                  color: 'rgb(0, 224, 255)',
                  '&.Mui-focused': {
                    color: 'rgb(0, 224, 255)',
                  },
                }}
              >
                Destination Exoplanet
              </InputLabel>
              <Tooltip
                title={planets?.length === 0 ? 'No planets available for selection' : ''}
                placement="top"
                arrow
                disableHoverListener={planets?.length > 0}
              >
                <Select
                  labelId="planet-label"
                  value={selectedPlanet}
                  onChange={(e) => setSelectedPlanet(e.target.value)}
                  label="Destination Exoplanet"
                  disabled={!planets || planets.length === 0}
                  input={
                    <OutlinedInput
                      label="Destination Exoplanet"
                      sx={{
                        color: 'rgb(0, 224, 255)',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgb(0, 224, 255)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 224, 255, 0.5)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgb(0, 224, 255)',
                        },
                      }}
                    />
                  }
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: '#111',
                        color: 'rgb(0, 224, 255)',
                      },
                    },
                  }}
                >
                  {planets?.length > 0 ? (
                    planets.map((planet) => (
                      <MenuItem key={planet.keplerName || planet} value={planet.keplerName || planet}>
                        {planet.keplerName || planet}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No planets available
                    </MenuItem>
                  )}
                </Select>
              </Tooltip>
            </FormControl>
          </Box>

          {/* Submit Button */}
          <Box sx={{ marginTop: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isButtonDisabled}
              sx={{
                width: 'auto',
                padding: '10px 20px',
                backgroundColor: 'rgb(0, 224, 255)',
                color: '#000',
                boxShadow: '0 0 8px rgba(0,224,255,0.7), 0 0 15px rgba(0,224,255,0.3)',
                transition: '0.3s',
                '&:hover': {
                  backgroundColor: '#00e0ff',
                  boxShadow: '0 0 12px rgba(0,224,255,1)',
                },
                '&:disabled': {
                  backgroundColor: 'rgba(0, 224, 255, 0.3)',
                  color: '#222',
                  cursor: 'not-allowed',
                  boxShadow: 'none',
                },
              }}
            >
              Submit Launch
            </Button>

          </Box>
        </form>
      </Box>
    </AnimatedFrame>
  );
};

export default Launch;
