"use client";

import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon, LinkedinIcon } from "react-share";
import { useEffect, useState } from "react";

const SocialShare = ({ title, address }) => {
  const [hotelUrl, setHotelUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHotelUrl(window.location.href);
    }
  }, []);
  
  return (
    <div className="flex space-x-3 mt-4">
      <FacebookShareButton url={hotelUrl} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={hotelUrl} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <WhatsappShareButton url={hotelUrl} title={title} separator=" - ">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <LinkedinShareButton url={hotelUrl} title={title} summary={address}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
};

export default SocialShare;
