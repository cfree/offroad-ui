import React, { useCallback } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Captcha = ({ onChange }) => {
  const handleCaptchaChange = useCallback(() => {
    onChange(true);
  }, [onChange]);

  const handleCaptchaExpire = useCallback(() => {
    onChange(false);
  }, [onChange]);

  const recaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

  return (
    <ReCAPTCHA
      sitekey={recaptchaSiteKey}
      onChange={handleCaptchaChange}
      onExpired={handleCaptchaExpire}
      onErrored={handleCaptchaExpire}
    />
  );
};

export default Captcha;
