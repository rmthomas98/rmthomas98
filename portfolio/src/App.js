import './App.css';
import Buttons from './Components/Buttons';
import Project from './Components/Project';
import About from './Components/About'
import weatherApp from './Components/Assets/weather-react.png';
import coffee from './Components/Assets/coffee.png'

const projects = [
  {
    imgUrl: weatherApp,
    title: 'Weather React App',
    desc: 'This is the first small application I created using React. I worked with an API from openWeatherMap to retrieve the data.',
    codeUrl: 'https://github.com/rmthomas98/rmthomas98/tree/master/weather-react',
    previewUrl: 'https://youthful-babbage-f24b3c.netlify.app/'
  },
  {
    imgUrl: coffee,
    title: 'Coffee Shop Website',
    desc: 'I found an outdated local coffee shops website and recreated it. I used HTML, CSS, and a little bit of Jquery with this project.',
    codeUrl: 'https://github.com/rmthomas98/rmthomas98/tree/master/coffee',
    previewUrl: 'https://rmthomas98.github.io/',
  }
];

const App = () => {

  return(
    <>
      <div className="front-page-container">
        <div className="content-container">
          <header>
            <h1>Ryan Thomas</h1>
          </header>
          <Buttons />
        </div>
      </div>
      <div className="project-header" id="projects">
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
