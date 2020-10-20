import { useState, useEffect } from "react";
import axios from "axios";
import { authenticationService, authAxios } from "../services";

export const useFetch = (url, initialState = null) => {
  const [data, setPosts] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      let ax = axios;
      if (authenticationService.isAuthenticated) {
        ax = authAxios;
      }
      return ax
        .get(url)
        .then((response) => {
          console.log(response.data);
          setPosts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    };
    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};
