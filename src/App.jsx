import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Personal from "./sections/Personal";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Skills />
      <Personal />
      <Contact />

      <footer className="mt-16 border-t border-[color:var(--border)] pt-8 text-center text-xs text-[color:var(--muted)]">
        © {new Date().getFullYear()} Harsha Venkateshwara — All rights reserved.
      </footer>
    </div>
  );
}
