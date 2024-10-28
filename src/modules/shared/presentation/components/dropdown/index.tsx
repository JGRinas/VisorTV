import { IUserProfileDTO } from "~/modules/auth/domain/dtos/request";
import { FC } from "react";
import "./styles.css";

export const Dropdown = ({
  profile,
  dropdownVisible,
  handleNavigation,
  handleLogout,
}: {
  profile: IUserProfileDTO;
  dropdownVisible: boolean;
  handleNavigation: (path: string) => void;
  handleLogout: () => void;
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
            label="Nueva pantalla"
            onClick={() => handleNavigation("/dashboard/screen-builder")}
          />
          <DropdownItem
            label="Ver Pantallas"
            onClick={() => handleNavigation("/dashboard/screens")}
          />
          <DropdownItem label="Cerrar sesión" onClick={handleLogout} />
        </>
      )}
      {profile.role === "operator" && (
        <>
          <DropdownItem
            label="Ver Pantallas"
            onClick={() => handleNavigation("/dashboard/screens")}
          />
          <DropdownItem label="Cerrar sesión" onClick={handleLogout} />
        </>
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
