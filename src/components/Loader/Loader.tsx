import Lottie from "lottie-react";

import styles from "./Loader.module.scss";
import groovyWalkAnimation from "../../assets/loading.json";

const Loager = () => {
  return (
    <div className={styles.loading}>
      <Lottie
        style={{ width: 200, height: 200 }}
        animationData={groovyWalkAnimation}
        loop={true}
      />
    </div>
  );
};

export default Loager;
