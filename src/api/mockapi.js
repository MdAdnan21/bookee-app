// api/mockApi.js

import { v4 as uuidv4 } from 'uuid';

// Helper function to delay execution (simulating an asynchronous operation)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const shifts = [
  // ... (existing shifts)
  // Helsinki shifts with two data in a single day
  {
    id: uuidv4(),
    booked: true,
    area: 'Helsinki',
    startTime: 1623949200000, // June 18, 2021, 10:00 AM UTC
    endTime: 1623956400000,   // June 18, 2021, 12:00 PM UTC
  },
  {
    id: uuidv4(),
    booked: true,
    area: 'Helsinki',
    startTime: 1623970800000, // June 18, 2021, 3:00 PM UTC
    endTime: 1623974400000,   // June 18, 2021, 5:00 PM UTC
  },
  // Tampere shift
  {
    id: uuidv4(),
    booked: true,
    area: 'Tampere',
    startTime: 1624122000000, // June 20, 2021, 9:00 AM UTC
    endTime: 1624125600000,   // June 20, 2021, 10:00 AM UTC
  },
  // Turku shifts with two data in a single day
  {
    id: uuidv4(),
    booked: true,
    area: 'Turku',
    startTime: 1624140000000, // June 21, 2021, 10:00 AM UTC
    endTime: 1624147200000,   // June 21, 2021, 1:00 PM UTC
  },
  {
    id: uuidv4(),
    booked: true,
    area: 'Turku',
    startTime: 1624161600000, // June 21, 2021, 4:00 PM UTC
    endTime: 1624168800000,   // June 21, 2021, 6:00 PM UTC
  },
  // ... (other existing shifts)
  // New shifts for Helsinki with different time intervals

  // ... (other new shifts for Helsinki)
];

// Mock API functions
const getShifts = async () => {
  await delay(500); // Simulate delay
  return shifts;
};

const getShiftById = async (id) => {
  await delay(200); // Simulate delay
  return shifts.find(shift => shift.id === id);
};

const bookShift = async (id) => {
  const shiftIndex = shifts.findIndex(shift => shift.id === id);

  if (shiftIndex !== -1 && !shifts[shiftIndex].booked) {
    shifts[shiftIndex].booked = true;
    return shifts[shiftIndex];
  } else {
    throw new Error('Shift not found or already booked');
  }
};

const cancelShift = async (id) => {
  const shiftIndex = shifts.findIndex(shift => shift.id === id);

  if (shiftIndex !== -1 && shifts[shiftIndex].booked) {
    shifts[shiftIndex].booked = false;
    return shifts[shiftIndex];
  } else {
    throw new Error('Shift not found or not booked');
  }
};

export {
  getShifts,
  getShiftById,
  bookShift,
  cancelShift,
};
