import { Container, Table, Button, Row, Card, Col, Modal } from 'react-bootstrap';

import { useState, useEffect } from 'react';
import hive, { Client } from '@hiveio/hive-js';
import { KeychainSDK } from 'keychain-sdk';

export default function CurationTrailPage() {
  const [data, setData] = useState([{
    user: 'test',
    followers: 100
  }])


  // hive.api.callAsync('condenser_api.get_accounts', [['dbuzz']])
  //   .then((res) => console.log(res))
  const [trendingData, setTrendingData] = useState([]);
  const [afterTag, setAfterTag] = useState('');
  const [loading, setLoading] = useState(false);

  const followUser = async () => {
    let status = hive.api
      .callAsync('condenser_api.get_following', ["dbuzz", "nhongz", "blog", 3])
      .then((res) => {
        console.log('res', res);
      })

    console.log('status', status);
  }

  useEffect(() => {
    if (trendingData.length === 0) {
      // fetchTrendingData();
    }
  }, [])

  const fetchTrendingData = () => {
    if (!loading) {
      setLoading(true);
      hive.api.getTrendingTags(afterTag, 10, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          const newDataPromises = result.map(async (tag) => {
            const followCount = await getFollowCount(tag.name);
            return { name: tag.name, followCount: followCount };
          });

          Promise.all(newDataPromises).then((newData) => {
            setTrendingData((prevTrendingData) => [...prevTrendingData, ...newData]);
            if (result.length > 0) {
              setAfterTag(result[result.length - 1].name);
            }
            setLoading(false);
          });
        }
      });
      console.log(trendingData);
    }
  };

  const getFollowCount = (account) => {
    return new Promise((resolve, reject) => {
      hive.api.getFollowCount(account, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  function toggleCheckbox(source) {
    var checkboxes = document.getElementsByName('trail_id');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
      checkboxes[i].checked = source.checked;
    }
  }

  function settingsForSelectedTrails() {
    document.querySelectorAll('.btn').forEach((btn) => btn.setAttribute('disabled', true));
    var minute = document.getElementById('afterminall').value;
    var votingway;
    var radios = document.getElementsByName('votingwayall');
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        votingway = radios[i].value;
        break;
      }
    }
    var weight = document.getElementById('weightall').value;
    if (minute === '' || minute === null) {
      minute = 0;
    }
    if (weight === '' || weight === null) {
      weight = 50;
    }

    var enable;
    if (document.getElementById('enableall').checked) {
      enable = 1;
    } else {
      enable = 0;
    }
    var checkboxes = document.getElementsByName('trail_id');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
      if (checkboxes[i].checked) {
        var user = checkboxes[i].id;
        const body =
          'trail=' +
          encodeURIComponent(user) +
          '&weight=' +
          encodeURIComponent(weight) +
          '&minute=' +
          encodeURIComponent(minute) +
          '&votingway=' +
          encodeURIComponent(votingway) +
          '&enable=' +
          encodeURIComponent(enable);

        callApi('api/v1/dashboard/curation_trail/settings', body);
      }
    }
    return 1;
  }

  const modalForSelectedTrails = () => {
    var checked = 0;
    var checkboxes = document.getElementsByName('trail_id');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
      if (checkboxes[i].checked) {
        checked = 1;
      }
    }
    if (checked) {
      document.getElementById('myModalselectedtrails').style.display = 'block';
    } else {
      alert('Please select some trail from the list!');
    }
  }

  const followCurationTrail = (usernameToFollow) => {
    const operation = {
      id: 'follow',
      json: JSON.stringify(['follow', {
        follower: 'iamjc93', // Replace with your username
        following: usernameToFollow, // Replace with the user you want to follow
        what: ['blog'] // You can customize the type of content you want to follow (e.g., blog, posts, comments)
      }]),
      key: 'Active' // Use the appropriate key type here (e.g., posting, active, owner)
    };

    // const keychain = new KeychainSDK(window, { rpc: 'https://rpc.d.buzz/' });

    // Send the custom JSON operation to Hive Keychain
    window.hive_keychain.requestCustomJson('iamjc93', 'hive', 'Active', JSON.stringify(operation), 'Follow user', (response) => {
      console.log(response);
      if (response.success) {
        console.log('Successfully started following the curation trail of ' + usernameToFollow);
      } else {
        console.error('Failed to follow the curation trail. Error: ', response.message);
      }
    });
  }

  // Using axios for making HTTP requests, make sure to install it using `npm install axios` if not already installed
  // import axios from 'axios';

  // Function to get the popular curation list
  async function getPopularCurationListWithFollowers(limit) {
    try {
      const result = await hive.api.getDiscussionsByHotAsync({ limit: 10 }); // Retrieving a larger limit

      if (result && result.length > 0) {
        const popularCurationList = [];
        for (let i = 0; i < result.length; i++) {
          const post = result[i];
          const author = post.author;
          const permlink = post.permlink;
          const title = post.title;
          const votes = post.net_votes;

          // Fetch followers count for each author
          const followersResult = await hive.api.getFollowCountAsync(author);
          const followersCount = followersResult.follower_count;

          popularCurationList.push({ author, permlink, title, votes, followers: followersCount });


        }

        // Sort the popular curation list based on followers count
        popularCurationList.sort((a, b) => b.followers - a.followers);

        console.log('Popular curation list sorted by followers count:', popularCurationList);
      } else {
        console.log('No popular curation list found');
      }
    } catch (error) {
      console.error('Error occurred while fetching popular curation list: ', error);
    }
  }



  const fetchCurationTrailList = async () => {
    try {
      const response = await axios.post(
        'https://api.hive.blog/',
        {
          jsonrpc: '2.0',
          method: 'database_api.list_votes',
          params: {
            "start": ["inber", "coziness", ""],
            "order": "by_comment_voter"
          }, // Replace 'username' with the desired username
          id: 1,
        }
      );
      console.log(response);
    } catch (error) {
      console.error('Error fetching curation trail list:', error);
    }
  };

  const [witnesses, setWitnesses] = useState([]);

  useEffect(() => {
    const fetchWitnesses = async () => {
      try {
        const response = await axios.post(
          "https://api.hive.blog",
          {
            jsonrpc: "2.0",
            method: "database_api.list_witnesses",
            params: { "start": [0, ""], "limit": 1000, "order": "by_vote_name" },
            id: 1,
          }
        );
        console.log(response);
        if (response.status === 200) {
          setWitnesses(response.data.result);
        } else {
          console.error("Request failed with status code", response.status);
        }
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      }
    };

    // fetchWitnesses();
  }, [witnesses]);

  const [username, setUsername] = useState('')

  const handleLogin = () => {
    login(username)
  }


  return (
    <Container style={{ margin: "0 !important" }}>
      <Row>
        <input onChange={(e) => {
          setUsername(e.target.value)
        }} />
        <Button onClick={() => handleLogin()}>login</Button>
        <Button onClick={() => register('iamjc93')}>reg</Button>
        <Button onClick={() => logout()}>logout</Button>
        <Button onClick={() => fetchCurationTrailList()}>1</Button>
        <Button onClick={() => getPopularCurationListWithFollowers()}>2</Button>
      </Row>

      <Row>
        <ul>
          {/* {witnesses?.map((witness) => (
            <li key={witness.owner}>{witness.owner}</li>
          ))} */}
        </ul>
      </Row>

      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <h3 style={{ borderBottom: "1px solid #000", paddingBottom: "10px" }}>
                You are following:
                <Button style={{ float: "right" }} variant="primary" onClick={() => modalForSelectedTrails()}>
                  Settings for selections
                </Button>
              </h3>
              <div style={{ maxHeight: "600px", overflow: "auto" }} className="table-responsive-vertical shadow-z-1">
                <Table className="table table-hover table-mc-light-blue" id="table">
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" name="" onClick={() => toggleCheckbox(this)} value="" id="selectall" />
                      </th>
                      <th>#</th>
                      <th>Username</th>
                      <th>Followers</th>
                      <th>Weight</th>
                      <th>Method</th>
                      <th>Wait Time</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr className="tr1" key={index}>
                        <td data-title="ID">
                          <input type="checkbox" name="trail_id" value="" id={item?.user} />
                        </td>
                        <td data-title="ID">{item?.k}</td>
                        <td data-title="Name">
                          <a href={`/dash.php?i=1&trail=${item?.user}`} target="_blank">@{item?.user}</a>
                        </td>
                        <td data-title="Status">{item?.followers}</td>
                        <td data-title="Status">{item?.w}</td>
                        <td data-title="Status">{item?.method}</td>
                        <td data-title="Status">{item?.n?.aftermin} min</td>
                        <td data-title="Status" dangerouslySetInnerHTML={{ __html: item?.status }}></td>
                        <td data-title="Status">
                          <a title="Settings" data-toggle="modal" onClick={() => $(`[id='myModal${item?.user}']`).modal("show")} className="pe-7s-config action-icon action-config-icon"></a>
                          <a title="Delete" onClick={() => { if (window.confirm("Are you sure?")) { unfollow(item?.user) } }} className="pe-7s-close-circle action-icon action-close-icon"></a>
                        </td>
                        <Modal show={false} onHide={() => $(`[id='myModal${item?.user}']`).modal("hide")} id={`myModal-${item?.user}`} role="dialog">
                          <Modal.Dialog>
                            <Modal.Header closeButton>
                              <Modal.Title>Settings: @{item?.user}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div style={{ textAlign: "left", display: "", padding: "20px" }} id={`set${item?.k}`} className="col-md-12">
                                <form onSubmit={() => settings(item?.user)}>
                                  <b style={{ color: "orange" }}>
                                    Read <a target="_blank" href="#">FAQ</a> before editing.
                                  </b>
                                  <br />
                                  <br />
                                  <div style={{ border: "1px solid #ddd", padding: "5px" }} className="form-group">
                                    <strong>
                                      Settings for Trailer:{" "}
                                      <a href={`https://steemit.com/@${item?.user}`} target="_blank">
                                        @{item?.user}
                                      </a>
                                    </strong>
                                    <br />
                                    <br />
                                    <div className="form-check" style={{ marginBottom: "5px" }}>
                                      <input className="form-check-input" type="checkbox" value="" id={`enable${item?.user}`} checked={item?.n?.enable} />
                                      <label style={{ color: "#2b0808" }} className="form-check-label" id="enabling" htmlFor="defaultCheck1">
                                        Enable (uncheck for disabling)
                                      </label>
                                    </div>
                                    <div style={{ border: "1px solid #ddd", padding: "5px" }} className="form-group">
                                      <label>Voting weight (%): (Default is 50%)</label>
                                      <input id={`weight${item?.user}`} placeholder="Voting weight" name="weight" type="number" className="form-control" value={item?.n?.weight / 100} step="0.01" min="0" max="100" />
                                      <div className="form-check">
                                        <label style={{ color: "#2b0808" }} className="form-check-label">
                                          <input className="form-check-input" type="radio" name={`votingway${item?.user}`} id="votingway" value="1" checked={item?.n?.votingway === 1} />
                                          Scale voting weight (default)
                                        </label>
                                      </div>
                                      <div className="form-check">
                                        <label style={{ color: "#2b0808" }} className="form-check-label">
                                          <input className="form-check-input" type="radio" name={`votingway${item?.user}`} id="votingway" value="2" checked={item?.n?.votingway === 2} />
                                          Fixed voting weight
                                        </label>
                                      </div>
                                    </div>
                                    <label>Time to wait before voting (minutes): (Default is 0)</label>
                                    <input id={`aftermin${item?.user}`} value={item?.n?.aftermin} placeholder="Upvoting After X Minutes." name="aftermin" type="number" className="form-control" step="1" min="0" max="30" />
                                    <input style={{ marginTop: "10px" }} value="Save Settings" type="submit" className="btn btn-primary" />
                                  </div>
                                </form>
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={() => $(`[id='myModal${item?.user}']`).modal("hide")}>Close</Button>
                            </Modal.Footer>
                          </Modal.Dialog>
                        </Modal>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <h3 style={{ borderBottom: "1px solid #000", paddingBottom: "10px" }}>Popular Curation Trails: </h3>
              <div style={{ maxHeight: "600px", overflow: "auto" }} className="table-responsive-vertical shadow-z-1">
                <Table className="table table-hover table-mc-light-blue" id="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>Description</th>
                      <th>Followers</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trendingData.map((data, index) => {
                      return (
                        <tr className="tr2" key={index}>
                          <td data-title="ID">{index + 1}</td>
                          <td data-title="Name">
                            <a href="#" target="_blank">@{data.name}</a>
                          </td>
                          <td data-title="Link"></td>
                          <td data-title="Status">{data.followCount.follower_count}</td>
                          <td data-title="Status">
                            <Button onClick={() => { if (window.confirm('Are you sure?')) { follow('') } }} variant="primary">FOLLOW</Button>
                            {/* <Button onClick={() => { if (window.confirm('Are you sure?')) { unfollow('') } }} variant="danger">UNFOLLOW</Button> */}
                          </td>
                          <td data-title="Status"></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
                <div style={{ textAlign: "center" }}>
                  {/* <a className="btn btn-primary" href="/dash.php?i=1">First page</a>
                  <a className="btn btn-primary" href="/dash.php?i=1&p=1">Previous page</a> */}
                  <a className="btn btn-primary" onClick={fetchTrendingData}>Load More</a>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
