import React from 'react';
import Posts from '../components/Posts';
import Footer from '../components/Footer';
import TopNavbar from '../components/Navbar';
// import { useState,useEffect } from 'react';


export default function HomePage() {



  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <TopNavbar />
      <div
        style={{
          margin: '60px 0px 20px',
        }}
      >
       {/* <Posts post={post} user={user} /> */}
        <Posts />
      </div>
      <Footer />
    </div>
  );
}
