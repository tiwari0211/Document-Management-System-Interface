import { useEffect } from "react";
import OtpInput from "react-otp-input";
function OtpTextfeild({ otp, setOtp,onKeyDown,disabled }: any) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onKeyDown(e);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyDown]);
  return (
    <OtpInput
      value={otp}
      shouldAutoFocus
      onChange={setOtp}
     
      numInputs={6}
      containerStyle={{ justifyContent: "space-between" }}
      inputStyle="otp-input" 
      renderSeparator={<span></span>}
      // onKeyDown={onKeyDown}
      renderInput={(props) => <input {...props} disabled={disabled}  />}
      
    />
  );
}

export default OtpTextfeild;
