import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { CustomTable } from '../../common/CustomTable';
// import FormProfile from '../Profile/FormProfile';
import InviteEmployeeModal from './InviteEmployeeModal';
import { ADD_EMPLOYEE, EMPLOYEE_LISTS, INVITE_EMPLOYEE } from '../../../utils/constants';
import employeeService from '../../../services/employee/employee.service';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { EMPLOYEE_TABLE_HEADER } from './constants';
import { Modals } from '../../Modals';
import Loading from '../../common/Loading/Loading';

export default function ListEmployees() {
  const router = useRouter();

  const [isEditOpen, setEditOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedDeleteData, setSelectedDeleteData] = useState(null)

  const user = useUser();
  const supabase = useSupabaseClient();
  const [employees, setEmployees] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const fetchUsersByClientId = useCallback(async () => {
    if (!user) return;

    try {
      setIsFetching(true);
      const employeeLists = await employeeService.getByUserId(supabase, user.id); 
      const response = await employeeService.findAllByClientId(supabase, employeeLists.client_id);

      setEmployees(response);
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsFetching(false);
    }
  }, [supabase, user]);

  useEffect(() => {
    fetchUsersByClientId();
  }, [fetchUsersByClientId]);

  const handleClose = () => {
    setSelectedDeleteData(null);
  }
  const handleDelete = () => {
    // supabase works here
    setSelectedDeleteData(null);
  }

  if (isFetching) {
    return <Loading isLoading={isFetching} />
  }

  return (
    <div>
      <InviteEmployeeModal showModal={showModal} setShowModal={setShowModal} />
      {!isEditOpen ? (
        <>
          <CustomTable
            tableTitle={EMPLOYEE_LISTS}
            tableAction={() => (
              <>
                <button
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => router.push('/admin/employees/create')}
                >
                  {ADD_EMPLOYEE}
                </button>
                <button
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(prev => !prev)}
                  disabled={true}
                >
                  {INVITE_EMPLOYEE}
                </button>
              </>
            )}
            hasOrderNumber
            thead={EMPLOYEE_TABLE_HEADER}
            tbody={employees}
            handleView={id => router.push(`/admin/employees/${id}`)}
            handleEdit={id => router.push(`/admin/employees/edit/${id}`)}
            handleDelete={id => setSelectedDeleteData(id)}
          />
          {selectedDeleteData && (
            <Modals
              title="Delete Modals"
              description="Are You Sure To Delete This ?"
              handleClose={handleClose}
              handleDelete={handleDelete}
            />
          )}
        </>
      ) : null
      // (
      //   <FormProfile handleUpdate={() => setEditOpen(prev => !prev)} />
      // )
      }
    </div>
  );
}
