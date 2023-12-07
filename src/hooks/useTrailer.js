import instance from 'api/axios/instance';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTrailer, getPopular, getTrailer, getFollowing } from 'slices/trailer';

const usePopularTrailers = (trailerType) => {
  const dispatch = useDispatch();
  const [popularPage, setPopularPage] = useState(1);
  const cancelTokenSource = instance.createCancelToken();

  const refreshPopularTrails = () => {
    console.log('refreshing popular trails');
    dispatch(getPopular({ page: popularPage, trailerType: trailerType, cancelToken: cancelTokenSource }));
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

const useFollowingTrails = (trailerType) => {
  const dispatch = useDispatch();
  const [followingPage, setFollowingPage] = useState(1);
  const cancelTokenSource = instance.createCancelToken();

  const refreshFollowingTrails = () => {
    console.log('refreshing following trails');
    dispatch(getFollowing({ page: followingPage, trailerType: trailerType, cancelToken: cancelTokenSource }));
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

const useGetTrailer = (trailerType) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cancelTokenSource = instance.createCancelToken();
    dispatch(getTrailer({ trailerType: trailerType, cancelToken: cancelTokenSource }));

    return () => cancelTokenSource.cancel('Request canceled.');
  }, [dispatch]);
};

const useCreateTrailer = () => {
  const dispatch = useDispatch();

  const createTrailerHandler = async (description, trailerType) => {
    try {
      const cancelTokenSource = instance.createCancelToken();
      await dispatch(createTrailer({ description, trailerType, cancelToken: cancelTokenSource }));
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