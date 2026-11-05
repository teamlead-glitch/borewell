import { MOBILE_PATTERN } from "@/constants/forms";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value: string;
  onChange: (digits: string) => void;
};

/* +91 prefix and a 10-digit Indian mobile; non-digits are stripped as the visitor types */
export default function PhoneInput({ value, onChange, ...props }: Props) {
  return (
    <div className="flex">
      <span className="grid place-items-center rounded-l-[var(--radius-field)] border-[1.5px] border-r-0 border-line bg-mist px-3 text-[15px] font-semibold">
        +91
      </span>
      <input
        type="tel"
        inputMode="numeric"
        pattern={MOBILE_PATTERN}
        title="10-digit mobile number starting with 6, 7, 8 or 9"
        maxLength={10}
        placeholder="10-digit mobile"
        className="field-input rounded-l-none"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
        {...props}
      />
    </div>
  );
}
