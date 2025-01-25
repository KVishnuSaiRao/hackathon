// import React from "react";
// import { useRouter } from "next/router";
// import { Box, Typography, Card, CardContent } from "@mui/material";
// import { useQuery } from "react-query";
// import { getPages } from "../../../dashboard/auditLogger"; // Adjust the path for fetching pages
// import Header from "../../header";
// import SidePanel from "../../sidePannel";

// const Pages = () => {
//   const router = useRouter();
//   const { sessionId } = router.query; // Retrieve the sessionId from query parameters

//   // Fetch session pages data using useQuery
//   const { data, isLoading, isError, error } = useQuery(
//     ["sessionPages", sessionId], // Query key with sessionId to differentiate requests
//     () => getPages(sessionId as string), // Query function with sessionId
//     {
//       enabled: !!sessionId, // Only run the query if sessionId exists
//     }
//   );

//   if (isLoading) return <Typography>Loading pages...</Typography>;
//   if (isError) return <Typography>Error fetching pages: {String(error)}</Typography>;

//   return (
//     <div className="flex flex-col h-screen">
//     <Header />

//     <div className="flex flex-1">
//       <SidePanel selectedOption={"overview"} />
//       <div className="mt-2 ml-3 w-full">
//     <Box >
//       <Typography variant="h5" gutterBottom>
//         Pages for Session ID: {sessionId}
//       </Typography>
//       <div className="flex flex-wrap justify-between mt-[2rem]">
//         {data?.result.map((page: { pageSessionId: string; startTime: string }, index: number) => (
//           <Card
//             key={index}
//             sx={{
//               backgroundColor: "#FDF4F3",
//               maxWidth: "280px", // Decrease the card width
//               width: "100%",
//               margin: "auto",
//               boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Optional: improve card shadow
//             }}
//           >
//             <CardContent>
//               <Typography className="text-lg font-semibold" >{page.pageSessionId}</Typography>
//               <Typography className="text-md" >
//                 Start Time: {new Date(page.startTime).toLocaleString()}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </Box>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default Pages;



import React from "react";
import { useRouter } from "next/router";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { useQuery } from "react-query";
import { getPages } from "../../../dashboard/auditLogger"; // Adjust the path for fetching pages
import Header from "../../header";
import SidePanel from "../../sidePannel";

const Pages = () => {
  const router = useRouter();
  const { sessionId } = router.query; // Retrieve the sessionId from query parameters

  // Fetch session pages data using useQuery
  const { data, isLoading, isError, error } = useQuery(
    ["sessionPages", sessionId], // Query key with sessionId to differentiate requests
    () => getPages(sessionId as string), // Query function with sessionId
    {
      enabled: !!sessionId, // Only run the query if sessionId exists
    }
  );

  if (isLoading) return <Typography>Loading pages...</Typography>;
  if (isError) return <Typography>Error fetching pages: {String(error)}</Typography>;

  // Handle card click and redirect to logDetails page
  const handleCardClick = (pageSessionId: string) => {
    router.push(`/dashboard/${sessionId}/Pages/${pageSessionId}/logDetails`);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <SidePanel selectedOption={"overview"} />
        <div className="mt-2 ml-3 w-full">
          <Box>
            <Typography variant="h5" gutterBottom>
              Pages for Session ID: {sessionId}
            </Typography>
            <div className="flex flex-wrap justify-between mt-[2rem]">
              {data?.result.map((page: { pageSessionId: string; startTime: string }, index: number) => (
                <Card
                  key={index}
                  sx={{
                    backgroundColor: "#FDF4F3",
                    maxWidth: "280px", // Decrease the card width
                    width: "100%",
                    margin: "auto",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Optional: improve card shadow
                  }}
                  onClick={() => handleCardClick(page.pageSessionId)} // Add click handler
                >
                  <CardContent>
                    <Typography className="text-lg font-semibold">{page.pageSessionId}</Typography>
                    <Typography className="text-md">
                      Start Time: {new Date(page.startTime).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Pages;
