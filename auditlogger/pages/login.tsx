import SignInPage from "@/app/components/SignIn/SignIn";

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
    <SignInPage/>
  );
}
