import { useFormContext } from "react-hook-form";

interface InputFieldProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

export const InputField = ({
  name,
  label,
  type,
  placeholder,
}: InputFieldProps) => {
  const { register } = useFormContext();

  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name)}
      />
    </div>
  );
};
