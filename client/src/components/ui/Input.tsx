import { ChangeEvent, FC } from 'react';

type Props = {
  type: string;
  name: string;
  placeholder: string;
  margin?: string;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const Input: FC<Props> = ({
  type,
  name,
  placeholder,
  margin,
  onChangeHandler,
  value,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      autoComplete='off'
      className={`input input-bordered input-lg w-full focus:border-primary ${margin} focus:ring-primary bg-inherit hover:bg-sec`}
      onChange={onChangeHandler}
      value={value}
    />
  );
};

export default Input;
