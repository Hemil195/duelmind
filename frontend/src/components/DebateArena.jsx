import React from 'react';

function DebateArena({ messages }) {
  // Separate proponent and opponent messages
  const proponentMessages = messages.filter(m =>
    m.includes('[PROPONENT')
  );
  const opponentMessages = messages.filter(m =>
    m.includes('[OPPONENT')
  );

  // Clean the label from message text for display
  const cleanMessage = (msg) => {
    return msg.replace(/\[(PROPONENT|OPPONENT) - Round \d+\]: /, '');
  };

  return (
    <div style={styles.container}>

      {/* Column Headers */}
      <div style={styles.headers}>
        <div style={styles.proponentHeader}>
          Proponent (Argues FOR)
        </div>
        <div style={styles.vsBox}>VS</div>
        <div style={styles.opponentHeader}>
          Opponent (Argues AGAINST)
        </div>
      </div>

      {/* Debate Rounds */}
      {proponentMessages.map((proMsg, index) => (
        <div key={index} style={styles.roundRow}>

          {/* Proponent Card */}
          <div style={styles.proponentCard}>
            <div style={styles.roundLabel}>Round {index + 1}</div>
            <p style={styles.messageText}>
              {cleanMessage(proMsg)}
            </p>
          </div>

          {/* Round Number Center */}
          <div style={styles.roundCenter}>
            {index + 1}
          </div>

          {/* Opponent Card */}
          <div style={styles.opponentCard}>
            <div style={styles.roundLabel}>Round {index + 1}</div>
            <p style={styles.messageText}>
              {opponentMessages[index]
                ? cleanMessage(opponentMessages[index])
                : '...'}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  headers: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px'
  },
  proponentHeader: {
    flex: 1,
    background: 'rgba(79,142,247,0.1)',
    border: '1px solid rgba(79,142,247,0.3)',
    color: '#4f8ef7',
    padding: '12px 20px',
    borderRadius: '10px',
    fontWeight: '700',
    textAlign: 'center'
  },
  vsBox: {
    background: 'rgba(247,209,79,0.1)',
    border: '1px solid rgba(247,209,79,0.3)',
    color: '#f7d14f',
    padding: '12px 16px',
    borderRadius: '10px',
    fontWeight: '800',
    fontSize: '14px'
  },
  opponentHeader: {
    flex: 1,
    background: 'rgba(247,79,106,0.1)',
    border: '1px solid rgba(247,79,106,0.3)',
    color: '#f74f6a',
    padding: '12px 20px',
    borderRadius: '10px',
    fontWeight: '700',
    textAlign: 'center'
  },
  roundRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
    alignItems: 'flex-start'
  },
  proponentCard: {
    flex: 1,
    background: '#13131e',
    border: '1px solid rgba(79,142,247,0.2)',
    borderRadius: '12px',
    padding: '20px'
  },
  opponentCard: {
    flex: 1,
    background: '#13131e',
    border: '1px solid rgba(247,79,106,0.2)',
    borderRadius: '12px',
    padding: '20px'
  },
  roundCenter: {
    width: '36px',
    height: '36px',
    background: '#1e1e30',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#555',
    fontSize: '13px',
    fontWeight: '700',
    flexShrink: 0,
    marginTop: '40px'
  },
  roundLabel: {
    fontSize: '11px',
    color: '#444',
    fontFamily: 'monospace',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  messageText: {
    color: '#ccc',
    fontSize: '14px',
    lineHeight: '1.7',
    margin: 0
  }
};

export default DebateArena;