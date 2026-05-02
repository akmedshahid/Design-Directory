import React from 'react';
import { Outlet } from 'react-router-dom';
import './GroupBuysLayout.css';

const GroupBuysLayout = () => {
  return (
    <div className="group-buys-layout">
      <section className="gb-main-content">
        <Outlet />
      </section>
    </div>
  );
};

export default GroupBuysLayout;
