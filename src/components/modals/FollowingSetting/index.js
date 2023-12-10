import React, { useState, useMemo } from 'react';
import instance from 'api/axios/instance';
import { CURATION, DOWNVOTE } from 'lib/constant';
import { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateFollowingTrail } from 'slices/trailer';

const FollowingSetting = ({ trailerType, show, handleCloseSetting, trailer, refreshFollowingTrails }) => {
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [isEnable, setIsEnable] = useState(false);
  const [votingType, setVotingType] = useState('Scaled');
  const [weight, setWeight] = useState(100);
  const [username, setUsername] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false);

  const type = [CURATION, DOWNVOTE];

  const isInclude = useMemo(() => type.includes(trailerType), [trailerType]);

  useEffect(() => {
    if (trailer) {
      setId(trailer.id)
      setUsername(trailer.username)
      setIsEnable(trailer.isEnable)
      setVotingType(trailer.votingType)
      setWeight(trailer.weight / 100)
      console.log(trailer);
    }
  }, [trailer, show])

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your submit logic here
    // Use the state values id, isEnable, votingType, trailerType, weight
    const cancelTokenSource = instance.createCancelToken();
    try {
      dispatch(updateFollowingTrail({
        id,
        isEnable,
        votingType,
        trailerType,
        weight,
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
      handleCloseSetting();
      setIsSubmitted(false);
    }
  }, [isSubmitted])

  const toggleStatus = () => setIsEnable(!isEnable);

  return (
    <Modal show={show} onHide={handleCloseSetting}>
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
            isInclude && <>
              {/* Method Selection */}
              <div className="form-group">
                <label htmlFor="votingTypeSelect">Method</label>
                <select
                  className="form-control"
                  id="votingTypeSelect"
                  required
                  onChange={(e) => setVotingType(e.target.value)}
                >
                  <option value='' >Select Method</option>
                  <option value="Scaled" defaultValue={votingType === 'Scaled'}>Scaled</option>
                  <option value="Fixed" defaultValue={votingType === 'Fixed'}>Fixed</option>
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

          {/* Submit Button */}
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: '0' }}>
        <Button variant="default" onClick={handleCloseSetting}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FollowingSetting;
