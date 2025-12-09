import React from "react";
import { Loader } from "lucide-react";
import useIsMountedRef from "./useIsMountedRef";

const useLoading = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const ref = useIsMountedRef();

  const startTransition = async <T>(promise: Promise<T>): Promise<T> => {
    try {
      setIsLoading(true);
      const data = await promise;
      return data;
    } finally {
      if (ref.isMounted) {
        setIsLoading(false);
      }
    }
  };

  return { startTransition, isLoading, Loading: Loader };
};

export default useLoading;
