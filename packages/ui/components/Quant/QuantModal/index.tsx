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
  Dialog,
  Button,
  Box,
  Typography,
  Checkbox,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { IQuant } from "../../../utils/types/index";

import styles from "./QuantModal.module.scss";

interface Props {
  quant: any;
  handleClose: () => void;
  handleDelete: (quant: IQuant) => void;
  updateQuantHandler: () => void;
  setSelectedQuant: (quant: IQuant) => void;
  selectedQuant: IQuant;
}

const QuantModal = ({
  updateQuantHandler,
  handleDelete,
  quant,
  setSelectedQuant,
  selectedQuant,
}: Props) => {
  const allOptions = [
    "AA",
    "Career",
    "Spirituality",
    "Culture & Arts",
    "Social",
    "Workflow",
    "Quantmn",
    "Accountability"
  ];

  const [tags, setTags] = useState([]);
  const [searchText, setSearchText] = useState("");


  const containsText = (text: string, searchText: string) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  const displayedOptions = useMemo(
    () => allOptions.filter((option) => containsText(option, searchText)),
    [searchText]
  );


  return (
    <>
      <DialogTitle>{quant.name}</DialogTitle>
      <DialogContent className={styles.modal__content}>
        <Typography>Repeat</Typography>
       <Box>

         <FormControl>
        <Select
         className={styles.modal__content__period}
          value={selectedQuant.period}
          onChange={(e) => setSelectedQuant({...selectedQuant, period: e.target.value})}
       >
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
     </Select>

      </FormControl>
       </Box>
       <Input onChange={(e) => setSelectedQuant({...selectedQuant, notes: e.target.value})} value={selectedQuant.notes}sx={{ width: 300 }} />
        <Box sx={{ m: 10 }}>
          <FormControl fullWidth>
            <InputLabel id="search-select-label">Tags</InputLabel>
            <Select
              // Disables auto focus on MenuItems and allows TextField to be in focus
              MenuProps={{ autoFocus: false }}
              labelId="search-select-label"
              id="search-select"
              value={tags}
              multiple
              label="Tag"
              // @ts-ignore
              onChange={(e) => setTags(e.target.value)}
              // This prevents rendering empty string in Select's value
              // if search text would exclude currently selected option.
              renderValue={() => tags}
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
        <Button onClick={updateQuantHandler}>Update</Button>
        <Button onClick={() => handleDelete(quant)}>Delete</Button>
      </DialogActions>
    </>
  );
};

export default QuantModal;
