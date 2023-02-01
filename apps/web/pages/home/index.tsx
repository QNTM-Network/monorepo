import { useState, useEffect, useCallback } from "react";
import { atom, useAtom, PrimitiveAtom } from "jotai";
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
  quantAtoms: PrimitiveAtom<IQuant>[];
}

type QuantAtom = PrimitiveAtom<IQuant>;


const Web = ({ quants, user, quantAtoms }: Props) => {
  const [input, setInput] = useState("");
  const [quantsByTags, setQuantsByTags] = useState<IQuantsByTags>();
  const [quantsAtom, setQuantsAtom] = useAtom(quantAtoms);
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
        setQuantsAtom([...quantsAtom, newQuant]);
      },
      (err) => {
        console.log(err.text);
      }
    );
  };

  const handleDelete = (quantAtom: QuantAtom) => {
    setQuantsAtom(quantsAtom.filter((q) => q !== quantAtom));

    setSelectedQuant(null);
    axios.delete(`/api/quant/${quantAtom._id}`).then(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(err.text);
      }
    );
  };

  useEffect(() => {
    console.log("quantsAtom", quantsAtom);
  }, [quantsAtom]);

  useEffect(() => {
    if (quants) {
      setQuantsAtom(quants);
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
        //@ts-ignore
        (
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
        {map(quantsAtom, (quantAtom: IQuant) => {
          return (
            <div
              style={{ display: "flex", justifyContent: "center" }}
              key={`${quantAtom}`}
            >
              <QuantItem
                key={quantAtom._id}
                setQuantsByTags={setQuantsByTags}
                displayQuants={displayQuants}
                setDisplayQuants={setDisplayQuants}
                quantAtom={quantAtom}
                quants={quants}
                setSelectedQuant={setSelectedQuant}
                selectedQuant={selectedQuant}
                handleDelete={handleDelete}
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

      const result = await Quant.find({
        user: { $regex: user.address, $options: "i" },
        status: { $ne: 0 },
      }).sort({ createdAt: -1 });
      const quants = JSON.parse(JSON.stringify(result));

      return {
        props: {
          quants,
          user,
        },
      };
    }
);
