import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { get, find, map } from "lodash";

import { setUser } from "../../store/reducers/userSlice";
import { getQuantsByTags } from "../../utils/quantsByTags";
import {
  IUser,
  QuantItem,
  Tags,
  IQuant,
  IQuantsByTags,
  NewQuantSection,
} from "ui";
import findExistingUser from "../../utils/findExistingUser";
import dbConnect from "../../utils/dbConnect";
import Quant from "../../models/Quant";
import { wrapper } from "../../store";

interface Props {
  quants: IQuant[];
  user: IUser;
}

const Web = ({ quants, user}: Props) => {
  const [input, setInput] = useState("");
  const [quantsByTags, setQuantsByTags] = useState<IQuantsByTags>();
  const [displayQuants, setDisplayQuants] = useState<IQuant[]>([]);
  const [filter, setFilter] = useState("Tasks");
  const [tags, setTags] = useState([]);
 const [selectedQuant, setSelectedQuant] = useState<IQuant | null>(null);



  // set the selected quant to none by clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (event.target.className === "modal") {
        setSelectedQuant(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    


  const createQuant = () => {
    axios.post("/api/quant", { name: input, user: user.address }).then(
      (response) => {
        setInput("");
        const newQuant = response.data.data;
        setSelectedQuant(newQuant);
        setDisplayQuants([...displayQuants, newQuant]);
      },
      (err) => {
        console.log(err.text);
      }
    );
  };

  useEffect(() => {
    if (quants) {
      //@ts-ignore
      setQuantsByTags(getQuantsByTags(quants));
    }
  }, [quants]);

  useEffect(() => {
    if (quantsByTags) {
      const quants = get(quantsByTags, filter, []);
      setDisplayQuants(quants);
    }

    const tags = map(quantsByTags, "tag");
    //@ts-ignore
    setTags(tags);
    //@ts-ignore
    setDisplayQuants(find(quantsByTags, (tags) => tags.tag === "ViewAll"));
  }, [quantsByTags]);

  useEffect(() => {
    if (filter) {
      setDisplayQuants(
        (
          //@ts-ignore
          quantsByTags?.find((t: IQuantsByTags) => t.tag === filter) || {
            quants: [],
          }
        ).quants
      );
    }
  }, [filter, quantsByTags]);

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <NewQuantSection
        createQuant={createQuant}
        input={input}
        setInput={setInput}
      />
      <Tags setFilter={setFilter} tags={tags} />
      <div>
        {map(displayQuants, (quant: IQuant, key: number) => {
          return (
            <div style={{ display: "flex", justifyContent: "center"  }}key={key}>
              <QuantItem
                setQuantsByTags={setQuantsByTags}
                displayQuants={displayQuants}
                setDisplayQuants={setDisplayQuants}
                quant={quant}
                quants={quants}
                setSelectedQuant={setSelectedQuant}
                selectedQuant={selectedQuant}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default Web;


export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {

      await dbConnect();

      const userId = get(req, "cookies._id");


      const userResult = await findExistingUser("_id", userId!);
      const user = JSON.parse(JSON.stringify(userResult));
      store.dispatch(setUser(user));

      const result = await Quant.find({ user: user.address, status: {$ne: 0 }}).sort({ createdAt: -1 });
      const quants = JSON.parse(JSON.stringify(result));

      return {
        props: {
          quants,
          user,
        },
      };
    }
);
