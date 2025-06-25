import { useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";

function DropDown({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
  };

  const renderedOptions = options.map((option) => (
    <div
      key={option.value}
      onClick={() => handleOptionClick(option)}
      className="px-4 py-2 cursor-pointer hover:bg-green transition-colors duration-150 rounded text-white"
    >
      {option.label}
    </div>
  ));

  return (
    <div className="relative w-72 text-white">
      <div
        className="flex items-center justify-between px-4 py-2 border border-white/40 bg-white/30 rounded cursor-pointer hover:border-green-700 transition-all"
        onClick={handleClick}
      >
        {value?.label || 'Select...'}
        <GoChevronDown className="text-white" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-black border border-white/20 rounded shadow-md z-10 max-h-60 overflow-y-auto w-full">
          {renderedOptions}
        </div>
      )}
    </div>
  );
}

export default DropDown;
