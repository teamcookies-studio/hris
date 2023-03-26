
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import employeeService from '../../../../services/employee/employee.service';
import timeoffService from '../../../../services/timeoff/timeoff.service';
import TimeoffTypesForm from "./TimeoffTypesForm";

export default function TimeoffTypesEditForm(){
  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [type, setType] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const { id } = router.query as { id: string | null };

  const fetchTimeoffTypesByClientId = useCallback(async () => {
    if (!user) return;

    try {
      setIsFetching(true);
      const response = await timeoffService.findTimeoffTypeById(supabase, { id });
      console.log('response12', response)
      setType(response);
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsFetching(false);
    }
  }, [supabase, user, id]);

  useEffect(() => {
    fetchTimeoffTypesByClientId();
  }, [fetchTimeoffTypesByClientId]);

  const handleUpdate = (id) => {
    console.log('updated id '+ id);
    // Supabase goes here;
    router.push('/admin/timeoff/types');
  }

  return <TimeoffTypesForm id={id} type={type} handleUpdate={handleUpdate} />
}
