
"use client"
import SignInPage from '../components/SignIn/SignIn';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Example of a custom setting
      cacheTime: 1000 * 60 * 60,
      
    },
  },
});

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
    <SignInPage/>
    </QueryClientProvider>
  );
}
