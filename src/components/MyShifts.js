import React, { useEffect, useState } from 'react';
import { getShifts, cancelShift } from '../api/mockapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/Myshift.css';

const MyShifts = () => {
  const [shiftsData, setShiftsData] = useState([]);

  useEffect(() => {
    const fetchMyShifts = async () => {
      try {
        const fetchedShifts = await getShifts();
        const bookedShifts = fetchedShifts.filter((shift) => shift.booked);
        setShiftsData(bookedShifts);
        // Save booked shifts to local storage
        localStorage.setItem('bookedShifts', JSON.stringify(bookedShifts));
      } catch (error) {
        console.error('Error fetching my shifts:', error.message);
      }
    };

    fetchMyShifts();
  }, []);

  const handleCancelShift = async (id) => {
    try {
      const shiftToCancel = shiftsData.find((shift) => shift.id === id);

      if (shiftToCancel && !shiftToCancel.cancelled) {
        await cancelShift(id);
        const updatedShifts = shiftsData.map((shift) =>
          shift.id === id ? { ...shift, cancelled: true } : shift
        );
        setShiftsData(updatedShifts);
        // Save updated shifts to local storage
        localStorage.setItem('bookedShifts', JSON.stringify(updatedShifts));
        toast.error('Shift successfully canceled!');
      } else {
        toast.error('This shift is already canceled and cannot be canceled again.');
      }
    } catch (error) {
      console.error('Error cancelling shift:', error.message);
      toast.error('Error cancelling shift. Please try again.');
    }
  };

  const calculateTotalDuration = (shift) => {
    const startTime = new Date(shift.startTime);
    const endTime = new Date(shift.endTime);
    const durationInMilliseconds = endTime - startTime;
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
    return durationInHours.toFixed(2); 
  };

  return (
    <div className="Overall">
      <div className="Myshifts">
        <h2>My Shifts</h2>
      </div>
      <div className="shifts">
        <div className="column">
          {shiftsData.map((shift) => (
            <div key={shift.id} className="shift-details">
              <div className="Available">
                <h4>{new Date(shift.startTime).toDateString()}</h4>
                <p>{shift.area} Shift</p>
                <p>{calculateTotalDuration(shift)}h</p>
              </div>
              <div className="filter">
                <div className="Timing">
                  <h4>
                    {new Date(shift.startTime).toLocaleTimeString()} - {new Date(shift.endTime).toLocaleTimeString()}
                  </h4>
                  <span>{shift.area}</span>
                </div>
                <div className="btn1">
                  {!shift.cancelled && (
                    <button onClick={() => handleCancelShift(shift.id)} disabled={shift.cancelled}>
                      Cancel
                    </button>
                  )}
                  {shift.cancelled && <span className="canceled-label">Canceled</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyShifts;
