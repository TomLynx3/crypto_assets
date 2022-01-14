import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { FormItem } from "../../helpers/interfaces/global.interfaces";
import { authStore } from "../../stores/auth.store";

const SignInFormView = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<FormItem>({
    value: "",
    error: "",
  });
  const [password, setPassword] = useState<FormItem>({
    value: "",
    error: "",
  });

  const [isLoading, setLoading] = useState<boolean>(false);

  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    let error: string = "";

    if (value.length === 0) {
      error = "Username is required";
    }

    setUsername({ value, error });
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    let error: string = "";

    if (value.length <= 4) {
      error = "Password to short";
    }

    setPassword({ value, error });
  };

  const handleSubmit = async () => {
    const res = await authStore.signIn(
      username.value.toString(),
      password.value.toString()
    );

    if (res) {
      navigate("../", { replace: true });
    }
  };

  const checkIfFormValid = () => {
    return (
      username.error === "" &&
      password.error === "" &&
      username.value.toString().length > 0 &&
      password.value.toString().length > 5
    );
  };

  return (
    <Fragment>
      {authStore.isLoading ? <Loading /> : null}
      <div className="input-group mb-3">
        <span className="input-group-text">
          <i className="fas fa-user"></i>
        </span>
        <input
          required
          value={username.value}
          onChange={changeUsername}
          type="text"
          className="form-control"
          placeholder="Username"
        />
        <div className="invalid-feedback">Please provide a valid city.</div>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">
          <i className="fas fa-key"></i>
        </span>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password.value}
          onChange={changePassword}
        />
      </div>
      <button
        type="button"
        className="btn bg-btn btn-md btn-block"
        style={{ width: "100%" }}
        disabled={!checkIfFormValid()}
        onClick={handleSubmit}
      >
        Sign In
      </button>
    </Fragment>
  );
};

const SignInForm = SignInFormView;
export { SignInForm };
