import { useState, useMemo , useEffect} from "react";
import axios from "axios";

import {
  Input,
  InputAdornment,
  ListSubheader,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Box,
  Typography,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { IQuant } from "../../../utils/types/index";

import styles from "./QuantModal.module.scss";

interface Props {
  quant: any;
  handleClose: () => void;
  handleComplete: (quant: IQuant) => void;
  handleDelete: (quant: IQuant) => void;
  handleUpdate: () => void;
  setSelectedQuant: (quant: IQuant) => void;
  selectedQuant: IQuant;
}

const QuantModal = ({
  handleUpdate,
  handleDelete,
  handleComplete,
  quant,
  setSelectedQuant,
  selectedQuant,
}: Props) => {
  const allOptions = [
    "Projects",
    "AA",
    "Work",
    "Career",
    "Spirituality",
    "Culture & Arts",
    "Social",
    "Workflow",
    "Quantmn",
    "Accountability",
    "Chill",
    "Health",
    "Fitness",
    "Quality of Life",
    "Interesting",
    "Ideas",
    "Goals",
    "Vibe",
    "Partner",
    "Dev Craft"
  ];

  const [searchText, setSearchText] = useState("");


  const containsText = (text: string, searchText: string) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  const displayedOptions = useMemo(
    () => allOptions.filter((option) => containsText(option, searchText)),
    [searchText]
  );


  return (
    <>
      <DialogContent className={styles.modal__content}>
       <Box>

      <Input
        value={selectedQuant.name}
        onChange={(e) => {
          setSelectedQuant({ ...selectedQuant, name: e.target.value });
        }}
          sx={{ width: 300, display: "flex", alignItems: "center" }}
      />

    <Box>
        <Typography>Repeat</Typography>
         <FormControl>
        <Select
         className={styles.modal__content__period}
          value={selectedQuant.period}
          onChange={(e) => setSelectedQuant({...selectedQuant, period: e.target.value})}
       >

        <MenuItem value={'None'}>
          None
        </MenuItem>
        <MenuItem value={'Daily'}>
          Daily
        </MenuItem>
        

        <MenuItem value={'Two'}>
         Two Days
        </MenuItem>
        
        <MenuItem value={'Three'}>
         Three Days 
        </MenuItem>

        <MenuItem value={'Weekly'}>
         Weekly
        </MenuItem>

        <MenuItem value={'Fortnightly'}>
          Fortnightly
        </MenuItem>
     </Select>
      </FormControl>
    </Box>
       </Box>
       <TextField
         size="medium"
         onChange={(e) => setSelectedQuant({...selectedQuant, notes: e.target.value})} value={selectedQuant.notes}sx={{ width: 300 }} />
       <Box sx={{ m: 10 }}>
  <MobileDatePicker
    
          label="Date mobile"
          inputFormat="MM/dd/yyyy"
          value={selectedQuant.date}
          onChange={(e) => setSelectedQuant({...selectedQuant, date: e ? e : selectedQuant.date} )}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
        <Box sx={{ m: 10 }}>
          <FormControl fullWidth>
            <InputLabel id="search-select-label">Tags</InputLabel>
            <Select
              // Disables auto focus on MenuItems and allows TextField to be in focus
              MenuProps={{ autoFocus: false }}
              labelId="search-select-label"
              id="search-select"
              value={selectedQuant.tags}
              multiple
              label="Tag"
              // @ts-ignore
              onChange={(e) => setSelectedQuant({...selectedQuant, tags: e.target.value})}
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
              {displayedOptions.map((tags, i) => (
                <MenuItem key={i} value={tags}>
                  {tags}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpdate}>Update</Button>
        <Button onClick={() => handleComplete(quant)}>Complete</Button>
        <Button onClick={() => handleDelete(quant)}>Delete</Button>
      </DialogActions>
    </>
  );
};

export default QuantModal;
