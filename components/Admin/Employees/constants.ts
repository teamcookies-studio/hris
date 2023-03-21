import { EMPLOYEE_NAME, GENDER, JOIN_DATE, OCCUPATION, PHONE } from "../../../utils/constants"

export const MOCK_THEAD = [
  {
    name: 'timeoff_type_lists',
    label: 'Timeoff Type Lists',
    value: '',
  },
  {
    name: 'timeoff_type_status',
    label: 'Timeoff Type Status',
    value: '',
  },
]
export const MOCK_TBODY = [
  {
    id: 1231,
    timeoff_type_lists: 'Cuti Lahiran',
    timeoff_type_status: 'Pending',
  },
  {
    id: 4352,
    timeoff_type_lists: 'Cuti Umroh',
    timeoff_type_status: 'In Review',
  },
]


export const EMPLOYEE_TABLE_HEADER = [
  {
    name: 'name',
    label: EMPLOYEE_NAME,
    value: '',
  },
  {
    name: 'join_date',
    label: JOIN_DATE,
    value: '',
  },
  {
    name: 'gender',
    label: GENDER,
    value: '',
  },
  {
    name: 'occupation',
    label: OCCUPATION,
    value: '',
  },
  {
    name: 'phone',
    label: PHONE,
    value: '',
  },
]