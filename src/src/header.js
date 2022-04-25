import './header.css';
import {
  FaGithub,
  FaEnvelope,
  FaLinkedin
} from 'react-icons/fa';

function Header(props) {
  const icons = [{
    "icon": <FaGithub />,
    "link": "https://github.com/nickrodgers42"
  }, {
    "icon": <FaEnvelope />,
    "link": "mailto:nick.rodgers42@gmail.com"
  }, {
    "icon": <FaLinkedin />,
    "link": "https://www.linkedin.com/in/nicholas-rodgers42/"
  }]
  return (
      <div className="header">
        <a href="/">
          <p className="logo">Nick Rodgers</p>
        </a>
        <div className="spacer" />
        <div className="icons">
          {icons.map((icon) => {
            return (
              <a
                className="icon"
                href={icon["link"]}
              >
                {icon["icon"]}
              </a>
            );
          })}
        </div>
      </div>
  );
}

export default Header;
