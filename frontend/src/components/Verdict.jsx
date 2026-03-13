import React from 'react';

function Verdict({ verdict }) {
  const blocks = buildBlocks(verdict || '');

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          Judge Verdict
        </div>
        <div style={styles.verdictBody}>
          {blocks.map((block, index) => {
            if (block.type === 'hr') {
              return <hr key={`hr-${index}`} style={styles.rule} />;
            }

            if (block.type === 'h3') {
              return (
                <h3 key={`h3-${index}`} style={styles.h3}>
                  {renderInline(block.text)}
                </h3>
              );
            }

            if (block.type === 'ol') {
              return (
                <ol key={`ol-${index}`} style={styles.orderedList}>
                  {block.items.map((item, itemIndex) => (
                    <li key={`li-${index}-${itemIndex}`} style={styles.listItem}>
                      {renderInline(item)}
                    </li>
                  ))}
                </ol>
              );
            }

            return (
              <p key={`p-${index}`} style={styles.paragraph}>
                {renderInline(block.text)}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`b-${index}`}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={`t-${index}`}>{part}</React.Fragment>;
  });
}

function buildBlocks(rawText) {
  const lines = rawText.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];

  let paragraphLines = [];
  let listItems = [];

  const flushParagraph = () => {
    if (paragraphLines.length) {
      blocks.push({ type: 'p', text: paragraphLines.join(' ').trim() });
      paragraphLines = [];
    }
  };

  const flushList = () => {
    if (listItems.length) {
      blocks.push({ type: 'ol', items: [...listItems] });
      listItems = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      return;
    }

    if (/^[-*_]{3,}$/.test(trimmed)) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'hr' });
      return;
    }

    const listMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (listMatch) {
      flushParagraph();
      listItems.push(listMatch[1]);
      return;
    }

    if (trimmed.startsWith('### ')) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'h3', text: trimmed.replace(/^###\s+/, '') });
      return;
    }

    flushList();
    paragraphLines.push(trimmed);
  });

  flushParagraph();
  flushList();

  return blocks;
}

const styles = {
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 20px 60px'
  },
  card: {
    background: 'linear-gradient(135deg, rgba(79,142,247,0.08), rgba(164,79,247,0.08))',
    border: '1px solid rgba(79,142,247,0.25)',
    borderRadius: '16px',
    padding: '32px'
  },
  header: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: '20px',
    letterSpacing: '0.2px'
  },
  verdictBody: {
    color: '#d7deed',
    fontSize: '16px',
    lineHeight: '1.8'
  },
  paragraph: {
    margin: '0 0 16px'
  },
  h3: {
    margin: '12px 0 10px',
    fontSize: '18px',
    lineHeight: '1.4',
    color: '#ffffff'
  },
  orderedList: {
    margin: '0 0 18px',
    paddingLeft: '24px'
  },
  listItem: {
    marginBottom: '10px'
  },
  rule: {
    border: 'none',
    borderTop: '1px solid rgba(79,142,247,0.28)',
    margin: '18px 0'
  },
  inlineCode: {
    color: '#aaa',
    fontSize: '15px'
  }
};

export default Verdict;