import {
  InputAdornment,
  ListSubheader,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  TextField,
} from "@mui/material";
import { get, startCase  } from "lodash";

import { IQuant } from 'ui';

interface Props {
  quant: IQuant;
  displayedOptions: string[];
  setSearchText: (searchText: string) => void;
  setSelectedQuant: (quant: IQuant) => void;
  relationship: string;
}

export const SearchWithFilter = ({relationship, displayedOptions, setSelectedQuant, quant, setSearchText }: Props) => {

  const tag = relationship === 'parents' ? 'tags' : 'children';

  const handleChange = (event: any, quant: IQuant) => {
    const { value } = event.target;
    const key = relationship === 'parents' ? 'tags' : 'children';
    const newQuant = { ...quant, [key]: value };
    setSelectedQuant(newQuant);
  };

return (
        <Box sx={{ m: 10 }}>
          <FormControl fullWidth>
            <InputLabel id="search-select-label">{startCase(relationship)}</InputLabel>
            <Select
              // Disables auto focus on MenuItems and allows TextField to be in focus
              MenuProps={{ autoFocus: false }}
              labelId="search-select-label"
              id="search-select"
              value={get(quant, tag, [])}
              multiple
              label="Tag"
              // @ts-ignore
              onChange={(event) => handleChange(event, quant)}
              // This prevents rendering empty string in Select's value
              // if search text would exclude currently selected option.
            >
              {/* TextField is put into ListSubheader so that it doesn't
              act as a selectable item in the menu
              i.e. we can click the TextField without triggering any selection.*/}
              <ListSubheader>
                <TextField
                  size="small"
                  // Autofocus on textfield
                  autoFocus
                  placeholder="Type to search..."
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                      </InputAdornment>
                    ),
                  }}
                  // @ts-ignore
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key !== "Escape") {
                      // Prevents autoselecting item while typing (default Select behaviour)
                      e.stopPropagation();
                    }
                  }}
                />
              </ListSubheader>
              {displayedOptions.map((quantName: string, i: number) => (
                <MenuItem key={i} value={quantName}>
                  {quantName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      );
}


