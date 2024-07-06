import React, { FC, HTMLInputTypeAttribute } from "react";
import baseTheme from "../Theme/baseTheme";
const Input: FC<{
  headingText: string;
  type: HTMLInputTypeAttribute;
  autoFocus?: boolean;
  placeHolder: string;
  props: any;
  style?: React.CSSProperties | undefined;
}> = ({ headingText, type, autoFocus = false, placeHolder, props, style }) => {
  console.log(props, "index");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "70%",
        ...style,
      }}
    >
      <text
        style={{
          fontSize: baseTheme.fontSizes[0],
          fontFamily: baseTheme.fonts.secondary,
          color: baseTheme.colors.lightGray,
          paddingLeft: "2px",
          paddingBottom: "4px",
        }}
      >
        {headingText}
      </text>
      <input
        autoFocus={autoFocus}
        placeholder={placeHolder}
        style={{
          height: "30px",
          width: "100%",
          borderColor: "transparent",
          background: "#ededed",
          borderRadius: "10px",
        }}
        type={type}
        {...props}
      />
    </div>
  );
};
export default Input;
