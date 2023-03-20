import React from 'react';
import Admin from "../../../layouts/Admin";

import ProfileView from '../../../components/Admin/Profile/ProfileView';

export default function ProfilPage() {

  return (
    <div className="flex flex-wrap">
      <div className="w-full w-12/12 px-4">
        <ProfileView />
      </div>
    </div>
  )
}

ProfilPage.layout = Admin