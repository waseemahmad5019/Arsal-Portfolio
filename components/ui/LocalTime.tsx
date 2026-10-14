"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 1000);
  return () => window.clearInterval(id);
}

/** The server has no clock the visitor cares about, so it renders the placeholder. */
const getServerSnapshot = () => "";

/** Live clock in the owner's timezone — a small "available now" signal. */
export default function LocalTime({ timeZone, className }: { timeZone: string; className?: string }) {
  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone,
      }),
    [timeZone],
  );

  // Ticking the store rather than local state keeps the interval out of the
  // render path and lets the first paint stay static.
  const getSnapshot = useCallback(() => formatter.format(new Date()), [formatter]);
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className={className} suppressHydrationWarning>
      {time || "--:--:--"}
    </span>
  );
}
