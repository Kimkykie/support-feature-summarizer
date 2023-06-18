import Head from "next/head";
import { useState } from "react";
import LinkInput from "../components/LinkInput";
import features from "../data/features.json";
import styles from "./index.module.css"

export default function Home() {
  const [link, setLink] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFeatureClick = (featureLink) => {
    setLink(featureLink);
    setResult();
  };

  const isValidLink = (link) => {
    return link.startsWith("https://support.deselect.com/");
  };

  async function onSubmit(event) {
    event.preventDefault();

    if (!isValidLink(link)) {
      setError(
        "Please enter a valid link starting with https://support.deselect.com/"
      );
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw new Error(
          data.error || `Request failed with status ${response.status}`
        );
      }

      setResult(data.result);
      setLink("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.mainContainer}>
      <Head>
        <title>Segment Feature Summarizer</title>
        <link rel="icon" href="/penguin.ico" />
      </Head>
      <div className={styles.linkInputSection}>
        <LinkInput
          link={link}
          setLink={setLink}
          onSubmit={onSubmit}
          result={result}
          isLoading={isLoading}
          error={error}
        />
      </div>
      <div className={styles.featureSection}>
        <h2>Features</h2>
        <ul className={styles.featureList}>
          {features.map((feature, index) => (
            <li key={index} onClick={() => onFeatureClick(feature.link)} className={styles.featureItem}>
              {feature.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
