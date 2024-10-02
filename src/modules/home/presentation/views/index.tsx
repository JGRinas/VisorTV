import { Header } from "~/modules/shared/presentation/components/header";
import { LeftColumn } from "~/modules/shared/presentation/components/left-column";
import "./styles.css";

export const Home = () => {
  return (
    <>
      <Header />
      <main className="mainContainer">
        <LeftColumn />
      </main>
    </>
  );
};
