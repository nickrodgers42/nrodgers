import "./terminal.css";

const Terminal = (props) => {
  return (
    <div className="terminal">
      <div className="title-bar">
        <div className="window-controls">
          <div className="close" />
          <div className="maximize" />
          <div className="minimize" />
        </div>
      </div>
      <div className="terminal-body">
        <div className="terminal-contents">
          <p>&gt; ./under-construction.exe&#9608;</p>
        </div>
      </div>
    </div>
  );
}

export default Terminal;
