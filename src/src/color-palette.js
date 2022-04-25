import './color-palette.css';

function ColorPalette(props) {
  const colors = [
    '#00ffff',
    '#0B0C10',
    '#1f2833',
    '#C5C6C7',
    '#EEEEFF',
    '#66FCF1',
    '#45A29E',
  ];

  const colorSwatches = [];
  for (const color of colors) {
    colorSwatches.push(
      <div
        style={{background: color}}
        className="swatch"
      >
        <p>{color}</p>
      </div>
    );
  }

  return (
    <div className="palette">
      {colorSwatches}
    </div>
  );
}

export default ColorPalette;
