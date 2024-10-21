import { ReactNode } from "react";
import "./styles.css";

interface IText {
  children: ReactNode;
}

export const Text = ({ children }: IText) => {
  return <p className="text">{children}</p>;
};

export const TextGreen = ({ children }: IText) => {
  return <p className="text-green">{children}</p>;
};

export const Title = ({ children }: IText) => {
  return <p className="title">{children}</p>;
};
