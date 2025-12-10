import React from "react";
import { useSWRConfig } from "swr";

const useOptimisticMutate = () => {
  const { mutate } = useSWRConfig();
  const [isMutating, setIsMutating] = React.useState(false);

  const optimisticMutate = async <T>(
    key: string,
    fn: () => Promise<T>,
    options = {},
  ) => {
    setIsMutating(true);
    try {
      return await mutate(key, fn, options);
    } finally {
      setIsMutating(false);
    }
  };

  return { optimisticMutate, isMutating };
};

export default useOptimisticMutate;
