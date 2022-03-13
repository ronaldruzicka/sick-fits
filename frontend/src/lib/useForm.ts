import { ChangeEvent, useState } from 'react';

export const useForm = <Values extends Record<string, unknown>>(defaultValues: Values) => {
  const [values, setValues] = useState<Values>(defaultValues);

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
      console.log('values', values);
      console.log('files', files);
      console.log('files[0]', files?.[0]);
      console.log('name', name);
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
