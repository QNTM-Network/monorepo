// bottom navigation
import React , { useContext , useState}from 'react';

export const Footer = () => {

	const [page, setPage ] = useState('')
	
	return (
		<footer className="footer">
			<div onClick={() => setPage('earnings')}className="footer-button">

				<img className="footer-icon" id="logo" width="20px" height="20px" src="../public/home-default.svg" alt="Home"></img>
			<p>Home</p>
			</div>


			<div onClick={() => setPage('my data')}className="footer-button">
				<img className="footer-icon" id="logo" width="20px" height="20px" src="public/my-data-default.svg" alt="My Data"></img>
			<p>My Data</p>
			</div>


			<div onClick={() => setPage('rewards')}className="footer-button">
				<img className="footer-icon" id="logo" width="20px" height="20px" src="public/rewards-default.svg" alt="Rewards"></img>
			<p>Rewards</p>
			</div>
			

			<div onClick={() => setPage('settings')}className="footer-button">
				<img className="footer-icon" id="logo" width="20px" height="20px" src="public/settings-default.svg" alt="Settings"></img>
			<p>Settings</p>
			</div>
		</footer>
	);
}
