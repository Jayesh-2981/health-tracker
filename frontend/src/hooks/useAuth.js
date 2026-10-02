import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/authService';

export function useAuth() {
    const query = useQuery({
        queryKey: ['auth', 'me'],
        queryFn: getCurrentUser,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    const isAuthenticated = query.isSuccess;
    const user = query.data?.data?.user ?? null;

    return {
        ...query,
        user,
        isAuthenticated,
    };
}