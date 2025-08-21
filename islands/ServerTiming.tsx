import { useEffect, useState } from "preact/hooks";

export default function ServerTiming() {
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    const [entry] = performance.getEntriesByType("navigation");
    setDuration((entry as PerformanceResourceTiming).serverTiming[0].duration);
  });
  return <p>{duration.toFixed(2)}ms</p>;
}
