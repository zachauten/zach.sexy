import { useEffect, useState } from "preact/hooks";

export default function ServerTiming() {
  const [duration, setDuration] = useState<number>();
  useEffect(() => {
    const event = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceResourceTiming;
    setDuration(event.serverTiming[0].duration);
  });

  if (duration) {
    return <p>{duration.toFixed(2)}ms</p>;
  }
}
