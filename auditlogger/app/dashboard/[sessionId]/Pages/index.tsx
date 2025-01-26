import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useQuery } from "react-query";
import { getPages } from "../../../dashboard/auditLogger"; // Adjust the path for fetching pages
import Header from "../../header";
import SidePanel from "../../sidePannel";

// Define types for the API response
type Page = {
  pageSessionId: string;
  startTime: string;
};

type PagesResponse = {
  success: boolean;
  result: Page[];
};

const Pages = () => {
  const router = useRouter();
  const { sessionId } = router.query;
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Fetch session pages data using useQuery
  const { data, isLoading, isError, error } = useQuery<PagesResponse>(
    ["sessionPages", sessionId],
    () => getPages(sessionId as string),
    { enabled: !!sessionId }
  );
  const groupedData: Record<string, Page[]> = data?.result
  .filter((page) => !!page.pageSessionId) // Ensure pageSessionId is not null or undefined
  .reduce(
    (acc: Record<string, Page[]>, page) => {
      const pageType = page.pageSessionId.split("-")[0]; // Extract prefix (e.g., "login")
      if (!acc[pageType]) acc[pageType] = [];
      acc[pageType].push(page);
      return acc;
    },
    {}
  ) || {};
  if (isLoading) return <Typography>Loading pages...</Typography>;
  if (isError) return <Typography>Error fetching pages: {String(error)}</Typography>;

  // Group data by page type (e.g., "login", "signup")
//   const groupedData: Record<string, Page[]> = data?.result.reduce(
//     (acc: Record<string, Page[]>, page) => {
//       const pageType = page.pageSessionId.split("-")[0]; // Extract prefix (e.g., "login")
//       if (!acc[pageType]) acc[pageType] = [];
//       acc[pageType].push(page);
//       return acc;
//     },
//     {}
//   ) || {};

  // Handle expand/collapse of sections
  const handleToggle = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Handle redirection to logDetails page
  const handleRowClick = (pageSessionId: string) => {
    router.push(`/dashboard/${sessionId}/Pages/${pageSessionId}/logDetails`);
  };

  // Handle search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter pages based on search query
  const filteredGroupedData = Object.entries(groupedData).map(([pageType, pages]) => {
    const filteredPages = pages.filter((page) =>
      page.pageSessionId.toLowerCase().includes(searchQuery.toLowerCase()) // Search by pageSessionId
    );
    return [pageType, filteredPages] as [string, Page[]]; // Typecast to maintain correct type
  }).filter(([_, pages]) => pages.length > 0); // Only include groups with matching pages

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <SidePanel selectedOption={"overview"} />
        <div className="w-[75%] ml-[2%] mt-[2%]">
          <Box>
            <Typography variant="h5" gutterBottom>
              Pages for Session ID: {sessionId}
            </Typography>
            
            {/* Search Field */}
            <div className="mb-4 flex justify-end">
                <TextField
                    label="Search by Page"
                    variant="outlined"
                    fullWidth={false}
                    style={{ width: '300px' }}
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>


            <div
              style={{ maxHeight: "calc(100vh - 150px)" }}
              className="overflow-y-auto"
            >
              {filteredGroupedData.map(([pageType, pages]: [string, Page[]]) => (
                <Box key={pageType} sx={{ mb: 2 }}>
                  <div className="border border-gray-300 shadow-sm rounded-[5px]">
                    {/* Section header */}
                    <div className="flex justify-between items-center p-2 bg-gray-100 border-b rounded-[5px] border-gray-300">
                      <Typography className="text-lg font-bold">
                        {pageType.toUpperCase()}
                      </Typography>
                      {openSections[pageType] ? (
                        <ExpandLess
                          className="cursor-pointer"
                          onClick={() => handleToggle(pageType)}
                        />
                      ) : (
                        <ExpandMore
                          className="cursor-pointer"
                          onClick={() => handleToggle(pageType)}
                        />
                      )}
                    </div>

                    {/* Section content */}
                    {openSections[pageType] && (
                      <div>
                        {pages.map((page) => (
                          <div
                            key={page.pageSessionId}
                            className="flex justify-between items-center p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-50"
                            onClick={() => handleRowClick(page.pageSessionId)}
                          >
                            <Typography sx={{ flex: 1 }}>
                              {page.pageSessionId}
                            </Typography>
                            <Typography sx={{ flex: 1 }}>
                              {new Date(page.startTime).toLocaleString()}
                            </Typography>
                          </div>
                        ))}
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

export default Pages;
