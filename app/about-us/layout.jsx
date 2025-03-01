import React from "react";
import Header from "../../components/Header";

function AboutUsLayout({ children }) {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <div className="mx-5 md:mx-20 lg:mx-36">{children}</div>
    </div>
  );
}

export default AboutUsLayout;
