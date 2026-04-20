import { Search } from "lucide-react";
import { Input } from "../ui/Input";

export const SearchInput = ({
  placeholder,
  size = "md",
  isLoading = false,
  disabled,
  ...props
}) => {
  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 
                text-gray-400 dark:text-gray-500 w-5 h-5"
      />
      <Input
        variant="secondary"
        size={size}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};
