import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const SocialMediaIcons = () => {
  return (
    <div className="flex space-x-4 justify-center mt-6">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} className="text-blue-600 text-2xl hover:scale-110 transition transform duration-200" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} className="text-blue-400 text-2xl hover:scale-110 transition transform duration-200" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} className="text-pink-500 text-2xl hover:scale-110 transition transform duration-200" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} className="text-blue-700 text-2xl hover:scale-110 transition transform duration-200" />
      </a>
    </div>
  );
};

export default SocialMediaIcons;
