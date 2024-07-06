const RightArrowIcon: React.FunctionComponent<{
  className?: string;
  width?: string;
  height?: string;
  opacity?: number;
  fill?: string;
}> = ({
  className = "",
  width = "25",
  height = "17",
  opacity = 1,
  fill = "white",
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    opacity={opacity}
    viewBox="0 0 21 13"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.0859 12.4766C12.8906 12.3203 12.8125 12.0859 12.8125 11.8125C12.8125 11.5781 12.8906 11.3438 13.0859 11.1875L16.7969 7.4375H0.9375C0.390625 7.4375 0 7.04688 0 6.5C0 5.99219 0.390625 5.5625 0.9375 5.5625H16.7969L13.0859 1.85156C12.6953 1.5 12.6953 0.914062 13.0859 0.5625C13.4375 0.171875 14.0234 0.171875 14.4141 0.5625L19.7266 5.875C20.0781 6.22656 20.0781 6.8125 19.7266 7.16406L14.4141 12.4766C14.0234 12.8672 13.4375 12.8672 13.0859 12.4766Z"
      fill={fill}
    />
  </svg>
);

export default RightArrowIcon;
