// AvailableShifts.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShifts } from '../store/action';
import { bookShift, cancelShift, getShifts } from '../api/mockapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/Available.css';

const AvailableShifts = () => {
  const shiftsData = useSelector((state) => state) || [];
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState('Helsinki');
  const [selectedShift, setSelectedShift] = useState(null);
  const [showBookedCancel, setShowBookedCancel] = useState(false);

  useEffect(() => {
    const fetchMyShifts = async () => {
      try {
        const fetchedShifts = await getShifts();
        dispatch(setShifts(fetchedShifts.filter((shift) => shift.booked)));
      } catch (error) {
        console.error('Error fetching my shifts:', error.message);
      }
    };

    fetchMyShifts();
  }, [dispatch]);

  const [localShiftsData, setLocalShiftsData] = useState(shiftsData);

  useEffect(() => {
    setLocalShiftsData(shiftsData);
  }, [shiftsData]);

  const handleButtonClick = (id) => {
    setSelectedShift(id);
    setShowBookedCancel(true);
    toast.success(`Successfully booked shift`);
  };

  const handleCancelClick = async (id, booked) => {
    try {
      const shiftToHandle = localShiftsData.find((shift) => shift.id === id);

      if (!shiftToHandle) {
        console.error('Shift not found');
        return;
      }

      if (booked) {
        await cancelShift(id);

        const updatedShifts = localShiftsData.map((shift) =>
          shift.id === id ? { ...shift, booked: false, cancelled: true } : shift
        );

        dispatch(setShifts(updatedShifts));
        toast.error(`Cancelled shift!`);
        setShowBookedCancel(false);
      } else {
        await bookShift(id);

        const updatedShifts = localShiftsData.map((shift) =>
          shift.id === id ? { ...shift, booked: true, cancelled: false } : shift
        );

        dispatch(setShifts(updatedShifts));
        toast.error(`Shift is Booked`);
      }

      setSelectedShift(null);
    } catch (error) {
      console.error('Error handling shift:', error.message);
      toast.error(`Error handling shift: ${error.message}`);
    }
  };

  const getDayString = (date) => {
    const today = new Date();
    const shiftDate = new Date(date);

    if (shiftDate.toDateString() === today.toDateString()) {
      return 'today';
    }

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (shiftDate.toDateString() === tomorrow.toDateString()) {
      return 'tomorrow';
    }

    const options = { month: 'long', day: 'numeric' };
    return shiftDate.toLocaleDateString(undefined, options);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const countries = ['Helsinki', 'Tampere', 'Turku'];

  const newShifts = localShiftsData;

  return (
    <div className="Overall">
      <div className="Myshifts">
        <h2>Available Shifts</h2>
      </div>
      <div className="shifts">
        <div className="column">
          <div className="country-row" style={{ justifyContent: 'space-evenly' }}>
            {countries.map((country) => (
              <span
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={selectedCountry === country ? 'selected' : ''}
              >
                {country}
              </span>
            ))}
          </div>
          {newShifts.map((shift) => (
            <div key={shift.id} className="shift-details">
              <div className="Available">
                <h4>{getDayString(shift.startTime)}</h4>
              </div>
              <div className="filter">
                <div className="Timing">
                  <h4>
                    {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                  </h4>
                </div>
                <div className="btn1">
                  {showBookedCancel ? (
                    <>
                      <button
                        onClick={() => handleButtonClick(shift.id)}
                        style={{
                          color: selectedShift === shift.id ? 'grey' : '',
                        }}
                      >
                        {shift.booked ? 'Booked' : 'Book'}
                      </button>
                      <button
                        onClick={() => handleCancelClick(shift.id, shift.booked)}
                        style={{
                          color: selectedShift === shift.id ? 'grey' : '',
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleButtonClick(shift.id)}
                      style={{
                        color: selectedShift === shift.id ? 'grey' : '',
                      }}
                    >
                      Book
                    </button>
                  )}
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

export default AvailableShifts;
