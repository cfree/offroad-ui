import React from 'react';

import RegisterForm from '../../components/login/RegisterForm';
import PageLayout from '../../components/layout/PageLayout';

const RegisterPage = () => {
  return (
    <PageLayout>
      <h2>Account Registration</h2>
      <p>
        We use a double opt-in system. Provide your name and email address and
        submit. You’ll receive a confirmation email with a link to complete your
        registration. Once all your information is submitted, our club secretary
        will review your registration and complete the account setup. You will
        receive an email confirming when the process is complete.
      </p>

      <p>
        For more information on the process of becoming a member,{' '}
        <a href="https://4-playersofcolorado.org/membership">
          visit our public site
        </a>
        .
      </p>

      <RegisterForm />
    </PageLayout>
  );
};

export default RegisterPage;
