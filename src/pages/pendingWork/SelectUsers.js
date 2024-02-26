import React, { useState, useMemo } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListSubheader from "@mui/material/ListSubheader";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const containsText = (text, searchText) =>
  text?.toLowerCase()?.indexOf(searchText?.toLowerCase()) > -1;

function SelectUsers(props) {
  const { workPrt, handleChange, selectedOption, name, label } = props;

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#ffffff",
      },
    },
  });

  const [searchText, setSearchText] = useState("");
  const [ph, setPh] = useState(true);

  const displayedOptions = useMemo(
    () =>
      workPrt?.filter((option) =>
        containsText(option.display_name, searchText)
      ),
    [searchText, workPrt]
  );

  return (
    <FormControl fullWidth required>
      {!selectedOption && ph && (
        <ThemeProvider theme={theme}>
          <InputLabel
            color="secondary"
            className={!!selectedOption ? "" : "qw"}
          >
            {label}
          </InputLabel>
        </ThemeProvider>
      )}

      <Select
        // label={label}
        id="Implementation-Status"
        MenuProps={{
          sx: {
            maxHeight: "300px",
            maxWidth: "400px",
          },

          PaperProps: {
            sx: {
              "& .MuiMenuItem-root:hover": {
                backgroundColor: "#5897fb!important",
                color: "white",
              },
            },
          },

          autoFocus: false,
        }}
        onOpen={() => {
          setPh(false);
        }}
        value={selectedOption}
        onChange={handleChange()}
        onClose={() => {
          setSearchText("");
          !selectedOption && setPh(true);
        }}
        renderValue={() => selectedOption}
        name={name}
        size="small"
      >
        <ListSubheader>
          <TextField
            size="small"
            autoFocus
            placeholder="Type to search..."
            fullWidth
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Escape") {
                e.stopPropagation();
              }
            }}
          />
        </ListSubheader>

        {displayedOptions?.map((project, ind) => (
          <MenuItem
            key={ind}
            value={[project?.display_name, project?.user_key]}
          >
            {project?.display_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectUsers;
