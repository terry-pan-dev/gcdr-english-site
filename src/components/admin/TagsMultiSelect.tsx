"use client";

import * as React from "react";
import { Check, ChevronDown, Plus, X } from "lucide-react";
import { cn } from "@/components/ui/utils";

interface TagsMultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  existingTags: string[];
  placeholder?: string;
  className?: string;
}

export function TagsMultiSelect({
  value = [],
  onChange,
  existingTags,
  placeholder = "Add tags...",
  className,
}: TagsMultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Filter tags based on input and exclude already selected
  const filteredTags = React.useMemo(() => {
    const available = existingTags.filter((tag) => !value.includes(tag));
    if (!inputValue.trim()) return available;
    return available.filter((tag) => tag.toLowerCase().includes(inputValue.toLowerCase()));
  }, [existingTags, inputValue, value]);

  // Check if input matches any existing tag exactly (case-insensitive)
  const exactMatch = existingTags.find(
    (tag) => tag.toLowerCase() === inputValue.trim().toLowerCase()
  );

  // Check if input is already selected
  const alreadySelected = value.find(
    (tag) => tag.toLowerCase() === inputValue.trim().toLowerCase()
  );

  // Show "create new" option if there's input, no exact match, and not already selected
  const showCreateOption = inputValue.trim() && !exactMatch && !alreadySelected;

  // Handle clicking outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setInputValue("");
      inputRef.current?.blur();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (trimmed && !alreadySelected) {
        // Add new tag or existing tag
        if (!value.includes(trimmed)) {
          onChange([...value, trimmed]);
        }
        setInputValue("");
      }
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      // Remove last tag when backspace on empty input
      onChange(value.slice(0, -1));
    } else if (e.key === "ArrowDown" && !isOpen) {
      setIsOpen(true);
    }
  };

  const handleAddTag = (tag: string) => {
    if (!value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInputValue("");
    inputRef.current?.focus();
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
    inputRef.current?.focus();
  };

  const handleCreateNew = () => {
    const newTag = inputValue.trim();
    if (newTag && !value.includes(newTag)) {
      onChange([...value, newTag]);
      setInputValue("");
      inputRef.current?.focus();
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
      {/* Input container with tags */}
      <div
        className="flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border-2 border-slate-300 bg-white px-2 py-1.5 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 focus-within:shadow-md"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Selected tags as badges */}
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-700"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveTag(tag);
              }}
              className="ml-0.5 rounded-full p-0.5 hover:bg-slate-200 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}

        {/* Input field */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleInputKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[80px] bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />

        {/* Dropdown toggle button */}
        <button
          type="button"
          onClick={toggleDropdown}
          className="flex-shrink-0 p-0.5 text-slate-400 hover:text-slate-600 transition-colors"
          tabIndex={-1}
        >
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </button>
      </div>

      {/* Dropdown list */}
      {isOpen && (filteredTags.length > 0 || showCreateOption) && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg">
          <ul className="max-h-48 overflow-auto py-1">
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
                {filteredTags.length > 0 && (
                  <li className="px-2 py-1.5 text-xs font-medium text-slate-500 border-t border-slate-100 mt-1 pt-2">
                    Available tags
                  </li>
                )}
              </>
            )}

            {/* Tags list header (only if not showing create option) */}
            {!showCreateOption && filteredTags.length > 0 && (
              <li className="px-2 py-1.5 text-xs font-medium text-slate-500">Available tags</li>
            )}

            {/* Tag options */}
            {filteredTags.map((tag) => (
              <li key={tag}>
                <button
                  type="button"
                  onClick={() => handleAddTag(tag)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100 transition-colors text-left"
                >
                  <Check className="h-4 w-4 opacity-0" />
                  <span>{tag}</span>
                </button>
              </li>
            ))}

            {/* Empty state when all tags selected */}
            {filteredTags.length === 0 && !showCreateOption && (
              <li className="px-3 py-2 text-sm text-slate-500 text-center">
                {inputValue ? "No matching tags" : "All tags selected or type to create new"}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
