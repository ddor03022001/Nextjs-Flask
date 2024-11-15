import Image from "next/image";
import HeaderPage from "./homePage/header-page";
import BodyOnePage from "./homePage/body-one-page";
import BodyTwoPage from "./homePage/body-two-page";

export default function Home() {
  return (
    <>
      <HeaderPage />
      <BodyOnePage />
    </>
  );
}