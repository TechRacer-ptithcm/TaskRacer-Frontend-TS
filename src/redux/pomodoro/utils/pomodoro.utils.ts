export const calculateRemainingTime = (startTime: number, endTime: number) => {
  const remainingSeconds = endTime - startTime;
  return {
    minutes: Math.floor(remainingSeconds / 60),
    seconds: remainingSeconds % 60
  };
};