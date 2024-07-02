import { FC, MouseEventHandler } from "react";
import baseTheme from "../Theme/baseTheme";
import { CustomButton } from "../Budget/Budget.styles";

const Button: FC<{
  buttonText: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  buttonWidth?: string;
  disable?: boolean;
  loading?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  btnHeight?: string;
}> = ({
  onClick,
  buttonText,
  buttonWidth = "70%",
  disable = false,

  loading = false,
  btnHeight = "35px",
  type = "button",
}) => {
  return (
    <CustomButton
      style={{
        height: `${btnHeight}`,
        width: buttonWidth,
        backgroundColor: disable ? "grey" : "",
        color: "white",
        marginTop: "-5px",
        pointerEvents: disable ? "none" : "auto",
      }}
      disabled={disable}
      onClick={(e) => {
        e.preventDefault();
        !disable && onClick(e);
      }}
      type={type}
    >
      {loading ? (
        <div style={{ marginTop: "-20px" }}>
          <img
            src="https://assets.rario.com/RARIO/App/images/button/white_loader-1.gif"
            style={{ height: "70px", width: "70px" }}
          />
        </div>
      ) : (
        buttonText
      )}
    </CustomButton>
  );
};

export default Button;
