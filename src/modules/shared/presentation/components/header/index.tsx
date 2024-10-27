import { UnneIcon } from "~/assets/icons";
import "./styles.css";
import { useAppSelector } from "~/store";
import { Dropdown } from "../dropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  const handleNavigation = (path: string) => {
    setDropdownVisible(false);
    navigate(path);
  };

  return (
    <header className="headerContainer">
      <a href="/" className="unneIconLink" aria-label="Go to Home">
        <UnneIcon className="unneIconLink" />
      </a>
      {profile ? (
        <div className="userMenu">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            {profile.name} ({profile.role})
          </button>
          {
            <Dropdown
              dropdownVisible={dropdownVisible}
              handleNavigation={handleNavigation}
              profile={profile}
            />
          }
        </div>
      ) : null}
    </header>
  );
};
