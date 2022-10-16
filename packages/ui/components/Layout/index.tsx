// components/layout.js
import {Header} from '../Header/index';

import styles from './Layout.module.scss';

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className={styles.layout}>
			<Header/>
      <main>{children}</main>
    </div>
  )
}
