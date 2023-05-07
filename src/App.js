import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import { useState } from "react";
import { ThemeContext } from "./Contexts";

function App() {
  const [query, setQuery] = useState('')
  const [theme, setTheme] = useState('light')
  const changeTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  return (
    <ThemeContext.Provider value={theme}>
        <Navigation term={query} setTerm={setQuery} setTheme={changeTheme}/>
        <Home term={query}/>
    </ThemeContext.Provider>
  );
}

export default App;
