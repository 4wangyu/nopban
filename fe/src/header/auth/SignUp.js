import React from "react";
import { useForm } from "react-hook-form";
import "./form.css";

const SignUp = () => {
  const [error, setError] = React.useState();
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (form) => {
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response);
          throw new Error(response);
        }
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        setError(error);
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="error action-error">{error}</div>

      <div className="form-row">
        <input
          placeholder="用户名"
          name="username"
          ref={register({
            required: "Required.",
          })}
        />
        <div className="error">
          {errors.username && errors.username.message}
        </div>
      </div>

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

      <button type="submit">注册</button>
    </form>
  );
};

export default SignUp;
