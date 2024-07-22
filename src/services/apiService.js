import axios from 'axios';

const BASE_URL = 'https://aircall-backend.onrender.com';

export const getActivities = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/activities`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch activities: ' + error.message);
  }
};

export const getActivityDetail = async (callId) => {
  try {
    const response = await axios.get(`${BASE_URL}/activities/${callId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch activity detail: ' + error.message);
  }
};

export const updateActivity = async (callId, isArchived) => {
  try {
    const response = await axios.patch(`${BASE_URL}/activities/${callId}`, {
      is_archived: isArchived
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update activity: ' + error.message);
  }
};

export const resetActivities = async () => {
  try {
    const response = await axios.patch(`${BASE_URL}/reset`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to reset activities: ' + error.message);
  }
};
