import { useEffect, useRef, useState } from 'react';

const isPageActive = () => !document.hidden && document.hasFocus();

/**
 * Tells an interactive visual whether its animation is allowed to advance.
 *
 * We keep this separate from the visual's own `playing` state:
 * - `playing` means the reader/user wants the animation to run.
 * - `isPlaybackActive` means the browser should actually spend time advancing it.
 *
 * That distinction lets a visual pause when it leaves the viewport or the tab loses
 * focus, then resume from the exact same step when the reader comes back.
 */
const useViewportPlayback = <TElement extends HTMLElement>() => {
  const ref = useRef<TElement | null>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isFocusedPage, setIsFocusedPage] = useState(() => isPageActive());

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        // The visual should start once it meaningfully enters the viewport,
        // not only after every pixel is visible.
        threshold: 0.25,
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncPageFocus = () => setIsFocusedPage(isPageActive());

    document.addEventListener('visibilitychange', syncPageFocus);
    window.addEventListener('focus', syncPageFocus);
    window.addEventListener('blur', syncPageFocus);

    return () => {
      document.removeEventListener('visibilitychange', syncPageFocus);
      window.removeEventListener('focus', syncPageFocus);
      window.removeEventListener('blur', syncPageFocus);
    };
  }, []);

  return {
    ref,
    isPlaybackActive: isInViewport && isFocusedPage,
  };
};

export default useViewportPlayback;
