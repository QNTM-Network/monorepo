import { useState, useEffect, useMemo } from "react";
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
import axios from "axios";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import { getExpectation } from "../../utils/getExpected";
import QuantModal from "./QuantModal/index";
import { IQuant, IQuantsByTags } from "../../utils/types/index";
import Search from "./Search";

// @ts-ignore
import styles from "./QuantItem.module.scss";

interface Props {
  quant: any;
  setDisplayQuants: (quants: IQuant[]) => void;
  displayQuants: IQuant[];
  setQuantsByTags: (quants: IQuantsByTags) => void;
  quants: IQuant[];
  setSelectedQuant: (quant: IQuant | null) => void;
  selectedQuant?: IQuant | null;
}

interface IQuantWithExpectation extends IQuant {
  count: number;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: 5,
  bgcolor: "background.paper",
  backgrountColor: "grey",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const QuantItem = ({
  selectedQuant,
  setSelectedQuant,
  quants,
  displayQuants,
  setDisplayQuants,
  quant,
}: Props) => {
  const [searchText, setSearchText] = useState("");
  const [quantsNames, setQuantsNames] = useState<any>([]);
  const handleClose = () => {
    setSelectedQuant(null);
  };

  const handleDelete = (quant: IQuant) => {
    setDisplayQuants(displayQuants.filter((q) => q._id !== quant._id));

    setSelectedQuant(null);
    axios.delete(`/api/quant/${quant._id}`).then(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(err.text);
      }
    );
  };

  const handleComplete = (quant: IQuant) => {
    setDisplayQuants(displayQuants.filter((q) => q._id !== quant._id));
    const expected = getExpectation(quants as IQuantWithExpectation[]);

    setSelectedQuant(null);
    axios.patch(`/api/quant/${quant._id}`, { ...quant, status: 0 }).then(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(err.text);
      }
    );

    axios.post("/api/user/quant", {
      address: quant.user,
      quant: quant._id,
      tags: quant.tags,
      expected,
    });
  };

  const handleUpdate = () => {
    console.log("handleUpdate", selectedQuant);
    setDisplayQuants(
      displayQuants.map((q) => {
        console.log("found");
        if (q._id === selectedQuant?._id) {
          return selectedQuant;
        }
        return q;
      })
    );

    axios.patch(`/api/quant/${quant._id}`, selectedQuant).then(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(err.text);
      }
    );
  };

  const handleUpdateDate = (quant: any) => {
    console.log("handleUpdate", quant);
    // convert date to string
    setDisplayQuants(
      displayQuants.map((q) => {
        if (q._id === quant._id) {
          return quant;
        }
        return q;
      })
    );
    console.log("handleUpdate", selectedQuant);
  };

  const handleUpdatePeriod = (quant: any) => {
    console.log("handleUpdate", quant);
    setDisplayQuants(
      displayQuants.map((q) => {
        if (q._id === quant._id) {
          return { ...q, period: quant.period };
        }
        return q;
      })
    );
    console.log("handleUpdate", selectedQuant);
  };

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

  useEffect(() => {
    console.log("selectedQuant", selectedQuant);
  }, [selectedQuant]);

  return (
    <div
      className={
        selectedQuant?._id === quant._id
          ? styles.dataSelected
          : styles.data__record
      }
      onClick={() => setSelectedQuant(quant)}
    >
      <div
        className={
          selectedQuant?._id === quant._id
            ? styles.dataSelected__content
            : styles.data__record__content
        }
      >
        <div className={styles.data__record__left}>
          <label className="data-record-checkbox-container">
            <span className="data-record-checkmark"></span>
          </label>
          <div className={styles.data__record__title}>
            {selectedQuant && selectedQuant?._id === quant._id ? (
              <>
                <Input
                  value={selectedQuant?.name}
                  onChange={(e) =>
                    setSelectedQuant({ ...selectedQuant, name: e.target.value })
                  }
                />
                <Typography>Repeat</Typography>
                <FormControl>
                  <Select
                    className={styles.modal__content__period}
                    value={selectedQuant?.period}
                    onChange={(e) =>
                      handleUpdatePeriod({
                        ...selectedQuant,
                        period: e.target.value,
                      })
                    }
                  >
                    <MenuItem value={"None"}>None</MenuItem>
                    <MenuItem value={"Daily"}>Daily</MenuItem>
                    <MenuItem value={"Two"}>Two Days</MenuItem>
                    <MenuItem value={"Three"}>Three Days</MenuItem>
                    <MenuItem value={"Weekly"}>Weekly</MenuItem>
                    <MenuItem value={"Fortnightly"}>Fortnightly</MenuItem>
                    <MenuItem value={"Monthly"}>Monthly</MenuItem>
                  </Select>
                </FormControl>
                <div className={styles.dataSelected__content__date}>
                <MobileDatePicker
                  label="Date mobile"
                  inputFormat="MM/dd/yyyy"
                  value={selectedQuant.date}
                  className={styles.modal__content__date}
                  onChange={(e) =>
                    handleUpdateDate({
                      ...selectedQuant,
                      date: e ? e : selectedQuant.date,
                    })
                  }
                  renderInput={(params) => <TextField {...params} />}
                  // add style
                  
                />
              </div>
                <div className={styles.modal__content__buttons}>
                  <Button onClick={handleUpdate}>Update</Button>
                  <Button onClick={() => handleComplete(quant)}>
                    Complete
                  </Button>
                  <Button onClick={() => handleDelete(quant)}>Delete</Button>
                </div>
              </>
            ) : (
              <p>{quant.name}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
