import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from 'notistack';
import { httpGetLaunches, httpSubmitLaunch, httpAbortLaunch } from "./requests";
import useSounds from "./useSounds";

function useLaunches() {
  const { playSound } = useSounds(); 

  const [launches, saveLaunches] = useState([]);
  const [isPendingLaunch, setPendingLaunch] = useState(false);
  const [isLoading, setLoading] = useState(true); 

  // Fetch the launches when the hook is mounted
  const getLaunches = useCallback(async () => {
    console.log("Fetching launches");
    try {
      const fetchedLaunches = await httpGetLaunches();
      saveLaunches(fetchedLaunches);
    } catch (error) {
      console.error("Error fetching launches: ", error);
      playSound("warning"); 
    } finally {
      setLoading(false);
    }
  }, [playSound]); 
  // Run the fetch on mount
  useEffect(() => {
    if (typeof getLaunches === "function") {
      getLaunches();
    }
  }, [getLaunches]);

  // Submit a new launch
  const submitLaunch = useCallback(
    async ({ launchDate, mission, rocket, target }) => {
      setPendingLaunch(true);

      try {
        const formattedDate = new Date(launchDate).toISOString().split("T")[0]; 
        console.log("Submitting launch payload:", {
          launchDate: formattedDate,
          mission,
          rocket,
          target,
        });
        
        const response = await httpSubmitLaunch({
          launchDate: formattedDate,
          mission,
          rocket,
          target,
        });

        if (response.success) {
          getLaunches();
          playSound("success");
        } else {
          playSound("warning");
        }
      } catch (error) {
        console.error("Error submitting launch: ", error);
        playSound("warning");
      } finally {
        setPendingLaunch(false);
      }
    },
    [getLaunches, playSound]
  );
  const { enqueueSnackbar } = useSnackbar();
  // Abort a pending launch
  const abortLaunch = useCallback(
    async (id) => {
      try {
        const response = await httpAbortLaunch(id);

        enqueueSnackbar(response.message, {
          variant: response.success ? 'success' : 'error',
        });

        if (response.success) {
          getLaunches();
          playSound("abort");
        } else {
          console.warn("Abort failed:", response.message);
          playSound("warning");
        }
      } catch (error) {
        console.error("Error aborting launch: ", error);
        playSound("warning");
      }
    },
    [getLaunches, playSound, enqueueSnackbar]
  );

  return {
    launches,
    isPendingLaunch,
    isLoading, 
    submitLaunch,
    abortLaunch,
  };
}

export default useLaunches;
