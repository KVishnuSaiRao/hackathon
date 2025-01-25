
// import React, { useState } from "react";
// import { Box, Typography } from "@mui/material";
// import { useRouter } from "next/router";
// import { useMutation, useQuery, useQueryClient } from "react-query";
// import { getSessions } from './auditLogger'; // Adjust the path to your API function

// const CollapsibleList = () => {
//   const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
//   const router = useRouter();

//   // Fetch data using useQuery
//   const { data, isLoading, isError, error } = useQuery(
//     ["sessions"], // Query key
//     getSessions, 
//   );

//   const handleToggle = (section: string) => {
//     setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

//   const handleRowClick = (sessionId: string) => {
//     router.push(`/dashboard/${sessionId}/Pages`);
//   };

//   if (isLoading) return <Typography>Loading sessions...</Typography>;
//   if (isError) return <Typography>Error: {String(error)}</Typography>;

//   return (
//     <div className="w-[80%]">
//       <Box sx={{ flexGrow: 1 }}>
//         {/* Column headers */}
//         <div className="mb-1 p-2">
//           <div className="flex flex-row">
//             <Typography sx={{ flex: 1, marginLeft: "2.6%", fontSize: "16px" }}>
//               User
//             </Typography>
//             <Typography sx={{ flex: 1, fontSize: "16px" }}>Start Time</Typography>
//             <Typography sx={{ flex: 1, fontSize: "16px" }}>Session ID</Typography>
//           </div>
//         </div>

//         {/* Report sections */}
//         <div
//           style={{ maxHeight: "calc(100vh - 150px)" }}
//           className="overflow-y-auto mb-4"
//         >
//           {data?.result?.map((group: any) => (
//             <Box
//               key={group.sessionId}
//               sx={{
//                 backgroundColor: "white",
//                 borderRadius: 4,
//                 mb: 2,
//               }}
//             >
//               <div className="border border-gray-300 shadow-sm rounded-[5px]">
//                 {/* Expand/collapse report sections */}
//                 <div
//                   className="flex justify-between items-center p-2 bg-white border-b rounded-[5px] border-gray-200"
//                   onClick={() => handleRowClick(group.sessionId)}
//                 >
//                   <div className="flex flex-row items-center w-full">
//                     <Typography
//                       sx={{ marginLeft: "2.6%", flex: 1 }}
//                       className="text-lg font-bold"
//                     >
//                       {group.user}
//                     </Typography>
//                     <Typography sx={{ flex: 1 }} className="text-gray-700">
//                       {new Date(group.startTime).toLocaleString()}
//                     </Typography>
//                     <Typography
//                       sx={{ flex: 1, marginLeft: "2.8%" }}
//                       className="text-gray-700"
//                     >
//                       {group.sessionId}
//                     </Typography>
//                   </div>
//                 </div>

//                 {openSections[group.sessionId] && (
//                   <div className="p-4">
//                     <Typography>
//                       <strong>Additional Details:</strong> Expand for future
//                       information
//                     </Typography>
//                   </div>
//                 )}
//               </div>
//             </Box>
//           ))}
//         </div>
//       </Box>
//     </div>
//   );
// };

// export default CollapsibleList;




import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { getSessions } from './auditLogger'; // Adjust the path to your API function

const CollapsibleList = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const router = useRouter();

  // Fetch data using useQuery
  const { data, isLoading, isError, error } = useQuery(
    ["sessions"], // Query key
    getSessions
  );

  const handleToggle = (sessionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sessionId]: !prev[sessionId], // Toggle the open/close state for the specific session
    }));
  };

  const handleRowClick = (sessionId: string) => {
    router.push(`/dashboard/${sessionId}/Pages`);
  };

  if (isLoading) return <Typography>Loading sessions...</Typography>;
  if (isError) return <Typography>Error: {String(error)}</Typography>;

  return (
    <div className="w-[80%]">
      <Box sx={{ flexGrow: 1 }}>
        {/* Column headers */}
        <div className="mb-1 p-2">
          <div className="flex flex-row">
            <Typography sx={{ flex: 1, marginLeft: "2.6%", fontSize: "16px" }}>
              User
            </Typography>
            <Typography sx={{ flex: 1, fontSize: "16px" }}>Start Time</Typography>
            <Typography sx={{ flex: 1, fontSize: "16px" }}>Session ID</Typography>
          </div>
        </div>

        {/* Report sections */}
        <div style={{ maxHeight: "calc(100vh - 150px)" }} className="overflow-y-auto mb-4">
          {data?.result?.map((group: any) => (
            <Box key={group.sessionId} sx={{ backgroundColor: "white", borderRadius: 4, mb: 2 }}>
              <div className="border border-gray-300 shadow-sm rounded-[5px]">
                {/* Expand/collapse report sections */}
                <div
                  className="flex justify-between items-center p-2 bg-white border-b rounded-[5px] border-gray-200"
                  onClick={() => handleRowClick(group.sessionId)}
                >
                  <div className="flex flex-row items-center w-full">
                    <Typography sx={{ marginLeft: "2.6%", flex: 1 }} className="text-lg font-bold">
                      {group.user}
                    </Typography>
                    <Typography sx={{ flex: 1 }} className="text-gray-700">
                      {new Date(group.startTime).toLocaleString()}
                    </Typography>
                    <Typography sx={{ flex: 1, marginLeft: "2.8%" }} className="text-gray-700">
                      {group.sessionId}
                    </Typography>
                  </div>
                </div>

                {/* Conditional rendering for additional details */}
                {openSections[group.sessionId] && (
                  <div className="p-4">
                    <Typography>
                      <strong>Additional Details:</strong> Expand for future information
                    </Typography>
                  </div>
                )}
              </div>
            </Box>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default CollapsibleList;
