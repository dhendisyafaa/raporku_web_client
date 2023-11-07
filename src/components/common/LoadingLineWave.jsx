import { LineWave } from "react-loader-spinner";

const LoadingLineWave = () => {
  return (
    <div>
      <LineWave
        height="80"
        width="80"
        color="#fff"
        ariaLabel="line-wave"
        wrapperStyle={{ padding: 0, margin: 0 }}
      />
    </div>
  );
};

export default LoadingLineWave;
