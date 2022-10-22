import { Tag } from "./Tag/index";

interface Props {
  setFilter: (tag: string) => void;
  tags: string[];
}

import styles from "./QuantsByTags.module.scss";

export const Tags = ({ tags, setFilter}: Props) => {

  return (
    <div className={styles.tags}>
      {tags?.map((tag) => (
        <Tag tag={tag} setFilter={setFilter} />
      ))}
    </div>
  );
};
