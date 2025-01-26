
import React, { useState } from "react";
import ViewsListingTable from "./table";
import Header from "./header";
import SidePanel from "./sidePannel";

interface ProcessWorkFlowProps {
  userLoggedOut: boolean;
}

const ProcessWorkFlow: React.FC<ProcessWorkFlowProps> = ({}) => {
  const [selectedOption, setSelectedOption] = useState("overview");

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1">
        <SidePanel selectedOption={selectedOption} />

        <div className="ml-[3%] mt-6 w-full">
          <ViewsListingTable />
        </div>
      </div>
    </div>
  );
};

export default ProcessWorkFlow;
