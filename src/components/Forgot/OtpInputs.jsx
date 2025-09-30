import React, { useEffect, useRef, useState } from "react";

/**
 * OtpInputs
 * Props:
 * - value: string (current OTP value)
 * - onChange: function(newValue: string)
 * - length: number (default 6)
 */
const OtpInputs = ({ value = "", onChange = () => {}, length = 6 }) => {
  const inputRefs = useRef([]);
  const [digits, setDigits] = useState(() => {
    const v = value || "";
    return v
      .split("")
      .slice(0, length)
      .concat(Array(length).fill(""))
      .slice(0, length);
  });

  useEffect(() => {
    // update internal digits when controlled value changes externally
    const v = value || "";
    setDigits(
      v
        .split("")
        .slice(0, length)
        .concat(Array(length).fill(""))
        .slice(0, length)
    );
  }, [value, length]);

  const emit = (nextDigits) => {
    setDigits([...nextDigits]);
    onChange(nextDigits.join(""));
  };

  const handleChange = (e, idx) => {
    const raw = e.target.value || "";
    const val = raw.replace(/\D/g, "");

    const next = [...digits];
    if (!val) {
      next[idx] = "";
      emit(next);
      return;
    }

    // If user pasted multiple chars into one box
    if (val.length > 1) {
      const chars = val.split("");
      for (let i = 0; i < chars.length && idx + i < length; i++) {
        next[idx + i] = chars[i];
        const ref = inputRefs.current[idx + i];
        if (ref) ref.value = chars[i];
      }
      emit(next);
      const focusIndex = Math.min(length - 1, idx + val.length);
      inputRefs.current[focusIndex]?.focus();
      return;
    }

    // Single char
    next[idx] = val;
    emit(next);
    if (idx < length - 1) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = [...digits];
      if (next[idx]) {
        next[idx] = "";
        emit(next);
        inputRefs.current[idx].value = "";
      } else if (idx > 0) {
        // move to previous and clear
        inputRefs.current[idx - 1]?.focus();
        next[idx - 1] = "";
        inputRefs.current[idx - 1].value = "";
        emit(next);
      }
    }

    if (e.key === "ArrowLeft" && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowRight" && idx < length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text") || "";
    const digitsOnly = paste.replace(/\D/g, "").slice(0, length).split("");
    if (digitsOnly.length === 0) return;

    // Determine start index: focused input or first empty
    const active = document.activeElement;
    let start = inputRefs.current.findIndex((r) => r === active);
    if (start === -1) start = inputRefs.current.findIndex((r) => !r.value) || 0;

    const next = [...digits];
    for (let i = 0; i < digitsOnly.length && start + i < length; i++) {
      next[start + i] = digitsOnly[i];
      if (inputRefs.current[start + i])
        inputRefs.current[start + i].value = digitsOnly[i];
    }
    emit(next);
  };

  return (
    <div className="flex gap-3 justify-center mb-2" onPaste={handlePaste}>
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:border-[#8A1538]"
          ref={(el) => (inputRefs.current[idx] = el)}
          defaultValue={digits[idx] || ""}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
        />
      ))}
    </div>
  );
};

export default OtpInputs;
