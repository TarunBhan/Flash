const DeleteIcon: React.FunctionComponent<{
  className?: string;
  width?: string;
  height?: string;
  color?: string;
  fill?: string;
}> = ({ width = "18", height = "20", fill = "#FF4F44" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 8V15M7 8L7 15M1 4H17M15 4V15.8C15 16.9201 15.0002 17.4802 14.7822 17.908C14.5905 18.2844 14.2841 18.5902 13.9078 18.782C13.48 19 12.9203 19 11.8002 19H6.2002C5.08009 19 4.51962 19 4.0918 18.782C3.71547 18.5902 3.40973 18.2844 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V4H15ZM13 4H5C5 3.06812 5 2.60216 5.15224 2.23462C5.35523 1.74456 5.74432 1.35523 6.23438 1.15224C6.60192 1 7.06812 1 8 1H10C10.9319 1 11.3978 1 11.7654 1.15224C12.2554 1.35523 12.6447 1.74456 12.8477 2.23462C12.9999 2.60216 13 3.06812 13 4Z"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default DeleteIcon;
