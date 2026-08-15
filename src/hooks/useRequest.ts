import { useEffect, useState } from "react";

interface RequestState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Один и тот же хук используется для главной страницы и страницы прогноза.
 * request передаётся через useCallback, поэтому запрос запускается только
 * когда реально меняются его зависимости.
 */
export function useRequest<T>(request: () => Promise<T>): RequestState<T> {
  const [state, setState] = useState<RequestState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    setState({
      data: null,
      loading: true,
      error: null,
    });

    request()
      .then((data) => {
        if (active) {
          setState({
            data,
            loading: false,
            error: null,
          });
        }
      })
      .catch((error: unknown) => {
        if (!active) {
          return;
        }

        const message =
          error instanceof Error ? error.message : "Неизвестная ошибка";

        setState({
          data: null,
          loading: false,
          error: message,
        });
      });

    return () => {
      active = false;
    };
  }, [request]);

  return state;
}
