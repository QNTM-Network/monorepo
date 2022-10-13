// header component
import React , {useEffect,useState , useContext}from 'react';
import { Link } from 'react-router-dom';

//@ts-ignore
import styles from './Header.module.scss'

export const Header = () => {



	return (
		<header className={styles.header}>
					<div className="left-header">
      <h1 className={styles.header__title}>Quantmn Web</h1>
					</div>
					<div className="right-header">
					
					</div>
		</header>
	);
};

