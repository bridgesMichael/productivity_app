import { useState, useEffect } from "react";

export const RandKitty = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchKitty = async () => {
      const api_url = "http://shibe.online/api/cats?count=1";
      const response = await fetch(api_url);
      const data = await response.json();
      setUrl(data[0]);
    };
    fetchKitty();
  }, []);
  return (
    <div>
      <img
        src={url}
        alt="Random cat"
        style={{ maxWidth: "250px", maxHeight: "250px" }}
      />
    </div>
  );
};
