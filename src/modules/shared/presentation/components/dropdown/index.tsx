import { IUserProfileDTO } from "~/modules/auth/domain/dtos/request";
import { FC } from "react";
import "./styles.css";

export const Dropdown = ({
  profile,
  dropdownVisible,
  handleNavigation,
}: {
  profile: IUserProfileDTO;
  dropdownVisible: boolean;
  handleNavigation: (path: string) => void;
}) => {
  if (!profile) return null;

  return (
    <div className={`dropdown ${dropdownVisible ? "visible" : ""}`}>
      {profile.role === "admin" && (
        <>
          <DropdownItem
            label="Ver Usuarios"
            onClick={() => handleNavigation("/dashboard/user-list")}
          />
          <DropdownItem
            label="Ver Pantallas"
            onClick={() => handleNavigation("/screens")}
          />
        </>
      )}
      {profile.role === "operator" && (
        <DropdownItem
          label="Ver Pantallas"
          onClick={() => handleNavigation("/screens")}
        />
      )}
    </div>
  );
};

interface DropdownItemProps {
  label: string;
  onClick: () => void;
}

export const DropdownItem: FC<DropdownItemProps> = ({ label, onClick }) => {
  return (
    <button className="dropdown-item" onClick={onClick}>
      {label}
    </button>
  );
};
