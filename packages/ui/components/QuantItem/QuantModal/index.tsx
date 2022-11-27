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
import { SearchWithFilter } from "./SearchWithFilter";

const findQuantsFromIds = (quants: any, ids: any) => {
  if (!ids) return [];
  const matches = quants.filter((q: any) => ids.includes(q._id));
  // map through each 
  const names = matches.map((q: any) => q.name);
  return names;
};

const findIdsFromQuants = (quants: any, names: any) => {
  const matches = quants.filter((q: any) => names.includes(q.name));
  // map through each
  const ids = matches.map((q: any) => q._id);
  return ids;
};
  

import styles from "./QuantModal.module.scss";

interface Props {
  quant: any;
  handleClose: () => void;
  handleComplete: (quant: IQuant) => void;
  handleDelete: (quant: IQuant) => void;
  handleUpdate: () => void;
  setSelectedQuant: (quant: IQuant) => void;
  selectedQuant: IQuant;
  quants: IQuant[];
  displayQuants: IQuant[];
}


const QuantModal = ({
  quants,
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
    "Goals"
  ];

  const [searchText, setSearchText] = useState("");
  const [quantsNames, setQuantsNames] = useState<any>([]);

  useEffect(() => {
    setQuantsNames(quants.map((q: any) => q.name));
  }, [])

  const containsText = (text: string, searchText: string) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  const displayedOptions = useMemo(
    () => quantsNames.filter((option: string) => containsText(option, searchText)),
    [quantsNames, searchText]
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

        <MenuItem value={'Monthly'}>
         Monthly 
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
        {selectedQuant.tags && (
          <SearchWithFilter
            setSearchText={setSearchText}
            displayedOptions={displayedOptions}
            quant={selectedQuant}
            setSelectedQuant={setSelectedQuant}
            relationship="parents"
          />
      )}
        {selectedQuant.children && (
          <SearchWithFilter
            setSearchText={setSearchText}
            displayedOptions={displayedOptions}
            quant={selectedQuant}
            setSelectedQuant={setSelectedQuant}
            relationship="children"
          />
        )}
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
