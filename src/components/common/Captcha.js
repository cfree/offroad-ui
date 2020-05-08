import React, { useCallback } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Captcha = ({ onChange }) => {
  const handleCaptchaChange = useCallback(() => {
    onChange(true);
  }, [onChange]);

  const handleCaptchaExpire = useCallback(() => {
    onChange(false);
  }, [onChange]);

  // const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY;
  const recaptchaSiteKey = '6LcEi_MUAAAAAAuJpRWbPCpZawwGIKRdFyKwU6QM';

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
