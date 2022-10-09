// header component
import React , {useEffect,useState , useContext}from 'react';
import { Link } from 'react-router-dom';
import ToggleSwitch from './ToggleSwitch';
import { PageContext, ToggleContext } from "../contexts/pageContext";

const Header = () => {
  const [initialToggle, setInitialToggle] = useState(null)
  const { page, setPage } = useContext(PageContext);


  function handleToggleMessage(toggle) {
    if (toggle) {
      chrome.runtime.sendMessage({ toggle: "toggleOn" });
    } else {
      chrome.runtime.sendMessage({ toggle: "toggleOff" });
    }
  }

  const handleInitialToggle = () => {
    chrome.storage.local.get(["toggle"], (result) => {
      setInitialToggle(result.toggle);
      if (!result.toggle) {
        setPage("stakingOff");
      }
    })}


      handleInitialToggle();

  const handleToggle = async () => {
    chrome.storage.local.get(["toggle"], (result) => {
      if (chrome.runtime.lastError) console.log(chrome.runtime.lastError);
      console.log("toggle first", result.toggle);

      if (result.toggle) {
        console.log("toggle off");
        chrome.storage.local.set({ ["toggle"]: false });
        handleToggleMessage(false);
        setPage("stakingOff");
      } else {
        console.log("toggle on");
        chrome.storage.local.set({ ["toggle"]: true });
        handleToggleMessage(true);
        setPage("earnings");
      }
    });
  };

	return (
		<header className="header">
					<div className="left-header">

						<img id="logo" width="20px" height="20px" src="public/logo.jpg" alt="Ethereal"></img>
						<p>Connected</p>
					</div>
					<div className="right-header">
						<p className="header-staking">Staking: </p>
					<ToggleSwitch page={page} handleToggle={handleToggle} initialToggle={initialToggle} setInitialToggle={setInitialToggle}/>
					
					</div>
		</header>
	);
};

export default Header;
