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
import NeuralBackground from "./components/NeuralBackground";

export default function App() {
  return (
    <div className="relative min-h-screen text-[color:var(--text)] selection:bg-blue-500/20">
      {/* Site-wide living background — a fixed neural-network field that sits
          behind every section (hero → footer). The base color is painted by
          html/body (var(--bg)); the net draws over it and a soft radial veil
          keeps content readable while letting the field breathe at the edges. */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <NeuralBackground className="absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, transparent 55%, var(--bg) 100%)",
          }}
        />
      </div>

      <div className="relative z-10">
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
    </div>
  );
}
