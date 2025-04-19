import { useCallback, useEffect, useState } from 'react';
import { sounds } from '../settings';

const useSounds = () => {
  const [audioPlayers, setAudioPlayers] = useState({});

  useEffect(() => {
    // Initialize audio players based on the sounds configuration
    const players = {};
    Object.keys(sounds.players).forEach((soundKey) => {
      const { src, options } = sounds.players[soundKey];
      players[soundKey] = new Audio(src[0]);
      players[soundKey].preload = 'auto';
      if (options?.volume) players[soundKey].volume = options.volume;
    });

    setAudioPlayers(players);

    return () => {
      // Cleanup audio players on unmount
      Object.values(players).forEach((player) => {
        if (player) {
          player.pause();
          player.src = ""; // Clear the source to release memory
        }
      });
    };
  }, []);

  const playSound = useCallback((soundKey) => {
    const player = audioPlayers[soundKey];
    if (player) {
      player.currentTime = 0; // Reset to start
      player.play();
    } else {
      console.error(`Audio player for key "${soundKey}" not found.`);
    }
  }, [audioPlayers]);

  return { playSound };
};

export default useSounds;
