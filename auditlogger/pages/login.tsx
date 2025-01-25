import SignInPage from "@/app/components/SignIn/SignIn";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Example of a custom setting
      cacheTime: 1000 * 60 * 60,
      
    },
  },
});
export async function getServerSideProps() {
    // Fetch data on each request, typically for user-specific data
    const data = { message: 'This is dynamic data from the server!' };
  
    return {
      props: {
        data,
      },
    };
  }

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
    <SignInPage/>
    </QueryClientProvider>
  );
}
