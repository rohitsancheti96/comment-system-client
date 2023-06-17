import { useCallback, useEffect, useState } from "react";

export function useAsync(func: Function, dependencies = []) {
  const { execute, ...state } = useAsyncInternal(func, dependencies, true);

  useEffect(() => {
    execute();
  }, [execute]);

  return state;
}

export function useAsyncFn(func: Function, dependencies = []) {
  return useAsyncInternal(func, dependencies, false);
}

function useAsyncInternal(
  func: Function,
  dependencies: any[],
  initialLoading = false
) {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState();
  const [value, setValue] = useState();

  const execute = useCallback((...params: any) => {
    setLoading(true);
    return func(...params)
      .then((data: any) => {
        setValue(data);
        setError(undefined);
        return data;
      })
      .catch((error: any) => {
        setValue(undefined);
        setError(error);
        return Promise.reject(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, dependencies);
  return { loading, error, value, execute };
}
