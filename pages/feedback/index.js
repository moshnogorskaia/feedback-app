import { buildFeedbackPath, extractFeedback } from '../api/feedback';
import { useState } from 'react';

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHandler(id) {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }

  return (
    <>
      {feedbackData && (
        <p>
          {feedbackData.email}: {feedbackData.text}
        </p>
      )}
      <ul>
        {props.feedbackItems.map(({ id, text }) => (
          <li key={id}>
            {text}{' '}
            <button onClick={loadFeedbackHandler.bind(null, id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
