import instance from 'api/axios/instance';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateFollowingTrail } from 'slices/trailer';

const FollowingSetting = ({ type, show, onHide, trailer, refreshFollowingTrails }) => {
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [status, setStatus] = useState(false);
  const [method, setMethod] = useState('Scaled');
  const [weight, setWeight] = useState(50);
  const [waitTime, setWaitTime] = useState(0);
  const [dailyLeft, setDailyLeft] = useState(1);
  const [limitLeft, setLimitLeft] = useState(1);
  const [username, setUsername] = useState('null')
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (trailer) {
      setUsername(trailer.username)
      setId(trailer.id)
      setStatus(trailer.status)
      setMethod(trailer.method)
      setWeight(trailer.weight)
      setWaitTime(trailer.waitTime)
      setDailyLeft(trailer.dailyLeft)
      setLimitLeft(trailer.limitLeft)
    }
  }, [trailer, show])

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your submit logic here
    // Use the state values id, status, method, type, weight, waitTime, dailyLeft, limitLeft
    const cancelTokenSource = instance.createCancelToken();
    try {
      dispatch(updateFollowingTrail({
        id,
        status,
        method,
        type,
        weight,
        waitTime,
        dailyLeft,
        limitLeft,
        cancelToken: cancelTokenSource,
      }))

      console.log('updateFollowingTrail submit:', {
        id,
        status,
        method,
        type,
        weight,
        waitTime,
        dailyLeft,
        limitLeft,
        cancelToken: cancelTokenSource,
        isSubmitted
      });

      setIsSubmitted(true)
    } catch (error) {
      setIsSubmitted(false)
      console.error(error);
    } finally {
      refreshFollowingTrails()
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      onHide();
    }
  }, [isSubmitted])

  const toggleStatus = () => setStatus(!status);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Settings: @{username}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>

          {/* Status Checkbox */}
          <div className="form-group">
            <label className="mr-2">Status</label>
            <Button
              size='sm'
              variant={status ? 'success' : 'danger'}
              onClick={() => toggleStatus()}
            >
              {status ? 'Enable' : 'Disable'}
            </Button>
          </div>

          {
            type === 'curation' && <>
              {/* Method Selection */}
              <div className="form-group">
                <label htmlFor="methodSelect">Method</label>
                <select
                  className="form-control"
                  id="methodSelect"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  name="method"
                >
                  <option value="Scaled">Scaled</option>
                  <option value="Fixed">Fixed</option>
                </select>
              </div>
            </>
          }

          {/* Weight Slider */}
          <div className="form-group">
            <label htmlFor="weightSlider">Weight (0% - 100%)</label>
            <input
              type="number"
              className="form-control"
              id="weightSlider"
              min="0"
              max="100"
              step="0.01"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              name="weight"
            />
          </div>

          {/* Wait Time Slider */}
          <div className="form-group">
            <label htmlFor="waitTimeSlider">Wait Time (0 - 1440 min)</label>
            <input
              type="number"
              className="form-control"
              id="waitTimeSlider"
              min="0"
              max="1440"
              step="0.01"
              value={waitTime}
              onChange={(e) => setWaitTime(e.target.value)}
              name="waitTime"
            />
          </div>

          {
            type === 'fanbase' && <>
              {/* Daily Left Number Field */}
              <div className="form-group">
                <label htmlFor="dailyLeftField">Daily Vote Limit</label>
                <input
                  type="number"
                  className="form-control"
                  id="dailyLeftField"
                  min="1"
                  max="99"
                  step="1"
                  value={dailyLeft}
                  onChange={(e) => setDailyLeft(e.target.value)}
                  name="dailyLeft"
                />
              </div>

              {/* Limit Left Number Field */}
              <div className="form-group">
                <label htmlFor="limitLeftField">Weekly Vote Limit</label>
                <input
                  type="number"
                  className="form-control"
                  id="limitLeftField"
                  min="1"
                  max="99"
                  step="1"
                  value={limitLeft}
                  onChange={(e) => setLimitLeft(e.target.value)}
                  name="limitLeft"
                />
              </div>
            </>
          }

          {/* Submit Button */}
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: '0' }}>
        <Button variant="default" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FollowingSetting;
