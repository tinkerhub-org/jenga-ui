/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderFormData } from 'components/utils';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { wizardStepOneFormFields } from './formFields';

const WizardStepOne: React.FC = () => {
    const { register, control } = useFormContext();
    return (
        <>
            {wizardStepOneFormFields.map((el, index) =>
                renderFormData(el, index, register, control)
            )}
        </>
    );
};

export default WizardStepOne;