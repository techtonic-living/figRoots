import { useState, useRef, useEffect } from "react";

interface EditableInputProps {
  value: string;
  onSave: (value: string) => void;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  type?: "text" | "number";
}

export default function EditableInput({
  value,
  onSave,
  className = "",
  inputClassName = "",
  placeholder = "",
  type = "text",
}: EditableInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editValue !== value) {
      onSave(editValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type={type}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`bg-slate-700 border border-indigo-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputClassName}`}
        placeholder={placeholder}
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer hover:bg-slate-700 rounded px-2 py-1 transition-colors ${className}`}
      title="Click to edit"
    >
      {value || <span className="text-slate-500">{placeholder}</span>}
    </div>
  );
}
