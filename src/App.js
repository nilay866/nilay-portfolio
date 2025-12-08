import React from "react";
import "./App.css";

function ProjectCard({ title, desc, link }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{desc}</p>
      {link && <a href={link}>View</a>}
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <header className="hero">
        <h1>Nilay — DevOps & Cloud Engineer</h1>
        <p>AWS | Docker | Jenkins | Python | Linux</p>
        <div className="cta">
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </header>

      <main className="container">
        <section id="skills">
          <h2>Skills</h2>
          <div className="skills">
            <span>AWS</span>
            <span>Docker</span>
            <span>Jenkins</span>
            <span>Python</span>
            <span>Git</span>
            <span>Linux</span>
          </div>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          <div className="grid">
            <ProjectCard
              title="Portfolio Website"
              desc="React + Docker + DevOps Pipeline"
            />
            <ProjectCard
              title="E-commerce Clone"
              desc="Backend + Docker + Deployment"
            />
          </div>
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <p>Email: <a href="mailto:nilay@example.com">nilay@example.com</a></p>
        </section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Nilay
      </footer>
    </div>
  );
}

export default App;