import React from 'react';
import { useForm } from 'react-hook-form';
import ToastBox from '../../components/ToastBox';
import './form.scss';
import { AuthContext } from '../../store/AuthProvider';

const SignIn = (props: any) => {
  const [error, setError] = React.useState();
  const [show, setShow] = React.useState(false);
  const { handleSubmit, register, errors } = useForm();
  const { dispatch } = React.useContext(AuthContext);

  const onSubmit = (form: any) => {
    fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error);
          });
        }
      })
      .then((data) => {
        const { user, email, token } = data;
        setShow(true);
        dispatch({
          type: 'LOGIN',
          payload: {
            user,
            email,
            token,
          },
        });
        props.onHide();
      })
      .catch((err) => {
        setError(err.message);
        console.error('Error:', err.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="error action-error">{error}</div>

        <div className="form-row">
          <input
            placeholder="邮箱"
            name="email"
            ref={register({
              required: 'Required.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address.',
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
              required: 'Required.',
            })}
          />
          <div className="error">
            {errors.password && errors.password.message}
          </div>
        </div>

        <button type="submit">登录</button>
      </form>

      <ToastBox
        show={show}
        setShow={setShow}
        message="Signed in successfully!"
        type="success"
      ></ToastBox>
    </div>
  );
};

export default SignIn;
