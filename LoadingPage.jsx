import React, { useEffect, useState } from 'react';


const LoadingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (e.g. fetching data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h2>Loading...</h2>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to the App!</h1>
      
    </div>
  );
};

export default LoadingPage;
