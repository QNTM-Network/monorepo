// components/layout.js
import {Header} from '../Header/index';

import styles from './Layout.module.scss';

export function Layout({ children }) {
  return (
    <div className={styles.layout}>
			<Header/>
      <main>{children}</main>
    </div>
  )
}
