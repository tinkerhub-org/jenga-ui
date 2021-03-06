import Link from 'next/link';
import { Button, FadeIn, Paper, TextField } from 'components';
import { useValidateOTP } from './hooks';

const ValidateOTPPage = (): JSX.Element => {
    const {
        register,
        errors,
        handleSubmit,
        validateOTPError,
        isSubmitting,
        otpHiddenState,
        handleRetryOTP,
    } = useValidateOTP();

    return (
        <div className="w-full h-full flex justify-center">
            <FadeIn className="py-10 max-w-sm">
                <div className="px-4 mb-12">
                    <h1>
                        Welcome to <br /> TinkerHub
                    </h1>
                    <p className="text-subtext">
                        We are thrilled to know that you want to join the TinkerHub mission.
                        Let&apos;s get started.
                    </p>
                </div>
                <Paper rounded>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Enter your 4 digit OTP"
                            name="otp"
                            required
                            fullWidth
                            disabled={isSubmitting}
                            error={typeof validateOTPError === 'string' || errors?.otp?.message}
                            helperText={
                                validateOTPError ||
                                errors?.otp?.message ||
                                'Please enter your 10 digit mobile number'
                            }
                            ref={register({
                                required: true,
                                maxLength: {
                                    value: 4,
                                    message: 'OTP code must have length 6',
                                },
                                minLength: {
                                    value: 4,
                                    message: 'Minimum length of an OTP is 6',
                                },
                            })}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            className="mt-4"
                            rounded
                            loading={isSubmitting}
                        >
                            <span className="text-white">Verify Mobile Number</span>
                        </Button>
                    </form>
                </Paper>
                <div className="px-4 mt-2">
                    <Link href="/">
                        <div className="text-blue-500 font-medium cursor-pointer py-2">
                            Edit mobile number →
                        </div>
                    </Link>
                </div>
                <FadeIn className="flex px-4" delay={15}>
                    <div>
                        <Button
                            variant="text"
                            disabled={otpHiddenState.text}
                            color="primary"
                            onClick={() => handleRetryOTP('text')}
                        >
                            Resend OTP
                        </Button>
                    </div>
                    <div className="ml-4">
                        <Button
                            variant="text"
                            disabled={otpHiddenState.voice}
                            color="primary"
                            onClick={() => handleRetryOTP('voice')}
                        >
                            Resend OTP(call)
                        </Button>
                    </div>
                </FadeIn>
            </FadeIn>
        </div>
    );
};

export default ValidateOTPPage;
