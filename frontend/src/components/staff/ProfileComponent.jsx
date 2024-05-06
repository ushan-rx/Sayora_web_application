import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const ProfileComponent = ({ staff }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <img src={staff.Image} alt="Profile" className="w-32 h-32 rounded-full" />
      <h2>{`${staff.fName} ${staff.lName}`}</h2>
      <p>{staff.phone}</p>
      {/*<p>{`${staff.address.street}, ${staff.address.city}, ${staff.address.state}`}</p>*/}
      <p>{staff.Email}</p>
      <p>{staff.JobRole}</p>
      <p>{staff.Status}</p>
    </div>
  );
};

export default ProfileComponent;
