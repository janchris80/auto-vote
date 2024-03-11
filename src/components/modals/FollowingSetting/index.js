import React, { useState, useMemo } from 'react';
import instance from 'api/axios/instance';
import { CURATION, DOWNVOTE } from 'lib/constant';
import { useEffect } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateFollowingTrail } from 'slices/trailer';
import SearchCommunity from 'components/inputs/SearchCommunity';

const FollowingSetting = ({ trailerType, show, handleCloseSetting, trailer, refreshFollowingTrails }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [id, setId] = useState('');
  const [isEnable, setIsEnable] = useState(false);
  const [votingType, setVotingType] = useState('Scaled');
  const [weight, setWeight] = useState(50);
  const [voteTime, setVoteTime] = useState(0);
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
      setVoteTime(trailer.votingTime)
      setWeight(trailer.weight / 100)
    }

    if (!show) {
      setId('');
      setUsername('');
      setIsEnable(false);
      setVotingType('Scaled');
      setWeight(100);
      setVoteTime(0);
      setIsSubmitted(false);
      localStorage.removeItem(`excludedCommunities`);
      refreshData();
    }
  }, [trailer, show])

  const refreshData = async () => {
    try {
      await refreshFollowingTrails();
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your submit logic here
    // Use the state values id, isEnable, votingType, trailerType, weight
    const cancelTokenSource = instance.createCancelToken();
    try {
      const storedExcludedCommunities = localStorage.getItem(`excludedCommunities`);
      dispatch(updateFollowingTrail({
        id,
        isEnable,
        votingType,
        trailerType,
        weight,
        communities: storedExcludedCommunities ? JSON.parse(storedExcludedCommunities) : [],
        votingTime: voteTime,
        cancelToken: cancelTokenSource,
      }))

      setIsSubmitted(true)
    } catch (error) {
      setIsSubmitted(false)
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      handleCloseSetting();
      setIsSubmitted(false);
    }
  }, [isSubmitted])

  const toggleStatus = () => setIsEnable(!isEnable);
  const capitalize = (word) => {
    return word
      .toLowerCase()
      .replace(/\w/, firstLetter => firstLetter.toUpperCase());
  }

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
                  defaultValue={capitalize(votingType)}
                >
                  <option value='' >Select Method</option>
                  <option value="Scaled">Scaled</option>
                  <option value="Fixed">Fixed</option>
                </select>
              </div>
            </>
          }

          {/* Weight Slider */}
          <div className="form-group">
            <label htmlFor="weightSlider">Voting Weight (0% - 100%)</label>
            <input
              type="number"
              className="form-control"
              id="weightSlider"
              min={0}
              max={100}
              step={0.01}
              maxLength={3}
              value={weight}
              onChange={(e) => {
                const inputValue = Math.min(parseFloat(e.target.value), 100); // Ensure the value is within the range
                setWeight(inputValue);
              }}
              name="weight"
              required
            />
          </div>

          {/* votingTime Slider */}
          <div className="form-group">
            <label htmlFor="voteTime">Vote Delay Time (1440 minutes max)</label>
            <input
              type="number"
              className="form-control"
              id="voteTime"
              min={0}
              max={1440} // 1440 mins = 24 hours
              step={1}
              maxLength={4}
              value={voteTime}
              onChange={(e) => {
                const inputValue = Math.min(parseInt(e.target.value, 10), 1440); // Ensure the value is within the range
                setVoteTime(inputValue);
              }}
              name="voteTime"
              required
            />
          </div>

          <SearchCommunity username={username} trailerType={trailerType} trailer={trailer} />

        </form>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: '0' }}>
        <Button variant="default" onClick={handleCloseSetting}>
          Close
        </Button>
        <Button variant="primary" type="button" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FollowingSetting;
