import instance from 'api/axios/instance';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTrailer, getPopular, getTrailer, getFollowing } from 'slices/trailer';

const usePopularTrailers = (type) => {
  const dispatch = useDispatch();
  const [popularPage, setPopularPage] = useState(1);
  const cancelTokenSource = instance.createCancelToken();

  const refreshPopularTrails = () => {
    console.log('refreshing popular trails');
    dispatch(getPopular({ page: popularPage, type: type, cancelToken: cancelTokenSource }));
  };

  useEffect(() => {
    refreshPopularTrails();

    return () => {
      // You might want to cancel the ongoing request here if needed
      return () => cancelTokenSource.cancel('Request canceled.');
    };
  }, [popularPage, dispatch]);

  return { popularPage, setPopularPage, refreshPopularTrails };
};

const useFollowingTrails = (type) => {
  const dispatch = useDispatch();
  const [followingPage, setFollowingPage] = useState(1);
  const cancelTokenSource = instance.createCancelToken();

  const refreshFollowingTrails = () => {
    console.log('refreshing following trails');
    dispatch(getFollowing({ page: followingPage, type: type, cancelToken: cancelTokenSource }));
  };

  useEffect(() => {
    refreshFollowingTrails();

    return () => {
      // You might want to cancel the ongoing request here if needed
      return () => cancelTokenSource.cancel('Request canceled.');
    };
  }, [followingPage, dispatch]);

  return { followingPage, setFollowingPage, refreshFollowingTrails };
};

const useGetTrailer = (type) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cancelTokenSource = instance.createCancelToken();
    dispatch(getTrailer({ type: type, cancelToken: cancelTokenSource }));

    return () => cancelTokenSource.cancel('Request canceled.');
  }, [dispatch]);
};

const useCreateTrailer = () => {
  const dispatch = useDispatch();

  const createTrailerHandler = async (description, type) => {
    try {
      const cancelTokenSource = instance.createCancelToken();
      await dispatch(createTrailer({ description, type, cancelToken: cancelTokenSource }));
      // Handle successful creation (e.g., show success message, redirect)
    } catch (error) {
      // Handle error (e.g., set error state, show error message)
    }
  };

  return createTrailerHandler;
};

export {
  usePopularTrailers,
  useFollowingTrails,
  useCreateTrailer,
  useGetTrailer,
};