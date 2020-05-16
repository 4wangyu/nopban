import React from "react";
import { useForm } from "react-hook-form";
import "./form.css";

const SignIn = () => {
  const [error, setError] = React.useState();
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values) => {
    console.log(values);
    if (values.password.length < 4) {
      setError("short password");
    } else {
      setError();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="error action-error">{error}</div>

      <div className="form-row">
        <input
          placeholder="邮箱"
          name="email"
          ref={register({
            required: "Required.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address.",
            },
          })}
        />
        <div className="error">{errors.email && errors.email.message}</div>
      </div>

      <div className="form-row">
        <input
          placeholder="密码"
          name="password"
          ref={register({
            required: "Required.",
          })}
        />
        <div className="error">
          {errors.password && errors.password.message}
        </div>
      </div>

      <button type="submit">登录</button>
    </form>
  );
};

export default SignIn;
