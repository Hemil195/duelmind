import React, { useState } from 'react';

function TopicInput({ onDebateStart, isLoading }) {
  const [topic, setTopic] = useState('');

  const handleSubmit = () => {
    // Don't submit if empty or loading
    if (!topic.trim() || isLoading) return;
    onDebateStart(topic);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Agent Debate</h1>
      <p style={styles.subtitle}>
        Two AI agents argue any topic. Judge decides the winner.
      </p>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter a debate topic... e.g. Should AI replace doctors?"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          // Allow Enter key to submit
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          disabled={isLoading}
        />
        <button
          style={{
            ...styles.button,
            opacity: isLoading ? 0.6 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Debating...' : 'Start Debate'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '40px 20px',
    background: '#0a0a0f',
    borderBottom: '1px solid #1e1e30'
  },
  title: {
    fontSize: '42px',
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: '8px'
  },
  subtitle: {
    color: '#666',
    fontSize: '15px',
    marginBottom: '30px'
  },
  inputRow: {
    display: 'flex',
    gap: '12px',
    maxWidth: '700px',
    margin: '0 auto'
  },
  input: {
    flex: 1,
    padding: '14px 18px',
    borderRadius: '10px',
    border: '1px solid #1e1e30',
    background: '#13131e',
    color: '#ffffff',
    fontSize: '15px',
    outline: 'none'
  },
  button: {
    padding: '14px 28px',
    borderRadius: '10px',
    border: 'none',
    background: '#4f8ef7',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer'
  }
};

export default TopicInput;