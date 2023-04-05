import React from 'react'

import Admin from '../../../layouts/Admin';
import ProfileView from '../../../components/Admin/Profile/ProfileView';

export default function ViewEmployeesDetails() {
  return (
    <>
      <ProfileView/>
    </>
  )
}

ViewEmployeesDetails.layout = Admin;
// export default ViewEmployeesDetails;
