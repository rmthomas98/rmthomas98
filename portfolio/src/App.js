import './App.css';
import Nav from './Components/Nav';
import Project from './Components/Project';
import About from './Components/About'
import weatherApp from './Components/Assets/weather-react.png';
import coffee from './Components/Assets/coffee.png'
import Headshot from './Components/Assets/headshot.png';
import space from './Components/Assets/space.png';

const projects = [
  {
    imgUrl: space,
    title: 'Space Website',
    desc: 'You can Find all of the latest spaceflight news here. You can also find Nasa\'s Astronomy Picture of the Day as well as your weight on the moon.',
    codeUrl: 'https://github.com/rmthomas98/rmthomas98/tree/master/nasa',
    previewUrl: 'https://space-station.netlify.app/'
  },
  {
    imgUrl: coffee,
    title: 'Coffee Shop Website',
    desc: 'Learn more about your local coffee shop! Get to know the baristas, the whole coffee shop menu, look at what people are saying about it, and much more!',
    codeUrl: 'https://github.com/rmthomas98/rmthomas98/tree/master/coffee',
    previewUrl: 'https://rmthomas98.github.io/'
  },
  {
    imgUrl: weatherApp,
    title: 'Weather App',
    desc: 'Look up the weather in any City inside of the United States! All weather data retrieved through OpenWeatherMap Api.',
    codeUrl: 'https://github.com/rmthomas98/rmthomas98/tree/master/weather-react',
    previewUrl: 'https://youthful-babbage-f24b3c.netlify.app/'
  }
]

const App = () => {

  return(
    <>
      <div className="front-page-container">
        <div className="content-container">
          <header>
            <img className="headshot" src={ Headshot } alt="picture of me" />
            <h1>Ryan Thomas</h1>
          </header>
          <Nav />
          <div className="arrow-container">
            <div className="line1"></div>
            <div className="line2"></div>
          </div>
        </div>
      </div>
      <div name="projects" className="project-header" id="projects">
      <h2>Projects</h2>
        <div className="projects-container">
          {projects.map((project, index) => 
            <Project
              img={project.imgUrl}
              alt={project.title}
              title={project.title}
              desc={project.desc}
              code={project.codeUrl}
              preview={project.previewUrl}
              key={index.toString()}
            />
          )}
        </div>
      </div>
      <About />
    </>
  );
}

export default App;
