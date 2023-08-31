import { SelectItem } from "@/components/ui/select";

export default function FormSelectItems({
  options,
}: {
  options: { value: string; label: string; disabled?: boolean }[];
}) {
  return (
    <>
      {options.map(({ value, label, disabled }) => (
        <SelectItem disabled={disabled} key={value} value={value}>
          {label}
        </SelectItem>
      ))}
    </>
  );
}
