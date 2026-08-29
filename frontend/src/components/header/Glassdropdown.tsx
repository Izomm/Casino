import React, { useState, useRef, useEffect } from "react";
import styles from "./scss/Glassdropdown.module.scss";

export interface GlassDropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface GlassDropdownProps {
  label?: string;
  placeholder?: string;
  options: GlassDropdownOption[];
  value: string;
  onChange: (value: string) => void;
}

export const Glassdropdown: React.FC<GlassDropdownProps> = ({
  label,
  placeholder = "Select an option",
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, changeSelectedValue] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);

  // close the panel when clicking anywhere outside this component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  // const selectedOption = options.find((opt) => opt.value === selectedValue.value);

  const handleSelect = (option: GlassDropdownOption) => {
    if (option.disabled) return;
    onChange(option.value);
    changeSelectedValue(option.value);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={[styles.trigger, isOpen && styles.triggerOpen]
          .filter(Boolean)
          .join(" ")}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.triggerLabel}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={[styles.chevron, isOpen && styles.chevronOpen]
            .filter(Boolean)
            .join(" ")}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <ul className={styles.panel} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              aria-disabled={option.disabled}
              className={[
                styles.panelItem,
                option.value === selectedValue && styles.panelItemSelected,
                option.disabled && styles.panelItemDisabled,
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Glassdropdown;
