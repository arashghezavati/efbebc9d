
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getActivities, updateActivity } from '../services/apiService';
import '../styles/ActivityFeed.css';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data.filter(activity => !activity.is_archived));
    } catch (error) {
      console.error('Failed to fetch activities', error);
      setError('Failed to fetch activities');
    }
  };

  const archiveCall = async (callId) => {
    try {
      await updateActivity(callId, true);
      setActivities(activities.filter(activity => activity.id !== callId));
      navigate('/archived');
    } catch (error) {
      console.error('Failed to archive call', error);
      setError('Failed to archive call');
    }
  };

  const archiveAllCalls = async () => {
    try {
      const promises = activities.map(activity => updateActivity(activity.id, true));
      await Promise.all(promises);
      fetchActivities();
      navigate('/archived');
    } catch (error) {
      console.error('Failed to archive all calls', error);
      setError('Failed to archive all calls');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="activity-feed">
      {error && <p className="error-message">{error}</p>}
      <button onClick={archiveAllCalls} className="archive-all-button">
        <i className="fas fa-archive"></i> Archive All Calls
      </button>      <ul>
        {activities.map(activity => (
          <li key={activity.id} className="activity-item">
            <div className="activity-date">
              {formatDate(activity.created_at)}
            </div>
            <div className="activity-box">
              <div className="activity-details">
                <div className="activity-header">
                  <span className="activity-type">
                    <i className={`fas ${activity.call_type === 'answered' ? 'fa-phone-alt' : activity.call_type === 'missed' ? 'fa-phone-slash' : 'fa-voicemail'}`}></i>
                    {activity.call_type}
                  </span>
                </div>
                <div className="activity-info">
                  <p><strong>From:</strong> {activity.from}</p>
                  <p><strong>To:</strong> {activity.to}</p>
                  <p><strong>Via:</strong> {activity.via}</p>
                  <p><strong>Duration:</strong> {activity.duration} seconds</p>
                  <p><strong>Direction:</strong> {activity.direction}</p>
                </div>
                <div className="button-container">
                <button onClick={() => archiveCall(activity.id)} className="archive-button">Archive</button>
                <Link to={`/activity/${activity.id}`} className="activity-link">View Details</Link>

              </div>
              </div>
            
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;

