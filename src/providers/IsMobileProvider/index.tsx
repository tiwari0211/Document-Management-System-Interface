import React, { useCallback, useEffect, useRef, useState } from "react";
import { onlyChildProps } from "../../interfaces";
import { useDispatch } from "react-redux";
import { setHeight } from "../../redux/constants/constantSlice";

export const MobileProvider = React.createContext<boolean | null>(null);
function IsMobileProvider(props: onlyChildProps) {
  const { children } = props;
  const dispatch = useDispatch();
  function useEventListener(
    eventName: string,
    handler: (event: Event) => void,
    element = window
  ) {
    const savedHandler: any = useRef("");
    useEffect(() => {
      savedHandler.current = handler;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handler]);

    useEffect(() => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      const eventListener = (event: Event) => savedHandler.current(event);
      element.addEventListener(eventName, eventListener);
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventName, element]);
  }
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [isMobile, setMobile] = useState<boolean>(width <= 768);

  const handler = useCallback(() => {
    setWidth(window.innerWidth);
    setMobile(window.innerWidth <= 768);
    dispatch(setHeight(window.visualViewport?.height ?? window.innerHeight));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setWidth]);
  useEventListener("resize", handler);
  return (
    <MobileProvider.Provider value={isMobile}>
      {children}
    </MobileProvider.Provider>
  );
}

export default IsMobileProvider;
