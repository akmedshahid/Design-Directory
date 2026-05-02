import React, { useState, useEffect, useMemo, useRef, useCallback, createContext, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted') === 'true';
    if (hasCompletedOnboarding) {
      navigate('/app', { replace: true });
    } else {
      navigate('/onboarding', { replace: true });
    }
  }, [navigate]);

  return <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}></div>;
};

export default Home;
