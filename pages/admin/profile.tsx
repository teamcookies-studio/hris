import React from 'react';
import Admin from "../../layouts/Admin";

import FormProfile from '../../components/Admin/Profile/FormProfile';
import ProfileView from '../../components/Admin/Profile/ProfileView';


export default function ProfilPage() {
  const [isEditView, setEditView] = React.useState(false);

  const toggleForm = () => {
    setEditView(prev => !prev);
  }

  return (
    <div className="flex flex-wrap">
      <div className="w-full w-12/12 px-4">
        {isEditView ? (
          <FormProfile handleUpdate={toggleForm} />
        ) : (
          <ProfileView onClick={toggleForm} />
        )}
      </div>
    </div>
  )
}

ProfilPage.layout = Admin