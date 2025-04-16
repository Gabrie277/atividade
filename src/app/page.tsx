
import Contacts from "./components/Contacts";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Perfil from "./components/Perfil";



export default function Home() {
  return (
    <main>
      <Hero />
      <Perfil />
      <Skills />
      <Projects />
      <Contacts />
     
    </main>
  );
}