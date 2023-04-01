
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import timeoffService from '../../../../services/timeoff/timeoff.service';
import TimeoffTypesForm from "./TimeoffTypesForm";

export default function TimeoffTypesEditForm(){
  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [type, setType] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const id = router.query?.id as string;

  const fetchTimeoffTypesByClientId = useCallback(async () => {
    if (!user) return;

    try {
      setIsFetching(true);
      const response: any = await timeoffService.findTimeoffTypeById(supabase, { id });

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

  const handleUpdate = async (id, timeoffType) => {
    try {
      await timeoffService.updateTimeoff(supabase, { id, label: timeoffType });
    
      router.push('/admin/timeoff/types');
    } catch (error) {
      console.log(error);
    }
  }

  if (isFetching) {
    return <div>Loading...</div>
  }

  return <TimeoffTypesForm id={id} type={type} handleUpdate={handleUpdate} />
}
