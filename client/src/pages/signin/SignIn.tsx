import styles from "./signin.module.scss";
import Image from "../../assets/ethereum_logo.png";
import { SignInForm } from "./SignInForm";

const SignIn = () => {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img src={Image} alt="Ethereum logo" width="80" height="120" />
        </div>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
