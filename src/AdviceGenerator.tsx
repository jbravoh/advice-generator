import { useEffect, useState } from "react";
import dice from "./images/icon-dice.svg";
import desktopDivider from "./images/pattern-divider-desktop.svg";
import mobileDivider from "./images/pattern-divider-mobile.svg";

export type AdviceModel = {
  slip: {
    id: number;
    advice: string;
  };
};

const AdviceGenerator = () => {
  const [advice, setAdvice] = useState<AdviceModel | null>(null);

  useEffect(() => {
    getAdvice();
  }, []);

  const getAdvice = () => {
    const url = "https://api.adviceslip.com/advice";

    fetch(url)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return response.json();
      })
      .then((data) => setAdvice(data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="container">
        <h1 className="advice-number">ADVICE #{advice?.slip.id}</h1>
        <p className="advice">"{advice?.slip.advice}"</p>
        <img className="desktop-divider" src={desktopDivider} alt="" />
        <img className="mobile-divider" src={mobileDivider} alt="" />


        <div className="dice-container flex-column-2">
          <img className="dice" src={dice} alt="" onClick={() => getAdvice()} />
        </div>
      </div>
    </>
  );
};

export default AdviceGenerator;
