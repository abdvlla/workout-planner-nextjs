import React from "react";

const Footer = () => {
  return (
    <footer className="footer bottom-8 footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          Abdallah Nofal
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
