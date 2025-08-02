import React from 'react';

const Profile = () => {
  const user = {
    name: 'Praveen Kumar',
    email: 'praveen@pk11.com',
    role: 'USER',
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white max-w-xl mx-auto shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile Details</h1>
        
        <div className="space-y-4">
          <div>
            <label className="text-gray-600">Name</label>
            <p className="text-lg font-medium">{user.name}</p>
          </div>

          <div>
            <label className="text-gray-600">Email</label>
            <p className="text-lg font-medium">{user.email}</p>
          </div>

          <div>
            <label className="text-gray-600">Role</label>
            <p className="text-lg font-medium">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
