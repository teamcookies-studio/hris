import React from 'react';
import TableDropdown from '../../Dropdowns/TableDropdown';

interface CustomTableProps {
  tableTitle ?: any,
  tableAction ?: any,
  actionDropdown ?: any,
  thead ?: any,
  tbody ?: any,
  hasOrderNumber ?: any,
  handleView ?: any,
  handleEdit ?: any,
  handleDelete ?: any,
}

const CustomTable: React.FC<CustomTableProps> = ({
  tableTitle,
  tableAction,
  actionDropdown,
  hasOrderNumber,
  thead,
  tbody,
  handleView,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-6 py-6 border-0">
        <div className="text-center flex justify-between">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h3 className="text-left font-semibold text-base text-blueGray-700">
              {tableTitle}
            </h3>
          </div>
          {tableAction?.()}
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              {hasOrderNumber && (
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                  No
                </th>
              )}
              {thead?.map(theadData => (
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                  {theadData.label}
                </th>
              ))}
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center" />
            </tr>
          </thead>
          <tbody>
            {tbody?.map((data, index) => (
              <tr>
                {hasOrderNumber && (
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                    {index + 1}
                  </th>
                )}
                {thead?.map(theadData => (
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                    {data[theadData.name]}
                  </th>
                ))}
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  <TableDropdown id={data.user_id} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
