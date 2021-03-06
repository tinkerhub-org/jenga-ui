import { Button, FadeIn, Paper, TextField } from 'components';
import { useJoinPage } from './hooks';

const JoinPage = (): JSX.Element => {
    const { register, errors, handleSubmit, sendOTPError, isSubmitting } = useJoinPage();

    return (
        <div className="w-full h-full flex justify-center ">
            <FadeIn className="py-10 max-w-sm" delay={0} attributes={{ immediateRender: true }}>
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
                            label="Mobile Number"
                            name="number"
                            error={typeof sendOTPError === 'string' || errors?.number?.message}
                            helperText={
                                sendOTPError ||
                                errors?.number?.message ||
                                'Please enter your 10 digit mobile number'
                            }
                            required
                            fullWidth
                            ref={register({
                                required: true,
                                maxLength: { value: 10, message: 'Maximum length is 10' },
                                minLength: { value: 10, message: 'Minimum length should be 10' },
                            })}
                            disabled={isSubmitting}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            className="mt-4"
                            rounded
                            loading={isSubmitting}
                        >
                            <span className="text-white">Get OTP</span>
                        </Button>
                    </form>
                </Paper>
            </FadeIn>
        </div>
    );
};

export default JoinPage;
