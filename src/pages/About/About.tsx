import './About.css';

const About = () => {
  const version = 'react 18.2.0 ';
  const author = 'Maja Marković';

  return (
    <div className="about">
      <div className="container">
        <h1>About</h1>
        <div className="info">
          <p><strong>Version:</strong> {version}</p>
          <p><strong>Author:</strong> {author}</p>
        </div>
      </div>
    </div>
  );
}

export default About;

