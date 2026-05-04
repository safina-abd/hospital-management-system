import React from 'react';
import { FaFilter } from 'react-icons/fa';

const DoctorFilter = ({ specializations, selected, onChange }) => {
  return (
    <div className="flex items-center gap-3">
      <FaFilter className="text-gray-400" />
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="form-input py-2 px-3 w-auto min-w-[180px]"
      >
        {specializations.map((spec) => (
          <option key={spec} value={spec}>
            {spec === 'All' ? 'All Specializations' : spec}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DoctorFilter;