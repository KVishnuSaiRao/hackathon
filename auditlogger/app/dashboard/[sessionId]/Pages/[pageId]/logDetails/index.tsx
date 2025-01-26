import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Header from "../../../../header";
import SidePanel from "../../../../sidePannel";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { getLogDetails } from "../../../../auditLogger";

const CollapsibleList = () => {
  const router = useRouter();
  const { sessionId, pageId } = router.query;
  const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({}); // Manage expanded details
  const [nestedOpenSections, setNestedOpenSections] = useState<Record<string, boolean>>({});

  const { data, isLoading, isError, error } = useQuery(
    ["logDetails", sessionId],
    () => getLogDetails(sessionId as string, pageId as string),
    { enabled: !!sessionId }
  );

  // Function to toggle the nested sections
  const handleNestedToggle = (key: string) => {
    setNestedOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Function to toggle the details section
  const handleToggleDetails = (key: string) => {
    setOpenDetails((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderDetails = (details: any, prefix = "") => {
    return Object.entries(details).map(([key, value]) => {
      const uniqueKey = `${prefix}-${key}`;
      const isObject = typeof value === "object" && value !== null;

      return (
        <div key={uniqueKey} style={{ marginLeft: "20px" }}>
          <div className="flex items-center mb-2">
            {isObject && (
              <div
                className="cursor-pointer"
                onClick={() => handleNestedToggle(uniqueKey)} // Toggle nested sections
              >
                {nestedOpenSections[uniqueKey] ? (
                  <ExpandLess fontSize="small" />
                ) : (
                  <ExpandMore fontSize="small" />
                )}
              </div>
            )}
            <Typography className="font-bold" style={{ minWidth: "150px" }}>
              {key}:
            </Typography>
            {!isObject && (
              <Typography style={{ marginLeft: "10px" }}>
                {String(value)}
              </Typography>
            )}
          </div>
          {isObject && nestedOpenSections[uniqueKey] && (
            <div style={{ marginLeft: "20px", maxHeight: "150px", overflowY: "auto" }}>
              {renderDetails(value, uniqueKey)}
            </div>
          )}
        </div>
      );
    });
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error fetching log details: {String(error)}</Typography>;

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <SidePanel selectedOption={"overview"} />
        <div className="w-[72%] ml-[5%] mt-[5%]">
          <Box
            sx={{
              height: "80vh", 
              overflowY: "auto", 
              padding: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Timeline position="alternate">
              {data?.result?.map((group: any, index: number) => {
                const isRightAligned = index % 2 !== 0; 
                return (
                  <TimelineItem key={group.timestamp}>
                    <TimelineSeparator>
                      <TimelineDot
                        sx={{
                          backgroundColor:
                            group.type === "error"
                              ? "red"
                              : group.type === "warning"
                              ? "orange"
                              : group.type === "info"
                              ? "blue"
                              : "green",
                        }}
                      />
                      {index < data.result.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>

                    {/* Timeline Content */}
                    <TimelineContent>
                      <Box
                        sx={{
                          backgroundColor: "white",
                          borderRadius: 4,
                          p: 2,
                          mb: 2,
                          border: "1px solid #ddd",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: isRightAligned ? "flex-end" : "flex-start",
                          width: "100%", 
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            textAlign: isRightAligned ? "right" : "left",
                          }}
                        >
                          {new Date(group.timestamp).toLocaleString()}
                        </Typography>
                        <Typography
                          sx={{
                            color: "gray",
                            textAlign: isRightAligned ? "right" : "left",
                          }}
                        >
                          {group.type}
                        </Typography>

                        {/* Meta Details */}
                        <Box sx={{ marginTop: 2, width: "100%" }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: isRightAligned
                                ? "flex-end"
                                : "flex-start",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: "bold",
                                textAlign: isRightAligned ? "right" : "left",
                                marginRight: isRightAligned ? 0 : "8px",
                                marginLeft: isRightAligned ? "8px" : 0,
                              }}
                            >
                              Message:
                            </Typography>
                            <Typography>{group.message}</Typography>
                          </Box>

                          {/* Expandable Details Section */}
                          <Box
                            sx={{
                              marginTop: 2,
                              display: "flex",
                              justifyContent: isRightAligned
                                ? "flex-end"
                                : "flex-start",
                            }}
                          >
                            <div
                              className="flex items-center cursor-pointer"
                              onClick={() => handleToggleDetails(group.timestamp)} // Toggle details
                              style={{
                                display: "flex",
                                flexDirection: isRightAligned ? "row-reverse" : "row",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                  marginRight: isRightAligned ? 0 : "8px",
                                  marginLeft: isRightAligned ? "8px" : 0,
                                }}
                              >
                                Details
                              </Typography>
                              {openDetails[group.timestamp] ? (
                                <ExpandLess fontSize="small" />
                              ) : (
                                <ExpandMore fontSize="small" />
                              )}
                            </div>
                          </Box>

                          {openDetails[group.timestamp] && (
                            <Box
                              sx={{
                                marginTop: 1,
                                maxHeight: "200px", // Fixed height for scrollable content
                                overflowY: "auto",
                                border: "1px solid #ccc",
                                borderRadius: 4,
                                padding: 1,
                                width: "100%", // Ensure the box takes full width of its container
                              }}
                            >
                              {/* Render Details Aligned to Left */}
                              {renderDetails(group)}
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </Timeline>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleList;
