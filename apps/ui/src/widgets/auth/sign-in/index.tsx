import { ForgotPasswordForm, LoginForm, SignupForm } from '@app/entities/auth';
import { Tabs, TabsProps } from 'antd';

export const SignIn = () => {
  const authActions: TabsProps['items'] = [
    {
      key: 'sign-up',
      label: 'Create An Account',
      children: <SignupForm />,
    },
    {
      key: 'log-in',
      label: 'Log In',
      children: <LoginForm />,
    },
    {
      key: 'forgot-password',
      label: 'Forgot password',
      children: <ForgotPasswordForm />,
    },
  ];

  return (
    <Tabs
      centered
      items={authActions}
      defaultActiveKey='log-in'
      className='w-[95%] sm:w-[63%] md:w-[53%] lg:w-[52%] xl:w-[39%] 2xl:w-[30%]'
    />
  );
};
