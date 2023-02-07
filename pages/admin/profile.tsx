import React from 'react';
import Admin from "../../layouts/Admin";

import { FormProfile } from "../../components/common/FormProfile";
import { CardProfile } from "../../components/common/CardProfile";

export default function ProfilPage(){
  const [isEditView, setEditView] = React.useState(false);
  // const widthView = isEditView ? 'w-6/12' : 'w-12/12';
  return(
    <div className="flex flex-wrap">
      <div className="w-full w-12/12 px-4">
        {isEditView ? (
          <FormProfile handleUpdate={() => setEditView(prev => !prev)} />
        ) : (
          <CardProfile OnClick={() => setEditView(prev => !prev)} />
        )}
      </div>
      {/* <div className={`w-full lg:${widthView} sm:w-12/12 px-4 lg:block ${isEditView ? 'hidden' : ''}`}>
        <CardProfile OnClick={() => setEditView(prev => !prev)} />
      </div>
      <div className={`w-full lg:${widthView} sm:w-12/12 px-4 lg:block ${!isEditView ? 'hidden' : ''}`}>
        <FormProfile />
      </div> */}
    </div>
  )
}

ProfilPage.layout = Admin