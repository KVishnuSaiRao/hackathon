import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  Button,
  TextField,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getSessions } from "./auditLogger"; // Adjust path as needed
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import { SelectChangeEvent } from "@mui/material/Select";

const CollapsibleList = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [filters, setFilters] = useState<
    Array<{ selectedKey: string; selectedValue: string }>
  >([]);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const router = useRouter();

  // Fetch sessions data
  const { data, isLoading, isError, error } = useQuery(["sessions"], getSessions);
//   const { data, isLoading, isError, error } = useQuery(["sessions"], getSessions);

  const filteredData = data?.result?.filter(
    (item:any) => item._id !== null && item._id !== undefined && item._id !== ""
  );
  console.log('filteredData=',filteredData);
  
  const handleToggle = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleRowClick = (sessionId: string) => {
    router.push(`/dashboard/${sessionId}/Pages`);
  };

  const handleFilterMenuToggle = () => {
    setFilterMenuOpen((prev) => !prev);
  };

  const handleFieldChange = (event: SelectChangeEvent<string>) => {
    setSelectedField(event.target.value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleApplyFilter = () => {
    if (selectedField && selectedValue) {
      setFilters((prev) => [...prev, { selectedKey: selectedField, selectedValue }]);
      resetFilterInputs();
    }
  };

  const resetFilterInputs = () => {
    setSelectedField("");
    setSelectedValue("");
    setFilterMenuOpen(false);
  };

  const handleClearFilters = () => {
    setFilters([]);
  };

  const handleRemoveFilter = (index: number) => {
    setFilters((prev) => prev.filter((_, i) => i !== index));
  };

  const filteredSessions = filteredData?.filter((session: any) => {
    const { user, _id, startTime } = session;
    const startTimeString = new Date(startTime).toLocaleString();

    return filters.every((filter) => {
      const { selectedKey, selectedValue } = filter;
      switch (selectedKey) {
        case "user":
          return user?.toLowerCase().includes(selectedValue.toLowerCase());
        case "sessionId":
          return _id?.toLowerCase().includes(selectedValue.toLowerCase());
        case "startTime":
          return startTimeString.includes(selectedValue);
        default:
          return true;
      }
    });
  });

  if (isLoading) return <Typography>Loading sessions...</Typography>;
  if (isError) return <Typography>Error: {String(error)}</Typography>;

  return (
    <Box className="w-[98%]">
      {/* Filter Button */}
      <Box sx={{ position: "absolute", right: 16, top: 49 }}>
        <IconButton onClick={handleFilterMenuToggle}>
          <FilterAltIcon />
        </IconButton>
      </Box>

      {/* Header */}
      <Box sx={{ mb: 1, px: 2 }}>
        <Box display="flex">
          <Typography sx={{ flex: 1, fontSize: 16 }}>User</Typography>
          <Typography sx={{ flex: 1, fontSize: 16 }}>Start Time</Typography>
          <Typography sx={{ flex: 1, fontSize: 16 }}>Session ID</Typography>
        </Box>
      </Box>

      {/* Filtered Sessions */}
      <Box
        sx={{
          maxHeight: "calc(100vh - 150px)",
          overflowY: "auto",
          mb: 4,
        }}
      >
        {filteredSessions?.map((group: any) => (
          <Box key={group._id} sx={{ backgroundColor: "white", borderRadius: 1, mb: 2 }}>
            <Box
              className="flex items-center justify-between p-2 bg-white border-b border-gray-200"
              onClick={() => handleRowClick(group._id)}
            >
              <Typography sx={{ flex: 1, fontWeight: "bold" }}>{group.user}</Typography>
              <Typography sx={{ flex: 1 }}>{new Date(group.startTime).toLocaleString()}</Typography>
              <Typography sx={{ flex: 1 }}>{group._id}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={filterMenuOpen}
        onClose={handleFilterMenuToggle}
        sx={{
          "& .MuiDrawer-paper": {
            top: "8.715vh",
            height: "calc(100vh - 8.7vh)",
            width: 400,
          },
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2, position: "sticky", top: 0, zIndex: 10, bgcolor: "white" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Filters
            </Typography>
            <Box display="flex" alignItems="center">
              <span
                  className="underline text-base pl-4 text-blue-600 cursor-pointer "
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </span>
              <IconButton onClick={handleFilterMenuToggle}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Active Filters */}
        <Box sx={{ p: 2 }}>
          {filters.length > 0 ? (
            filters.map((filter, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>
                  {filter.selectedKey}: {filter.selectedValue}
                </Typography>
                <Button
                  onClick={() => handleRemoveFilter(index)}
                  size="small"
                  color="error"
                  sx={{color: 'white' }}
                >
                  Remove
                </Button>
              </Box>
            ))
          ) : (
            <Typography>No active filters</Typography>
          )}
        </Box>

        {/* Filter Inputs */}
        <Box sx={{ p: 2 }}>
          <Select
            value={selectedField}
            onChange={handleFieldChange}
            displayEmpty
            fullWidth
          >
            <MenuItem value="" disabled>
              Select Filter Key
            </MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="sessionId">Session ID</MenuItem>
            <MenuItem value="startTime">Start Time</MenuItem>
          </Select>
        </Box>
        <Box sx={{ p: 2 }}>
          <TextField
            label="Filter Value"
            value={selectedValue}
            onChange={handleValueChange}
            fullWidth
          />
        </Box>

        {/* Filter Actions */}
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" color="secondary" onClick={resetFilterInputs} sx={{color: 'white' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleApplyFilter}
            disabled={!selectedField || !selectedValue}
          >
            Apply
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default CollapsibleList;
