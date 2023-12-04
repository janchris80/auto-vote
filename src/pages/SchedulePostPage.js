import React, { useEffect } from "react";
import { KeychainKeyTypes, KeychainSDK } from "keychain-sdk";
// react-bootstrap components
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Table,
} from "react-bootstrap";
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function SchedulePostPage() {
  const keychain = new KeychainSDK(window, { rpc: 'https://rpc.d.buzz/' });
  const [data, setData] = useState([]);
  const [username, setUsername] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [description, setDescription] = useState('');
  const [parentPerm, setParentPerm] = useState('');
  const [permalink, setPermalink] = useState('');
  const [tags, setTags] = useState([]);
  const [auther, setAuthor] = useState('');
  const [allowVotes, setAllowVotes] = useState(false);
  const [allowCurationRewards, setAllowCurationRewards] = useState(false);

  console.log(keychain, window.hive_keychain);

  useEffect(() => {
    setUsername(user.username)
  }, [username])

  const handlePost = async () => {
    try {
      const formParamsAsObject = {
        data: {
          username,
          title: title,
          body: body,
          parent_perm: parentPerm,
          json_metadata: JSON.stringify(
            {
              "format": "markdown",
              "description": "A blog post",
              "tags": ["Blog"]
            }
          ),
          permlink: permalink,
          comment_options: JSON.stringify(
            {
              "author": username,
              "permlink": permalink,
              "max_accepted_payout": "10000.000 HBD",
              "allow_votes": true,
              "allow_curation_rewards": true,
              "extensions": [],
              "percent_hbd": 63
            }
          )
        }
      };
      const post = await keychain.post(formParamsAsObject.data);
      console.log({ post });
    } catch (error) {
      console.log({ error });
    }
  }

  const postContent = async () => {
    // if (window.hive_keychain) {
    //   // Use hive_keychain API to request private key
    //   window.hive_keychain.requestPost(
    //     'iamjc93', // account
    //     'Hello World!', // title
    //     '## This is a blog post \n\nAnd this is some text', // body
    //     'Blog', // parent_perm
    //     {
    //       format: 'markdown',
    //       description: 'A blog post',
    //       tags: ['Blog']
    //     }, // json_metadata
    //     'hello-i-am-using-request-post-from-hive-keychain', // permlink
    //     {
    //       "author": "iamjc93",
    //       "permlink": "hi-i-am-using-request-post-from-hive-keychain",
    //       "max_accepted_payout": "100000.000 SBD",
    //       "percent_steem_dollars": 10000,
    //       "allow_votes": true,
    //       "allow_curation_rewards": true,
    //       "extensions": [
    //         [
    //           0,
    //           {
    //             "beneficiaries": [
    //               { "account": "yabapmatt", "weight": 1000 },
    //               { "account": "steemplus-pay", "weight": 500 }
    //             ]
    //           }
    //         ]
    //       ]
    //     },
    //     (response) => {
    //       console.log(response);
    //     }
    //   );

    // } else {
    //   alert('Hive Keychain is not installed.');
    // }


    try {

      // const formParamsAsObject = {
      //   "data": {
      //     "username": "iamjc93",
      //     "tx": {
      //       "ref_block_num": 25791,
      //       "ref_block_prefix": 879493653,
      //       "expiration": "2023-11-15T06:46:22",
      //       "operations": [
      //         [
      //           "comment",
      //           {
      //             "parent_author": "",
      //             "parent_permlink": "hive-keychain",
      //             "author": "iamjc93",
      //             "permlink": "hello-world",
      //             "title": "Hello World!",
      //             "body": "This is my first post using Hive Keychain.",
      //             "json_metadata": JSON.stringify({ tags: ['hive-keychain'] }),
      //           },
      //         ],
      //       ],
      //       "extensions": [],
      //     },
      //     "method": KeychainKeyTypes.posting,
      //   },
      //   "broadcastSignedTx": true,
      // };

      // const signtx = await keychain.signTx(formParamsAsObject.data);
      // console.log({ signtx });

      const account = 'dbuzz';
      const author = 'iamjc93';
      const permlink = 'trying-to-sign-a-post-in-my-localhost';
      const title = 'Signing a post and broadcast via php backend';
      const body = 'Your post content...';
      const parent_perm = 'blogs';
      const parent_username = 'iamcj93';
      const json_metadata = JSON.stringify({
        "format": "markdown",
        "description": "A blog post",
        "tags": [
          "Blog"
        ]
      });

      const comment_options = JSON.stringify({
        "author": author,
        "permlink": permlink,
        "max_accepted_payout": "10000.000 HBD",
        "allow_votes": true,
        "allow_curation_rewards": true,
        "extensions": [],
        "percent_hbd": 63
      })

      hive_keychain.requestPost(
        account,
        title,
        body,
        parent_perm,
        null,
        json_metadata,
        permlink,
        comment_options,
        function (response) {
          console.log(response);
          if (response.success) {
            // Send the signed transaction to your backend
            // sendTransactionToBackend(response.result);
          } else {
            // Handle errors
            console.error('Error signing transaction:', response.message);
          }
        }
      );
    } catch (error) {
      console.log({ error });
    }

  }

  function callbackFunction(response) {
    // Handle the response from Hive Keychain
    console.log(response);
  }

  const after = (x) => {
    const sec = x - Date.now();
    if (sec > 0) {
      if (sec > 60) {
        if (sec > 3600) {
          if (sec > 86400) {
            return `After ${Math.round(sec / 86400)} Days`;
          } else {
            return `After ${Math.round(sec / 3600)} Hours`;
          }
        } else {
          return `After ${Math.round(sec / 60)} Minutes`;
        }
      } else {
        return `After ${Math.round(sec)} Seconds`;
      }
    } else {
      return "Processed";
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Button onClick={() => postContent()}>Click me</Button>
              <h3>Welcome {username},</h3>
              <br />
              This page is where you can schedule a post to publish in the future.
              <br />
              <span style={{ color: "red" }}>
                Blockchain will not allow posting 2 times within 5 minutes. Leave at least 5 minutes between your posts.
              </span>
              <Form style={{ display: "" }} id="post" onSubmit={() => post()}>
                {/* title */}
                <Form.Group>
                  <Form.Label>Title:</Form.Label>
                  <Form.Control id="title" placeholder="Post Title" name="title" type="text" required />
                </Form.Group>
                {/* content/body */}
                <Form.Group>
                  <Form.Label>Content: (You can write your post on Steemit.com and copy the markdown or raw HTML Here.)</Form.Label>
                  <Form.Control as="textarea" rows={7} id="content" placeholder="Post Content" name="content" type="text" required />
                  <sub>
                    <a href="https://simplemde.com/markdown-guide">Markdown</a> supported
                  </sub>
                </Form.Group>
                {/* tags */}
                <Form.Group>
                  <Form.Label>Tags: (up to 5 tags and one space between them)</Form.Label>
                  <Form.Control id="tags" placeholder="tag1 tag2 tag3 tag4 tag5" name="tags" type="text" required />
                  <sub>
                    <a style={{ color: "red" }} href="" onClick={() => $("#modaltags").modal("show")}>
                      Note about tags
                    </a>{" "}
                    (?)
                  </sub>
                </Form.Group>
                {/* select rewards type */}
                <Form.Group>
                  <Form.Label>Rewards</Form.Label>
                  <Form.Control as="select" id="rewardstype" name="rewardstype">
                    <option value="0">Default (50% / 50%)</option>
                    <option value="1">Power Up 100%</option>
                    <option value="2">Decline Payout (no rewards)</option>
                  </Form.Control>
                </Form.Group>
                {/* select beneficaries reward */}
                <Form.Group>
                  <Form.Label>
                    Optional beneficiary{" "}
                    <abbr data-toggle="tooltip" title="You can donate certain percent of your posts reward to the steemauto. Check FAQ">
                      ?
                    </abbr>
                  </Form.Label>
                  <Form.Control as="select" id="beneficiarytype" name="beneficiarytype">
                    <option value="0">None</option>
                    <option value="1" selected>
                      1% @steemauto
                    </option>
                    <option value="5">5% @steemauto</option>
                    <option value="10">10% @steemauto</option>
                    <option value="15">15% @steemauto</option>
                    <option value="20">20% @steemauto</option>
                    <option value="25">25% @steemauto</option>
                  </Form.Control>
                </Form.Group>
                {/* upvote after publish */}
                <Form.Group>
                  <Form.Check id="upvotepost" type="checkbox" label="Upvote post" defaultChecked />
                </Form.Group>
                {/* date & time list */}
                <hr />
                <Form.Group>
                  <Form.Label>
                    Current date & time is <span style={{ color: "green" }}>{new Date().toISOString()}</span>
                  </Form.Label>
                  <br />
                  <Form.Label style={{ marginTop: "7px" }}>Publish at</Form.Label>
                  <Form.Control as="select" id="date" name="date" required>
                    {data.map((item, i) => (
                      <option value={i} key={i}>
                        {new Date(item).toISOString()}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                {/* submit button */}
                <Button style={{ marginTop: "10px" }} variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
              <br />
              <div id="result"></div>
              <h3 ng-if="viewer_rendered()">Preview:</h3>
              <div style={{ width: "100%" }} ng-bind-html="viewer_rendered()"></div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h3 style={{ paddingBottom: "10px" }}>Scheduled Posts:</h3>
              <div style={{ maxHeight: "600px", overflow: "auto" }} className="table-responsive-vertical shadow-z-1">
                {/* Table starts here */}
                <Table id="table" className="table table-hover table-mc-light-blue">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Content</th>
                      <th>Publish Time</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((x, i) => (
                      <tr className="tr2" key={i}>
                        <td data-title="ID">{i}</td>
                        <td data-title="Name">{x.title}</td>
                        <td data-title="Status">
                          <textarea disabled="" height="50px">
                            {x.content}
                          </textarea>
                        </td>
                        <td data-title="Status">{after(x.date)}</td>
                        <td data-title="Status">
                          {x.status === 0 ? "Waiting" : x.status === 1 ? "Published" : "Error"}
                          <sup>*</sup>
                        </td>
                        <td data-title="Status">
                          <Button variant="danger" onClick={() => (window.confirm("Are You Sure?") ? deletepost(x.id) : null)}>
                            DELETE
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <sup>*</sup>: If you got an error, check tags. Bad formatted tags can cause an error in publishing posts.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
