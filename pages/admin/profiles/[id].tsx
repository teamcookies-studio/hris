import React from 'react';
import ProfileUpdate from '../../../components/Admin/Profile/ProfileUpdate';
import Admin from "../../../layouts/Admin";

export default function UpdateProfile() {
  return (
    <div className="flex flex-wrap">
      <div className="w-full w-12/12 px-4">
        <ProfileUpdate />
      </div>
    </div>
  )
}

UpdateProfile.layout = Admin
