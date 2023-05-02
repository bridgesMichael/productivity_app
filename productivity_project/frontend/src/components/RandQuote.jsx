import { useState, useEffect } from "react";

export const RandomQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      const api_url =
        "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/quotes/";
      const response = await fetch(api_url);
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      setQuote(data[randomIndex].q);
      setAuthor(data[randomIndex].a);
    };
    fetchQuote();
  }, []);

  return (
    <div>
      <h3>{quote}</h3>
      <h4>- {author}</h4>
    </div>
  );
};
