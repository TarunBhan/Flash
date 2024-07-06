const SignoutIcon: React.FunctionComponent<{
  className?: string;
  width?: string;
  height?: string;
  fill?: string;
}> = ({ className = "", width = "24", height = "24", fill = "#CD413A" }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.5992 14.4L13.9992 12M13.9992 12L11.5992 9.59999M13.9992 12L5.19922 12M9.19922 16C9.19922 16.7455 9.19922 17.1183 9.32101 17.4123C9.4834 17.8043 9.79467 18.1158 10.1867 18.2782C10.4808 18.4 10.8537 18.4 11.5992 18.4H15.4392C16.3353 18.4 16.7832 18.4 17.1254 18.2256C17.4265 18.0722 17.6716 17.8275 17.825 17.5264C17.9994 17.1842 17.9992 16.736 17.9992 15.84V8.15995C17.9992 7.26387 17.9994 6.81588 17.825 6.47362C17.6716 6.17256 17.4265 5.92778 17.1254 5.77438C16.7832 5.59999 16.3353 5.59999 15.4392 5.59999H11.5992C10.8537 5.59999 10.4808 5.59999 10.1867 5.72178C9.79467 5.88417 9.4834 6.19564 9.32101 6.58769C9.19922 6.88172 9.19922 7.25447 9.19922 7.99998"
      stroke={fill}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SignoutIcon;
