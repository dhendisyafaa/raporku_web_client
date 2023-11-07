import { Oval } from "react-loader-spinner";

const LoadingOval = ({ style }) => {
  return (
    <div className={style}>
      <Oval
        height={20}
        width={20}
        color="#fff"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#eaeaea"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default LoadingOval;
