import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { ExpandLess,ExpandMore } from "@mui/icons-material";
import Header from "../../../../header";
import SidePanel from "../../../../sidePannel";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { getLogDetails } from "../../../../auditLogger";


const CollapsibleList = () => {
  const router = useRouter();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [nestedOpenSections, setNestedOpenSections] = useState<Record<string, boolean>>({});
  const { sessionId,pageId } = router.query; 
const { data, isLoading, isError, error } = useQuery(
    ["logDetails", sessionId], // Query key with sessionId to differentiate requests
    () => getLogDetails(sessionId as string,pageId as string), // Query function with sessionId
    {
      enabled: !!sessionId, // Only run the query if sessionId exists
    }
  );
  const handleToggle = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleNestedToggle = (key: string) => {
    setNestedOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderDetails = (details: any, prefix = "") => {
    return Object.entries(details).map(([key, value]) => {
      const uniqueKey = `${prefix}-${key}`;
      const isObject = typeof value === "object" && value !== null;
      
      return (
        <div key={uniqueKey} style={{ marginLeft: prefix ? "20px" : "0px" }}>
          <div className="flex items-center mb-2">
            {isObject && (
              <div
                className="cursor-pointer"
                onClick={() => handleNestedToggle(uniqueKey)}
              >
                {nestedOpenSections[uniqueKey] ? (
                  <ExpandLess fontSize="small" />
                ) : (
                  <ExpandMore fontSize="small" />
                )}
              </div>
            )}
            <Typography
              className={`font-bold ${isObject ? "cursor-pointer" : ""}`}
              onClick={isObject ? () => handleNestedToggle(uniqueKey) : undefined}
              style={{ display: "inline-block", minWidth: "150px" }}
            >
              {key}:
            </Typography>
            {!isObject && (
              <Typography style={{ display: "inline-block", marginLeft: "10px" }}>
                {String(value)}
              </Typography>
            )}
          </div>
          {isObject && nestedOpenSections[uniqueKey] && (
            <div style={{ marginLeft: "20px" }}>
              {renderDetails(value, uniqueKey)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1">
        <SidePanel selectedOption={"overview"} />
    <div className="w-[60%] ml-[5%] mt-[5%]">
      <Box sx={{ flexGrow: 1 }}>
        {/* Column headers */}
        <div className="mb-1 p-2">
          <div className="flex flex-row">
            <Typography sx={{ flex: 1, marginLeft: "2.6%", fontSize: "16px" }}>
              Message
            </Typography>
            <Typography sx={{ flex: 1, fontSize: "16px" }}>Type</Typography>
            <Typography sx={{ flex: 1, fontSize: "16px" }}>Time</Typography>
          </div>
        </div>

        {/* Report sections */}
        <div
          style={{ maxHeight: "calc(100vh - 150px)" }}
          className="overflow-y-auto mb-4"
        >
          {data?.result?.map((group:any) => (
            <Box
              key={group.sessionId}
              sx={{
                backgroundColor: "white",
                borderRadius: 4,
                mb: 2,
              }}
            >
              <div className="border border-gray-300 shadow-sm rounded-[5px]">
                {/* Expand/collapse report sections */}
                <div className="flex justify-between items-center p-2 bg-white border-b rounded-[5px] border-gray-200">
                  <div className="flex flex-row items-center w-full">
                    <Typography
                      sx={{ marginLeft: "2.6%", flex: 1 }}
                      className="text-lg font-bold"
                    >
                      {group.message}
                    </Typography>
                    <Typography sx={{ flex: 1 }} className="text-gray-700">
                      {group.type}
                    </Typography>
                    <Typography
                      sx={{ flex: 1, marginLeft: "2.8%" }}
                      className="text-gray-700"
                    >
                      {new Date(group.timestamp).toLocaleString()}
                    </Typography>
                  </div>
                  {openSections[group.timestamp] ? (
                    <ExpandLess
                      className="cursor-pointer"
                      onClick={() => handleToggle(group.timestamp)}
                    />
                  ) : (
                    <ExpandMore
                      className="cursor-pointer"
                      onClick={() => handleToggle(group.timestamp)}
                    />
                  )}
                </div>

                {openSections[group.timestamp] && (
                  <div className="p-4">
                    <Typography>
                      <strong>Details:</strong>
                    </Typography>
                    {renderDetails(group)}
                  </div>
                )}
              </div>
            </Box>
          ))}
        </div>
      </Box>
    </div>
    </div>
    </div>
  );
};

export default CollapsibleList;
