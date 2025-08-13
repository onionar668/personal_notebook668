import {  useState } from "react";
import Button from "../Button/Button";
import SelectUser from "../SelectUser/SelectUser";
import Logo from "../Logo/Logo";

const logos = ["𝑷𝑬𝑹𝑺𝑶𝑵𝑨𝑳 𝑵𝑶𝑻𝑬𝑩𝑶𝑶𝑲", "Vite App"];
function Header() {
  const [logoIndex, setLogoIndex] = useState(0);

  const toggleLogo = () => {
    setLogoIndex((state) => Number(!state));
  };

  return (
    <>
      <Logo image={logos[logoIndex]} />
      <SelectUser />
      <Button onClick={toggleLogo}>Change logo</Button>
    </>
  );
}
export default Header;
