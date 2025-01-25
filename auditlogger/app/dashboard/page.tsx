// import React, { useEffect, useState } from "react";
// import ViewsListingTable from "./table";
  
// interface ProcessWorkFlowProps {
//   userLoggedOut: boolean;
// }

// const ProcessWorkFlow: React.FC<ProcessWorkFlowProps> = ({  }) => {
//   return (
//     <div className="ml-[19%] mt-[5%]">
//     <ViewsListingTable />
//     </div>
//   )
// }

// export default ProcessWorkFlow

"use client"
import React, { useState } from "react";
import ViewsListingTable from "./table";
import Header from "./header";
import SidePanel from "./sidePannel";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Example of a custom setting
      cacheTime: 1000 * 60 * 60,
      
    },
  },
});
interface ProcessWorkFlowProps {
  userLoggedOut: boolean;
}

const ProcessWorkFlow: React.FC<ProcessWorkFlowProps> = ({}) => {
  const [selectedOption, setSelectedOption] = useState("overview");

  return (
    <QueryClientProvider client={queryClient}>
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1">
        <SidePanel selectedOption={selectedOption} />

        <div className="ml-[10%] mt-6 w-full">
          <ViewsListingTable />
        </div>
      </div>
    </div>
    </QueryClientProvider>
  );
};

export default ProcessWorkFlow;
