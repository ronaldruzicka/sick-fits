import { ChangeEvent, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

export const useForm = <Values extends Record<string, unknown>>(defaultValues: Values) => {
  const [values, setValues] = useState<Values>(defaultValues);

  useDeepCompareEffect(() => {
    setValues(defaultValues);
  }, [defaultValues]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files, name, type, value } = event.target;

    if (type === 'number') {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: Number(value),
      }));

      return;
    }

    if (type === 'file') {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: files?.[0],
      }));

      return;
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setValues(defaultValues);
  };

  const clearForm = () => {
    const blankState = Object.fromEntries(Object.entries(values).map(([key]) => [key, '']));

    setValues(blankState as Values);
  };

  return { values, handleInputChange, resetForm, clearForm };
};
