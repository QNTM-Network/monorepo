import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { get, find, map } from "lodash";
import { v4 as uuid } from 'uuid'
import Lit from '../api/lit/litClient'

import { getContract } from '../../configureWarpClient';
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
  const [posts, setPosts] = useState([])
  const [blob, setBlob] = useState(null)
  const [quantsByTags, setQuantsByTags] = useState<IQuantsByTags>();
  const [displayQuants, setDisplayQuants] = useState<IQuant[]>([]);
  const [filter, setFilter] = useState("Tasks");
  const [tags, setTags] = useState([]);
 const [selectedQuant, setSelectedQuant] = useState<IQuant | null>(null);

  const connectToLit = async () => {

  const connect =  await Lit.connect()
    console.log({connect})

    const encrypt = await Lit.encrypt("Hi DArinz")
    console.log({encrypt})

    const decrypt = await Lit.decrypt(encrypt.encryptedString, encrypt.encryptedSymmetricKey)
    console.log({decrypt})

  }


  useEffect(() => {
    readState()
  connectToLit()
  }, [])
  async function readState() {
    const contract = await getContract()
    try {
      const data = await contract.readState()
      const posts = Object.values(data.cachedValue.state!.quants)
      console.log('posts: ', posts)
      let decryptedPosts = []
      try {
      decryptedPosts = await Promise.all(posts.map(async (post, index) => {
        if (index == 38) {
        console.log({post})
          // new blob of size 32 and type application/octet-stream
          const encryptedBlob = await (
    await fetch(post.title.encryptedString)
  ).blob();
          
        console.log('encryptedBlob', encryptedBlob, 'post.title.encryptedSymetricKey', post.title.encryptedSymmetricKey)
        const decryptedPost = await Lit.decrypt(encryptedBlob, post.title.encryptedSymmetricKey)
        console.log({decryptedPost})
        return {...post, title: decryptedPost}
          
      }}))
      } catch (error) {
        console.log('error: ', error)
      }
      setPosts(decryptedPosts)
      console.log('decryptedPosts: ', decryptedPosts)
    } catch (err) {
      console.log('error: ', err)
    }
  }


  async function createArweaveQuant() {
    await Lit.connect()
    const title = await Lit.encrypt('test')
    const encryptedSymmetricKey = title.encryptedSymmetricKey
    const encryptedString = title.encryptedString
    const titleToSend = await Lit.blobToBase64(encryptedString)
    setBlob(encryptedString)
    const reader = new FileReader()
    const jsonEncryptedString = await encryptedString.text()
    console.log({jsonEncryptedString, encryptedSymmetricKey, encryptedString, titleToSend})
    const quant = {
      title: { encryptedString: titleToSend, encryptedSymmetricKey },
      id: uuid(),
    }
    const contract = await getContract()
    try {
      const result = await contract.writeInteraction({
        function: "createQuant",
        quant,
      })
      console.log('result:', result)
    } catch (err) {
      console.log('error:', err)
    }
  }

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
    createArweaveQuant()
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
      
      console.log("quants", quants);
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
        createQuant={createArweaveQuant}
        input={input}
        setInput={setInput}
      />
      <Tags setFilter={setFilter} tags={tags} />
      <div>
        {map(displayQuants, (quant: IQuant, key: number) => {
          return (
            <div key={key}>
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
