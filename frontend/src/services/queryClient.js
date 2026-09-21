import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            stateTime: 30 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

export default queryClient;