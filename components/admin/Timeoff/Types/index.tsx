import Link from 'next/link';
import React from 'react';
import { CustomTable } from '../../../common/CustomTable';

import { MOCK_TBODY, MOCK_THEAD } from '../constants';

export default function TimeoffList() {
  return (
    <div>
      <CustomTable
        tableTitle="Timeoff Types"
        tableAction={() => (
          <>
            <Link
              href={"/admin/timeoff/types/creates"}
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Add Timeoff Type
            </Link>
          </>
        )}
        hasOrderNumber
        // actionDropdown,
        thead={MOCK_THEAD}
        tbody={MOCK_TBODY}
      />
    </div>
  );
}
