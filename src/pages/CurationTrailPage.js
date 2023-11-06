import { Container, Table, Button, Row, Card, Col } from 'react-bootstrap';

import { useState, useEffect } from 'react';
import hiveJs from 'lib/hive-js';

export default function CurationTrailPage() {
  const hive = hiveJs();
  const [data, setData] = useState([])


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
      fetchTrendingData();
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

  return (
    <Container style={{ margin: "0 !important" }}>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <h3 style={{ borderBottom: "1px solid #000", paddingBottom: "10px" }}>
                You are following:
                <Button style={{ float: "right" }} variant="primary" onClick={() => modalforselectedtrails()}>
                  Settings for selections
                </Button>
              </h3>
              <div style={{ maxHeight: "600px", overflow: "auto" }} className="table-responsive-vertical shadow-z-1">
                <Table className="table table-hover table-mc-light-blue" id="table">
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" name="" onClick={() => togglecheckbox(this)} value="" id="selectall" />
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
                          <input type="checkbox" name="trail_id" value="" id={item.user} />
                        </td>
                        <td data-title="ID">{item.k}</td>
                        <td data-title="Name">
                          <a href={`/dash.php?i=1&trail=${item.user}`} target="_blank">@{item.user}</a>
                        </td>
                        <td data-title="Status">{item.followers}</td>
                        <td data-title="Status">{item.w}</td>
                        <td data-title="Status">{item.method}</td>
                        <td data-title="Status">{item.n.aftermin} min</td>
                        <td data-title="Status" dangerouslySetInnerHTML={{ __html: item.status }}></td>
                        <td data-title="Status">
                          <a title="Settings" data-toggle="modal" onClick={() => $(`[id='myModal${item.user}']`).modal("show")} className="pe-7s-config action-icon action-config-icon"></a>
                          <a title="Delete" onClick={() => { if (window.confirm("Are you sure?")) { unfollow(item.user) } }} className="pe-7s-close-circle action-icon action-close-icon"></a>
                        </td>
                        <Modal show={false} onHide={() => $(`[id='myModal${item.user}']`).modal("hide")} id={`myModal-${item.user}`} role="dialog">
                          <Modal.Dialog>
                            <Modal.Header closeButton>
                              <Modal.Title>Settings: @{item.user}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div style={{ textAlign: "left", display: "", padding: "20px" }} id={`set${item.k}`} className="col-md-12">
                                <form onSubmit={() => settings(item.user)}>
                                  <b style={{ color: "orange" }}>
                                    Read <a target="_blank" href="/faq.php">FAQ</a> before editing.
                                  </b>
                                  <br />
                                  <br />
                                  <div style={{ border: "1px solid #ddd", padding: "5px" }} className="form-group">
                                    <strong>
                                      Settings for Trailer:{" "}
                                      <a href={`https://steemit.com/@${item.user}`} target="_blank">
                                        @{item.user}
                                      </a>
                                    </strong>
                                    <br />
                                    <br />
                                    <div className="form-check" style={{ marginBottom: "5px" }}>
                                      <input className="form-check-input" type="checkbox" value="" id={`enable${item.user}`} checked={item.n.enable} />
                                      <label style={{ color: "#2b0808" }} className="form-check-label" id="enabling" htmlFor="defaultCheck1">
                                        Enable (uncheck for disabling)
                                      </label>
                                    </div>
                                    <div style={{ border: "1px solid #ddd", padding: "5px" }} className="form-group">
                                      <label>Voting weight (%): (Default is 50%)</label>
                                      <input id={`weight${item.user}`} placeholder="Voting weight" name="weight" type="number" className="form-control" value={item.n.weight / 100} step="0.01" min="0" max="100" />
                                      <div className="form-check">
                                        <label style={{ color: "#2b0808" }} className="form-check-label">
                                          <input className="form-check-input" type="radio" name={`votingway${item.user}`} id="votingway" value="1" checked={item.n.votingway === 1} />
                                          Scale voting weight (default)
                                        </label>
                                      </div>
                                      <div className="form-check">
                                        <label style={{ color: "#2b0808" }} className="form-check-label">
                                          <input className="form-check-input" type="radio" name={`votingway${item.user}`} id="votingway" value="2" checked={item.n.votingway === 2} />
                                          Fixed voting weight
                                        </label>
                                      </div>
                                    </div>
                                    <label>Time to wait before voting (minutes): (Default is 0)</label>
                                    <input id={`aftermin${item.user}`} value={item.n.aftermin} placeholder="Upvoting After X Minutes." name="aftermin" type="number" className="form-control" step="1" min="0" max="30" />
                                    <input style={{ marginTop: "10px" }} value="Save Settings" type="submit" className="btn btn-primary" />
                                  </div>
                                </form>
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={() => $(`[id='myModal${item.user}']`).modal("hide")}>Close</Button>
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
                      console.log(data);
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
