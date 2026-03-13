import React, { useState } from 'react';
import TopicInput from './components/TopicInput';
import DebateArena from './components/DebateArena';
import Verdict from './components/Verdict';
import { runDebate } from './api';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages]   = useState([]);
  const [verdict, setVerdict]     = useState('');
  const [error, setError]         = useState('');
  const [topic, setTopic]         = useState('');

  const handleDebateStart = async (inputTopic) => {
    // Reset previous results
    setMessages([]);
    setVerdict('');
    setError('');
    setTopic(inputTopic);
    setIsLoading(true);

    try {
      const result = await runDebate(inputTopic);
      setMessages(result.messages);
      setVerdict(result.verdict);
    } catch (err) {
      setError('Something went wrong. Is your backend running?');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>

      {/* Topic Input Section */}
      <TopicInput
        onDebateStart={handleDebateStart}
        isLoading={isLoading}
      />

      {/* Loading State */}
      {isLoading && (
        <div style={styles.loading}>
          <div style={styles.loadingText}>
            Agents are debating... this takes ~30 seconds
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={styles.error}>{error}</div>
      )}

      {/* Debate Results */}
      {messages.length > 0 && (
        <>
          <div style={styles.topicBanner}>
            Topic: "{topic}"
          </div>
          <DebateArena messages={messages} />
        </>
      )}

      {/* Judge Verdict */}
      {verdict && <Verdict verdict={verdict} />}

    </div>
  );
}

const styles = {
  loading: {
    textAlign: 'center',
    padding: '60px 20px'
  },
  loadingText: {
    color: '#4f8ef7',
    fontSize: '16px',
    fontFamily: 'monospace'
  },
  error: {
    textAlign: 'center',
    color: '#f74f6a',
    padding: '40px',
    fontSize: '15px'
  },
  topicBanner: {
    textAlign: 'center',
    color: '#555',
    fontSize: '14px',
    fontFamily: 'monospace',
    padding: '20px',
    borderBottom: '1px solid #1e1e30'
  }
};

export default App;