import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { MdFingerprint } from 'react-icons/md';
import {FaFacebook, FaTwitter, FaLinkedin} from 'react-icons/fa'

function Footer() {
  return (
    <div className='footer-container'>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              <MdFingerprint className='navbar-icon' />
              MangoSp
            </Link>
          </div>
          <small className='website-rights'>MangoSp © 2022</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='Kementan'
            >
              <FaFacebook />
              {/* <img src="/kementan.png" alt="kementan" href='https://www.pertanian.go.id/' className='logo' /> */}
            </Link>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='IPB'
            >
              <FaTwitter />
              {/* <img src="ipb-logo.png" alt="ipb" href='https://ipb.ac.id/' className='logo'/> */}
            </Link>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='Arung'
            >
              <FaLinkedin />
              {/* <img src="arung-logo.png" alt="arung" className='logo'/> */}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;