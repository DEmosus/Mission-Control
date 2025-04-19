import { useCallback, useEffect, useState } from "react";
import { httpGetPlanets } from "./requests";

function usePlanets() {
  const [planets, savePlanets] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPlanets = useCallback(async () => {
    try {
      const fetchedPlanets = await httpGetPlanets();
      savePlanets(fetchedPlanets);
    } catch (err) {
      console.error("Error fetching planets:", err);
      setError("Failed to load planets. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  return { planets, isLoading, error };
}

export default usePlanets;
