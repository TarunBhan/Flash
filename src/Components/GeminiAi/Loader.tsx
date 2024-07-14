import { Text } from "../../Styles/index.styles";
import { ShimmerExample, Shimmer } from "./index.style";

const Loader = () => {
  return (
    <ShimmerExample>
      {[1, 2, 3, 4].map(() => (
        <Shimmer />
      ))}
    </ShimmerExample>
  );
};

export default Loader;
