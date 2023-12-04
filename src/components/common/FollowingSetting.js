import instance from 'api/axios/instance';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateFollowingTrail } from 'slices/trailer';

const FollowingSetting = ({ type, show, onHide, trailer, refreshFollowingTrails }) => {
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [isEnable, setIsEnable] = useState(false);
  const [votingType, setVotingType] = useState('Scaled');
  const [weight, setWeight] = useState(100);
  const [afterMin, setAfterMin] = useState(0);
  const [dailyLeft, setDailyLeft] = useState(1);
  const [limitLeft, setLimitLeft] = useState(1);
  const [username, setUsername] = useState('null')
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (trailer) {
      setUsername(trailer.username)
      setId(trailer.id)
      setIsEnable(trailer.isEnable)
      setVotingType(trailer.votingType)
      setWeight(trailer.weight / 100)
      setAfterMin(trailer.afterMin)
      setDailyLeft(trailer.dailyLeft)
      setLimitLeft(trailer.limitLeft)
    }
  }, [trailer, show])

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your submit logic here
    // Use the state values id, isEnable, votingType, type, weight, afterMin, dailyLeft, limitLeft
    const cancelTokenSource = instance.createCancelToken();
    try {
      dispatch(updateFollowingTrail({
        id,
        isEnable,
        votingType,
        type,
        weight,
        afterMin,
        dailyLeft,
        limitLeft,
        cancelToken: cancelTokenSource,
      }))

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

  const toggleStatus = () => setIsEnable(!isEnable);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Settings: @{username}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>

          {/* Status Checkbox */}
          <div className="form-group">
            <label className="mr-2">Status: <span style={{ color: isEnable ? 'green' : 'red' }}>
              {isEnable ? 'Enabled' : 'Disabled'}
            </span>
            </label>
            <Button
              size='sm'
              variant={!isEnable ? 'success' : 'danger'}
              onClick={() => toggleStatus()}
            >
              {!isEnable ? 'Click to Enable' : 'Click to Disable'}
            </Button>
          </div>

          {
            type === 'curation' && <>
              {/* Method Selection */}
              <div className="form-group">
                <label htmlFor="votingTypeSelect">Method</label>
                <select
                  className="form-control"
                  id="votingTypeSelect"
                  value={votingType}
                  onChange={(e) => setVotingType(e.target.value)}
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
            <label htmlFor="afterMinSlider">Wait Time (0 - 1440 min)</label>
            <input
              type="number"
              className="form-control"
              id="afterMinSlider"
              min="0"
              max="1440"
              step="0.01"
              value={afterMin}
              onChange={(e) => setAfterMin(e.target.value)}
              name="afterMin"
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
