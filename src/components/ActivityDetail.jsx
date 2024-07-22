import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActivityDetail, updateActivity } from '../services/apiService';
import '../styles/ActivityDetail.css';

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    fetchActivityDetail();
  }, [id]);

  const fetchActivityDetail = async () => {
    try {
      const data = await getActivityDetail(id);
      setActivity(data);
    } catch (error) {
      console.error('Failed to fetch activity detail', error);
    }
  };

  const toggleArchive = async () => {
    try {
      await updateActivity(id, !activity.is_archived);
      fetchActivityDetail();
    } catch (error) {
      console.error('Failed to update activity', error);
    }
  };

  if (!activity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="activity-detail">
      <div className="activity-date">{new Date(activity.created_at).toLocaleDateString()}</div>
      <div className="activity-box2">
        <div className="activity-info3">
        <span className="activity-type">
                    <i className={`fas ${activity.call_type === 'answered' ? 'fa-phone-alt' : activity.call_type === 'missed' ? 'fa-phone-slash' : 'fa-voicemail'}`}></i>
                    {activity.call_type}
                  </span>
                  <div>
                  <p><strong>From:</strong> {activity.from}</p>
          <p><strong>To:</strong> {activity.to}</p>
          <p><strong>Type:</strong> {activity.call_type}</p>
          <p><strong>Duration:</strong> {activity.duration} seconds</p>
          <p><strong>Direction:</strong> {activity.direction}</p>
          <p><strong>Via:</strong> {activity.via}</p>
                  </div>
        
          <div className="activity-date">
            {new Date(activity.created_at).toLocaleTimeString()}
            <p className={activity.is_archived ? 'archived-yes' : 'archived-no'}>
  <strong>Archived:</strong> {activity.is_archived ? 'Yes' : 'No'}
</p>
            
            </div>

        </div>
        <button onClick={toggleArchive} className="archive-button">
          {activity.is_archived ? 'Unarchive' : 'Archive'}
        </button>
      </div>
    </div>
  );
};

export default ActivityDetail;
