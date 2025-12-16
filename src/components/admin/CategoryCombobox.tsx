"use client";

import * as React from "react";
import { Check, ChevronDown, Plus } from "lucide-react";
import { cn } from "@/components/ui/utils";

interface CategoryComboboxProps {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
  placeholder?: string;
  className?: string;
}

export function CategoryCombobox({
  value,
  onChange,
  categories,
  placeholder = "Select or type a category",
  className,
}: CategoryComboboxProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Sync inputValue with value prop when it changes externally
  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Filter categories based on input
  const filteredCategories = React.useMemo(() => {
    if (!inputValue.trim()) return categories;
    return categories.filter((category) =>
      category.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [categories, inputValue]);

  // Check if input matches any existing category exactly (case-insensitive)
  const exactMatch = categories.find(
    (category) => category.toLowerCase() === inputValue.trim().toLowerCase()
  );

  // Show "create new" option if there's input and no exact match
  const showCreateOption = inputValue.trim() && !exactMatch;

  // Handle clicking outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // If input is empty or matches nothing, revert to current value
        if (!inputValue.trim()) {
          setInputValue(value);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputValue, value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue); // Update parent immediately as user types
    if (!isOpen) setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim()) {
        onChange(inputValue.trim());
        setIsOpen(false);
        inputRef.current?.blur();
      }
    } else if (e.key === "ArrowDown" && !isOpen) {
      setIsOpen(true);
    }
  };

  const handleSelectCategory = (category: string) => {
    setInputValue(category);
    onChange(category);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleCreateNew = () => {
    const newCategory = inputValue.trim();
    if (newCategory) {
      onChange(newCategory);
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
    if (!isOpen) {
      inputRef.current?.focus();
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Input with dropdown button */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
          className="flex h-9 w-full rounded-md border-2 border-slate-300 bg-white px-3 py-1 pr-10 text-sm shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          type="button"
          onClick={toggleDropdown}
          className="absolute right-0 top-0 h-full px-2 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          tabIndex={-1}
        >
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </button>
      </div>

      {/* Dropdown list */}
      {isOpen && (filteredCategories.length > 0 || showCreateOption) && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg">
          <ul className="max-h-60 overflow-auto py-1">
            {/* Create new option */}
            {showCreateOption && (
              <>
                <li className="px-2 py-1.5 text-xs font-medium text-slate-500">Create new</li>
                <li>
                  <button
                    type="button"
                    onClick={handleCreateNew}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100 transition-colors text-left"
                  >
                    <Plus className="h-4 w-4 text-slate-500" />
                    <span>
                      Create "<span className="font-medium">{inputValue.trim()}</span>"
                    </span>
                  </button>
                </li>
                {filteredCategories.length > 0 && (
                  <li className="px-2 py-1.5 text-xs font-medium text-slate-500 border-t border-slate-100 mt-1 pt-2">
                    Existing categories
                  </li>
                )}
              </>
            )}

            {/* Categories list header (only if not showing create option) */}
            {!showCreateOption && filteredCategories.length > 0 && (
              <li className="px-2 py-1.5 text-xs font-medium text-slate-500">Categories</li>
            )}

            {/* Category options */}
            {filteredCategories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => handleSelectCategory(category)}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100 transition-colors text-left",
                    value === category && "bg-slate-50"
                  )}
                >
                  <Check
                    className={cn(
                      "h-4 w-4",
                      value === category ? "text-primary opacity-100" : "opacity-0"
                    )}
                  />
                  <span>{category}</span>
                </button>
              </li>
            ))}

            {/* Empty state */}
            {filteredCategories.length === 0 && !showCreateOption && (
              <li className="px-3 py-2 text-sm text-slate-500 text-center">No categories found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
