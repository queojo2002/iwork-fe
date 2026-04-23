import { Form, Input } from 'antd';
import { useIntl } from 'react-intl';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useAuthMethod } from '@crema/hooks/AuthHooks';
import {
  SignInButton,
  StyledRememberMe,
  StyledSign,
  StyledSignContent,
  StyledSignForm,
  StyledSignLink,
  StyledSignLinkTag,
  StyledSignTextGrey,
} from './index.styled';
import { useNavigate } from 'react-router-dom';

const SigninAbp = () => {
  const navigate = useNavigate();
  const { logInWithEmailAndPassword } = useAuthMethod();
  const { messages } = useIntl();

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onGoToForgetPassword = () => {
    navigate('/forget-password');
  };

  return (
    <StyledSign>
      <StyledSignContent>
        <StyledSignForm
          name="abp-signin"
          initialValues={{
            remember: true,
            email: 'admin',
            password: '1q2w3E*',
          }}
          onFinish={(values: any) =>
            logInWithEmailAndPassword({ email: values.email, password: values.password })
          }
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            className="form-field"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input
              id="abp-signin-username"
              placeholder={messages['common.email'] as string}
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            className="form-field"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              id="abp-signin-password"
              placeholder={messages['common.password'] as string}
              autoComplete="current-password"
            />
          </Form.Item>

          <StyledRememberMe>
            <span />
            <StyledSignLink onClick={onGoToForgetPassword}>
              <IntlMessages id="common.forgetPassword" />
            </StyledSignLink>
          </StyledRememberMe>

          <div className="form-btn-field">
            <SignInButton type="primary" htmlType="submit" id="abp-signin-btn">
              <IntlMessages id="common.login" />
            </SignInButton>
          </div>

          <div className="form-field-action">
            <StyledSignTextGrey>
              <IntlMessages id="common.dontHaveAccount" />
            </StyledSignTextGrey>
            <StyledSignLinkTag to="/signup">
              <IntlMessages id="common.signup" />
            </StyledSignLinkTag>
          </div>
        </StyledSignForm>
      </StyledSignContent>
    </StyledSign>
  );
};

export default SigninAbp;
