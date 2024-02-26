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

function SelectSearch(props) {
  const { workPrt, handleChange, selectedOption, name, isIssue, label } = props;

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#ffffff",
      },
    },
  });

  // option.display_name

  const [searchText, setSearchText] = useState("");
  const [ph, setPh] = useState(true);

  const displayedOptions = useMemo(
    () =>
      workPrt?.filter((option) =>
        containsText(
          name === "pwlUsers"
            ? option.display_name
            : option.name
            ? option.name
            : `${option.summary}${option.key}`,
          searchText
        )
      ),
    [searchText, workPrt]
  );

  //         project?.key,
  //         project?.name,
  //         project?.id,
  //         project?.projectCategory?.name,
  //       ]
  //     : [project?.key, project?.summary]

  const objKeys = [
    "display_name",
    "user_key",
    "key",
    "name",
    "id",
    "projectCategory?.name",
    "summary",
  ];

  /* is method me loop lg rge h 1st filter, includes, filter, so not good */
  // const getValue = (rt,project) => objKeys.map((cv, ind) => rt.includes(ind)&&project[cv]).filter(Boolean);

  const getValue = (rt, project) => {
    let as = [];
    for (let i = 0; i < rt.length; i++) {
      as.push(project[objKeys[rt[i]]]);
    }
    return as;
  };

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
        className={`${!isIssue && "background-EEE  opacity-07"} ${
          selectedOption === "Select project" && " opacity-07"
        }`}
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

        {/* value={[project?.display_name, project?.user_key]} */}

        {displayedOptions?.map((project, ind) => (
          <MenuItem
            key={ind}
            sx={{ whiteSpace: "normal" }}
            value={getValue(
              name === "pwlUsers"
                ? [0, 1]
                : project?.name
                ? [2, 3, 4, 5]
                : [2, 6],
              project
            )}

            // value={
            //   name === "pwlUsers"
            //     ? [project?.display_name, project?.user_key]
            //     : project?.name
            //     ? [
            //         project?.key,
            //         project?.name,
            //         project?.id,
            //         project?.projectCategory?.name,
            //       ]
            //     : [project?.key, project?.summary]
            // }
          >
            {name === "pwlUsers"
              ? project?.display_name
              : project?.name
              ? project?.name
              : `${project?.summary} [${project?.key}]`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectSearch;
