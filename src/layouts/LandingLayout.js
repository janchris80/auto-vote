import { useEffect } from "react";
import '../assets/css/templates/steemauto-design-02/style.css'
import '../assets/scss/font-awesome.scss';
import discordLogo from '../assets/css/templates/steemauto-design-02/i/discord-logo.png'
import videoThumb from '../assets/css/templates/steemauto-design-02/i/sa-video-thumb.png'
import { NavLink } from "react-router-dom";
import BodyStyle from './BodyStyle';


export default function LandingLayout() {

  useEffect(() => {
    const handleLogin = () => { console.log('login in'); }

    const loginButtons = document.querySelectorAll(".login-button");
    loginButtons.forEach((button) => {
      button.addEventListener("click", handleLogin);
    });

    return () => {
      loginButtons.forEach((button) => {
        button.removeEventListener("click", handleLogin);
      });
    };
  }, []);


  return (
    <>
      <BodyStyle className="background-image" />
      <div className="head group">
        <div className="max">
          <div className="half branding">
            <span className="logo">
              <a href="/">HiveVote</a>
            </span>
            <span className="tagline">
              on Hive blockchain
            </span>
          </div>
          <menu className="half user">
            <ul>
              <li>
                <NavLink
                  to='/faq'
                  className="nav-link"
                  activeClassName="active"
                >
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink to='/login' className="button login-button">Login / Register</NavLink>
              </li>
            </ul>
          </menu>
        </div>
      </div>
      <div className="neck group">
        <div className="max">
          <div className="intro group">
            <div className="welcome">
              <p>
                Welcome to the world of automation! HiveVote comes with amazing
                features: you can schedule posts, build a fanbase, follow a
                curation trail, and even automate claiming your payouts.
              </p>
              <a href="#" className="button login-button">Register</a>
            </div>
            <div className="visual">
              <i className="fa fa-cogs"></i>
            </div>
          </div>
          <div className="video">
            <div className="visual">
              <img src={videoThumb} alt='sa-video-thumb' />
            </div>
          </div>
        </div>
      </div>
      <div className="belly">
        <div className="max">
          <div className="features group">
            <div className="feature group">
              <div className="icon">
                <i className="fa fa-clock-o"></i>
              </div>
              <div className="text">
                <h3>Schedule Posts</h3>
                <p>
                  Your time is money...schedule your post in advance, with the
                  help of HiveVote we'll publish your post whenever you want.
                  Write and plan in advance. .. Leave the rest to HiveVote.
                </p>
              </div>
            </div>
            <div className="feature group">
              <div className="icon">
                <i className="fa fa-heart"></i>
              </div>
              <div className="text">
                <h3>Fanbase and Curation Trail</h3>
                <p>
                  Follow famous authors and their trails, Upvote them
                  automatically when they have published a new post, this will
                  maximise your curation reward. The upvote weight can be adjusted
                  manually.
                </p>
              </div>
            </div>
            <div className="feature group">
              <div className="icon">
                <i className="fa fa-trophy"></i>
              </div>
              <div className="text">
                <h3>Claiming Rewards</h3>
                <p>
                  Don't have time to check your Hive blog? No worries! we can
                  claim (redeem) the post rewards for you. Your post reward will
                  go into your Hive wallet.
                </p>
              </div>
            </div>
            <div className="cta">
              <a href="#" className="button login-button">Login / Register</a>
            </div>
          </div>
        </div>
      </div>
      <div className="feet group">
        <div className="max">
          <div className="half links">
            <div className="link">
              <i className="fa fa-github-alt"></i>
              <a href="https://github.com/mahdiyari/steemauto">GitHub</a>
            </div>
            <div className="link">
              <img
                className="discord"
                src={discordLogo}
                alt='discord-logo'
              />
              <a href="https://discord.gg/qhKDfEp">Discord</a>
            </div>
          </div>
          <div className="half credits">
            <a href="https://github.com/myary/steemauto">HiveVote</a>
            Made by Hive Witness
            <a href="https://peakd.com/@mahdiyari">@mahdiyari</a> with Love
            <i className="fa fa-heart"></i> for Hive Users
          </div>
        </div>
        <br /><br /><br />
      </div>
    </>
  );
}

