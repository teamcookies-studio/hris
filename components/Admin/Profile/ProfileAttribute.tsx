import React from 'react';

const ProfileAttribute = ({ label, value }) => {
  return <div className="lg:w-6/12 md:w-12/12 mb-2 px-3">
    <span className="font-semibold leading-normal mb-1 text-blueGray-700">
      {label}
    </span>
    <div className="text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold">
      {value || '-'}
    </div>
  </div>
}

export default ProfileAttribute;
