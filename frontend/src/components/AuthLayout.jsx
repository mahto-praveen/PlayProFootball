import React from "react";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
