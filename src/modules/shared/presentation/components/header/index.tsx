import { UnneIcon } from "~/assets/icons";
import "./styles.css";
import { useAppDispatch, useAppSelector } from "~/store";
import { Dropdown } from "../dropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "~/modules/auth/infrastructure/user-slice";

export const Header = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  const handleNavigation = (path: string) => {
    setDropdownVisible(false);
    navigate(path);
  };
  const handleLogout = () => {
    setDropdownVisible(false);
    dispatch(logout());
    navigate("/");
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
              handleLogout={handleLogout}
            />
          }
        </div>
      ) : null}
    </header>
  );
};
