import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Personal from "./sections/Personal";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

export default function App() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)] selection:bg-blue-500/20">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Personal />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
