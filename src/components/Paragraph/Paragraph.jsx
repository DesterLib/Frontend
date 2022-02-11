import React from 'react';

const Paragraph = ({ text, length = 500 }) => {
    const [showLess, setShowLess] = React.useState(true);

    if (text.length < length) {
      return <p>{text}</p>;
    }
  
    return (
      <div>
        <p>{ showLess ? `${text.slice(0, length)}...` : text }</p>
        <a
          style={{ color: "tomato", cursor: "pointer" }}
          onClick={() => setShowLess(!showLess)}
        >
        View {showLess ? "More" : "Less"}
        </a>
      </div>
    );
};

export default Paragraph;
