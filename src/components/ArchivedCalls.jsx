import React, { useEffect, useState } from 'react';
import { getActivities, updateActivity } from '../services/apiService';
import '../styles/ArchivedCalls.css';

const ArchivedCalls = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArchivedActivities();
  }, []);

  const fetchArchivedActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data.filter(activity => activity.is_archived));
    } catch (error) {
      console.error('Failed to fetch activities', error);
      setError('Failed to fetch archived activities');
    }
  };

  const unarchiveCall = async (callId) => {
    try {
      await updateActivity(callId, false);
      setActivities(activities.filter(activity => activity.id !== callId));
    } catch (error) {
      console.error('Failed to unarchive call', error);
      setError('Failed to unarchive call');
    }
  };

  const unarchiveAllCalls = async () => {
    try {
      const promises = activities.map(activity => updateActivity(activity.id, false));
      await Promise.all(promises);
      fetchArchivedActivities();
    } catch (error) {
      console.error('Failed to unarchive all calls', error);
      setError('Failed to unarchive all calls');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="archived-calls">
      {error && <p className="error-message">{error}</p>}
      <button onClick={unarchiveAllCalls} className="unarchive-all-button">
        <i className="fas fa-box-open"></i> Unarchive All Calls
      </button>
      <div className="activities-grid">
        {activities.map(activity => (
          <div key={activity.id}>
            <div className="activity-date">{formatDate(activity.created_at)}</div>
            <div className="activity-box">
              <div className="activity-content">
                <div className="activity-header">
                  <span className="activity-type">
                    <i className={`fas ${activity.call_type === 'answered' ? 'fa-phone-alt' : activity.call_type === 'missed' ? 'fa-phone-slash' : 'fa-voicemail'}`}></i>
                    {activity.call_type}
                  </span>
                </div>
                <div className="activity-info2">
                  <p><strong>From:</strong> {activity.from}</p>
                  <p><strong>To:</strong> {activity.to}</p>
                  <p><strong>Via:</strong> {activity.via}</p>
                  <p><strong>Duration:</strong> {activity.duration} seconds</p>
                  <p><strong>Direction:</strong> {activity.direction}</p>
                </div>
                <button onClick={() => unarchiveCall(activity.id)} className="unarchive-button">Unarchive</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivedCalls;
