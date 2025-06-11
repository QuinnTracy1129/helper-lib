import { useState } from 'react';

export function useToggle(bool = false) {
  const [isActive, setIsActive] = useState(bool);

  const toggle = () => setIsActive((prev) => !prev);

  const setOn = () => setIsActive(true);

  const setOff = () => setIsActive(false);

  return { isActive, toggle, setOff, setOn };
}
