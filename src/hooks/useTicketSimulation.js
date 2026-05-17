import { useState, useEffect, useCallback } from "react";

export function useTicketSimulation(steps, options = {}) {
  const {
    stepDuration = 2200,
    loop = true,
    autoStart = true,
  } = options;

  const [activeIndex, setActiveIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [completedSteps, setCompletedSteps] = useState([]);

  const reset = useCallback(() => {
    setActiveIndex(-1);
    setCompletedSteps([]);
    setIsRunning(true);
  }, []);

  useEffect(() => {
    if (!isRunning || steps.length === 0) return;

    let index = 0;
    setActiveIndex(0);
    setCompletedSteps([]);

    const interval = setInterval(() => {
      setCompletedSteps((prev) => {
        if (!prev.includes(index)) return [...prev, index];
        return prev;
      });

      index += 1;

      if (index >= steps.length) {
        if (loop) {
          index = 0;
          setCompletedSteps([]);
        } else {
          clearInterval(interval);
          setIsRunning(false);
          return;
        }
      }

      setActiveIndex(index);
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isRunning, steps.length, stepDuration, loop]);

  const activeStep = activeIndex >= 0 ? steps[activeIndex] : null;

  return {
    activeIndex,
    activeStep,
    completedSteps,
    isRunning,
    setIsRunning,
    reset,
  };
}
