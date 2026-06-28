import { Input } from "@/components/ui/input";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <Input
      placeholder="Search projects..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
