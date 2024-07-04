import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

const useQueryParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const setQueryParams = (params) => {
    const newParams = new URLSearchParams(queryParams);

    Object.keys(params).forEach((key) => {
      if (params[key] === undefined || params[key] === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, params[key]);
      }
    });

    navigate({ search: newParams.toString() }, { replace: true });
  };

  return [queryParams, setQueryParams];
};

export default useQueryParams;
