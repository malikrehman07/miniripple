import React from "react";
import "./TrustedBySection.css";
import { Tag } from "antd";

const logos = [
  "https://img.icons8.com/color/96/netflix.png",
  "https://img.icons8.com/color/96/amazon.png",
  "https://img.icons8.com/color/96/google-logo.png",
  "https://img.icons8.com/color/96/facebook-new.png",
  "https://img.icons8.com/color/96/microsoft.png",
  "https://img.icons8.com/color/96/github.png",
  "https://img.icons8.com/color/96/slack-new.png",
  "https://img.icons8.com/color/96/dropbox.png",
  "https://img.icons8.com/color/96/trello.png",
  "https://img.icons8.com/color/96/figma.png",
  "https://img.icons8.com/color/96/wordpress.png",
  "https://img.icons8.com/color/96/notion.png",
  "https://img.icons8.com/color/96/zoom.png",
];

export default function TrustedBySection() {
  const allLogos = [...logos, ...logos, ...logos]; // triple duplication

  return (
    <section className="trusted-by-section">
      <Tag className="tag-primary">Partner With</Tag>
      <h3 className="h3">Trusted By 100+ Brands</h3>

      <div className="logos-wrapper">
        <div className="logos-track">
          {allLogos.map((logo, index) => (
            <img key={index} src={logo} className="trusted-logo" alt="" />
          ))}
        </div>
      </div>
    </section>
  );
}
