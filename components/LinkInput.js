import styles from './LinkInput.module.css';

export default function LinkInput({ link, setLink, onSubmit, result, isLoading, error }) {

  let title, summary;
  if (result) {
    const splitResult = result.split('SUMMARY:');
    title = splitResult[0].replace('TITLE:', '').trim();
    summary = splitResult[1] ? splitResult[1].trim() : null;
  }

  return (
    <main className={styles.main}>
      <h3 className={styles.mainHeading}>Segment Feature Summarizer</h3>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          className={styles.inputField}
          type="text"
          name="link"
          placeholder="Enter a blog link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <input type="submit" value="Generate Summary" className={styles.submitButton}/>
      </form>
      {isLoading ? (
        <div className={styles.loading}>
          <img src="/deedee-animation.gif" alt="Loading" className={styles.loadingImg}/>
          <p>Fetching your results...</p>
        </div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : result ? (
        <div className={styles.result}>
          <h3 className={styles.resultTitle}>{title}</h3>
          <p className={styles.resultSummary}>{summary}</p>
        </div>
      ) : (
        <div className={styles.placeholder}>
          <img src="/deedee_search.png" alt="No data" className={styles.placeholderImg} />
          <p className={styles.placeholderText}>Enter a link from Deselect support or click on one of the features to get a summary of the feature being discussed.</p>
        </div>
      )}
    </main>
  );
}
