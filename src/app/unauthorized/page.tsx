import React from 'react';

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
};

export default UnauthorizedPage;