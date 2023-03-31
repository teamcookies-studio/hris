import React, { useCallback, useEffect } from 'react';

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  const handleClick = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  }, [callback, ref]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, handleClick]);
};
