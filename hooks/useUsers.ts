import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/users', fetcher, {
    refreshInterval: 300_000,
  });

  return { data, error, isLoading, mutate };
};
export default useUsers;
