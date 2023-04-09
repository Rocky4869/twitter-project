import React from "react";
import "../css/LoginFooter.css";
const footerLinks = [
  ["About", "https://about.twitter.com"],
  ["Help Center", "https://help.twitter.com"],
  ["Privacy Policy", "https://twitter.com/tos"],
  ["Cookie Policy", "https://support.twitter.com/articles/20170514"],
  ["Accessibility", "https://help.twitter.com/resources/accessibility"],
  [
    "Ads Info",
    "https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html",
  ],
  ["Blog", "https://blog.twitter.com"],
  ["Status", "https://status.twitterstat.us"],
  ["Careers", "https://careers.twitter.com"],
  ["Brand Resources", "https://about.twitter.com/press/brand-assets"],
  ["Advertising", "https://ads.twitter.com/?ref=gl-tw-tw-twitter-advertise"],
  ["Marketing", "https://marketing.twitter.com"],
  ["Twitter for Business", "https://business.twitter.com"],
  ["Developers", "https://developer.twitter.com"],
  ["Directory", "https://twitter.com/i/directory/profiles"],
  ["Settings", "https://twitter.com/settings"],
];

function LoginFooter() {
  return (
    <footer className="footer">
      <nav className="nav">
        {footerLinks.map(([linkName, href]) => (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={href}
            key={linkName}
            className="no-underline text-white"
          >
            {linkName}
          </a>
        ))}
        <div className="text-white">© 2023 Simplified Twitter, Inc.</div>
      </nav>
    </footer>
  );
}

export default LoginFooter;
