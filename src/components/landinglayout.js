import React from "react";
import LandingHeader from "./landingheader";

export default function LandingLayoutPage(props) {
  return (
    <div className="layout-wrapper">
      <LandingHeader />
      <div className="grid-container">
        <main className="dashboardMain fullpage noScroll p-grid">
          <section className="landing-page-bg sectionContent p-col h-100">{props.children}</section>
        </main>
      </div>
    </div>
  );
}
