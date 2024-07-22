import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Header from './Header.jsx';
import ActivityFeed from './components/ActivityFeed.jsx';
import ActivityDetail from './components/ActivityDetail.jsx';
import ArchivedCalls from './components/ArchivedCalls.jsx';

const App = () => {
  return (
    <Router>
      <div className='container'>
        <div className='start'>
        <Header />
        <div className="tabs">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'tab-link active-tab' : 'tab-link'}>Activity Feed</NavLink>
          <NavLink to="/archived" className={({ isActive }) => isActive ? 'tab-link active-tab' : 'tab-link'}>Archived Calls</NavLink>
        </div>
        </div>
       
        <div className="container-view">
          <Routes>
            <Route path="/" element={<ActivityFeed />} />
            <Route path="/activity/:id" element={<ActivityDetail />} />
            <Route path="/archived" element={<ArchivedCalls />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
