import baseTheme from "../../Components/Theme/baseTheme";

const UserIcon: React.FunctionComponent<{
  className?: string;
  width?: string;
  height?: string;
  color?: string;
}> = ({
  className = "",
  width = "16",
  height = "19",
  color = baseTheme.colors.black,
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 16 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="1"
      d="M9.5625 10.9375H6.1875C2.74219 10.9375 0 13.7148 0 17.125C0 17.7578 0.492188 18.25 1.125 18.25H14.625C15.2227 18.25 15.75 17.7578 15.75 17.125C15.75 13.7148 12.9727 10.9375 9.5625 10.9375ZM1.6875 16.5625C1.96875 14.3477 3.86719 12.625 6.1875 12.625H9.5625C11.8477 12.625 13.7461 14.3477 14.0273 16.5625H1.6875ZM7.875 9.25C10.3359 9.25 12.375 7.24609 12.375 4.75C12.375 2.28906 10.3359 0.25 7.875 0.25C5.37891 0.25 3.375 2.28906 3.375 4.75C3.375 7.24609 5.37891 9.25 7.875 9.25ZM7.875 1.9375C9.42188 1.9375 10.6875 3.20312 10.6875 4.75C10.6875 6.33203 9.42188 7.5625 7.875 7.5625C6.29297 7.5625 5.0625 6.33203 5.0625 4.75C5.0625 3.20312 6.29297 1.9375 7.875 1.9375Z"
      fill={color}
    />
  </svg>
);

export default UserIcon;
