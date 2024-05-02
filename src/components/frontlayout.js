import React from "react";
import Header from "./header";

export default function FrontLayoutPage(props) {
  return (
    <div className="layout-wrapper">
      <Header />
      <div className="grid-container">
        <main className="dashboardMain fullpage noScroll p-grid">
          <section className="sectionContent p-col h-100">{props.children}</section>
        </main>
      </div>
    </div>
  );
}
