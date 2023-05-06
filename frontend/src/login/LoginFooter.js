/*

Documentation by ChatGPT (modified):

The LoginFooter.js file contains a React component that renders a footer section for a login page. 
The component imports a CSS file for styling and defines an array of footer links with their corresponding URLs.

The LoginFooter function returns a footer element with a navigation element inside. 
The navigation element maps over the footerLinks array and creates an anchor element for each link with the link name as the text and the URL as the href attribute. 
The target and rel attributes are set to "_blank" and "noopener noreferrer" respectively to ensure that the links open in a new tab and prevent security vulnerabilities.

Finally, the component includes a div element with the copyright information for the website. 
The component is exported as the default export of the module, allowing it to be imported and used in other parts of the application.

*/


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
