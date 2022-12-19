import { useState, useMemo, useEffect } from "react";
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
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { IQuant } from "../../utils/types/index";
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
  setSelectedQuant: (quant: IQuant) => void;
  selectedQuant: IQuant;
  quants: IQuant[];
}

const Search = ({
  quants,
  setSelectedQuant,
  selectedQuant,
}: Props) => {
  const [searchText, setSearchText] = useState("");
  const [quantsNames, setQuantsNames] = useState<any>([]);

  useEffect(() => {
    setQuantsNames(quants.map((q: any) => q.name));
  }, []);

  const containsText = (text: string, searchText: string) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  const displayedOptions = useMemo(
    () =>
      quantsNames.filter((option: string) => containsText(option, searchText)),
    [quantsNames, searchText]
  );

  return (
    <>
        {selectedQuant.children && (
          <SearchWithFilter
            setSearchText={setSearchText}
            displayedOptions={displayedOptions}
            quant={selectedQuant}
            setSelectedQuant={setSelectedQuant}
            relationship="children"
          />
        )}
    </>
  );
};

export default Search;
