import { ColorRing } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <ColorRing
        visible={true}
        height="30"
        width="30"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]}
      />
    </div>
  );
};
export default Loading;
