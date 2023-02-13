import React from 'react';
import cx from 'classnames';

const MOCK_DROPDOWN_LISTS = [
  { value: 'desc_1', label: 'Description 1'},
  { value: 'desc_2', label: 'Description 2'},
  { value: 'desc_3', label: 'Description 3'},
];

const MOCK_DROPDOWN_VALUE = 'desc_1';

interface DropdownProps {
  options: any;
  value: string | number;
  handleChange?: (e: any) => any;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options = MOCK_DROPDOWN_LISTS,
  value = MOCK_DROPDOWN_VALUE,
  handleChange,
  className,
}) => {
  return (
    <select
      value={value}
      className={cx(className, 'shadow border-0 p-2.5 text-gray-500 bg-white rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600')}
      style={{ height: '-webkit-fill-available' }}
      onChange={handleChange}
    >
      {options.map(data => (
        <option value={data.value}>{data.label}</option>
      ))}
    </select>
  )
}

export default Dropdown