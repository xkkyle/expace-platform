import React from "react";
import { useSWRConfig } from "swr";

const useOptimisticMutate = () => {
  const { mutate } = useSWRConfig();
  const [isMutating, setIsMutating] = React.useState(false);

  const optimisticMutate = async (
    key: string,
    fn: () => Promise<any>,
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
