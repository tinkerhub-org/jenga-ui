import { useState } from 'react';
import { useRouter } from 'next/router';
import { retryOTPAPI, validateOTPAPI } from 'api';
import { useForm, UseFormMethods } from 'react-hook-form';
import { useAuth } from 'context/AuthContext';

type validateOTPFormInput = { otp: string };

type validateOTPFormSubmission = (arg: validateOTPFormInput) => Promise<void>;

type useJoinPageReturn = {
    validateOTPError: string | null;
    handleSubmit: HTMLFormElement['submit'];
    register: UseFormMethods['register'];
    errors: UseFormMethods['errors'];
    isSubmitting: boolean;
    handleRetryOTP: (type: 'voice' | 'text') => Promise<void>;
    otpHiddenState: { voice: boolean; text: boolean };
};

export const useValidateOTP = (): useJoinPageReturn => {
    const [validateOTPError, setvalidateOTPError] = useState(null);
    const [otpHiddenState, setOtpHiddenState] = useState({
        voice: false,
        text: false,
    });
    const { number } = useAuth();
    const router = useRouter();
    const { setSessionData } = useAuth();
    const {
        register,
        errors,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<validateOTPFormInput>();

    const validateOTP: validateOTPFormSubmission = async ({ otp }) => {
        try {
            const { memberShipID, token } = await validateOTPAPI(otp);
            if (memberShipID) {
                setSessionData({ memberShipID, token });
                router.push('/exist');
            } else {
                setSessionData({ verified: true, number, token });
                router.push('/details');
            }
        } catch (error) {
            setvalidateOTPError(error.message);
        }
    };

    const handleRetryOTP = async (type: 'voice' | 'text'): Promise<void> => {
        try {
            await retryOTPAPI(type);
            alert('OTP has been resend');
            setOtpHiddenState((otpHiddenState) => ({ ...otpHiddenState, [type]: true }));
        } catch (error) {
            setvalidateOTPError(error.message);
        }
    };

    return {
        validateOTPError,
        handleSubmit: handleSubmit(validateOTP),
        errors,
        register,
        isSubmitting,
        otpHiddenState,
        handleRetryOTP,
    };
};
