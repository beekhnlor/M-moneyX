import React from "react";
import MainNav from "../components/MainNav"; // <-- แก้ import ให้ตรงกับชื่อไฟล์
import Home from "../pagesUsers/Home";
import Service from "../pagesUsers/Service";
import Message from "../pagesUsers/Message";
import Performance from "../pagesUsers/Performance";
import DownloadChannel from "../pagesUsers/DownloadChannel";
import About from "../pagesUsers/About";
import Footer from '../pagesUsers/footer'

const LandingPage = () => {
  return (
    <div className="font-sans">
    
      {/* เพิ่ม MainNav */}
      <main className="pt-24">
        <section id="home" className="">
          <Home />
        </section>

        <section id="service" className="">
          <Service />
        </section>

        <section id="message" className="">
          <Message />
        </section>

        <section id="performance" className="">
          <Performance />
        </section>

        <section id="download" className="">
          <DownloadChannel />
        </section>

        <section id="about" className="">
          <About />
        </section>
        
        {/* แก้ id ซ้ำ และเปลี่ยนเป็น footer */}
        <section id="footer" className="">
          <Footer/>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;