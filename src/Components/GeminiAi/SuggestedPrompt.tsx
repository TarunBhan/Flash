import React from "react";
import "./SuggestedPrompt.css";
import { promptArray } from "../constant /constant";

const SuggestedPrompt: React.FunctionComponent<{
  callBack: (text: string) => void;
}> = ({ callBack }) => {
  return (
    <div className="suggested-prompt">
      <button
        className="suggestion-button"
        onClick={() => callBack(promptArray[0])}
      >
        Home Expenses
      </button>
      <button
        className="suggestion-button"
        onClick={() => callBack(promptArray[1])}
      >
        Grocery Costs
      </button>
      <button
        className="suggestion-button"
        onClick={() => callBack(promptArray[2])}
      >
        Electricity Bills
      </button>
    </div>
  );
};

export default SuggestedPrompt;
