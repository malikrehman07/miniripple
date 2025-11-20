import React from "react";

function SelectField({ label, icon, name, value, onChange, options = [] }) {
  return (
    <div className="flex flex-col w-full max-w-full h-auto">
      {label && (
        <label className="self-start py-0.5 text-sm tracking-tight leading-none text-zinc-600 font-['Amble']">
          {label}
        </label>
      )}

      <div className="flex items-center px-3 py-1 mt-2 w-full text-base rounded text-slate-900 border border-gray-200 font-['Jost'] bg-white">
        <div className="flex flex-1 gap-2 items-center w-full">
          {icon && (
            <img
              src={icon}
              alt={`${label} icon`}
              className="object-contain w-5 h-5 shrink-0"
            />
          )}

          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full flex-1 min-w-0 py-3 px-2 bg-slate-50 border-none outline-none focus:ring-0 text-sm sm:text-base"
          >
            <option value="" disabled>
              Select a country
            </option>
            {options.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SelectField;
