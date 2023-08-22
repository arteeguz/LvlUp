import React from 'react';
import './App.css';
import './styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>LvlUp</h1>
          <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Browse</a></li>
              <li><a href="#">Search</a></li>
            </ul>
          </nav>
          <button>Login</button>
        </div>
      </header>

      <section className="main-content">
        <div className="about-us">
          <h2>About Us</h2>
          <p>Welcome to LvlUp, your destination for discovering and enjoying the latest music tracks. Our mission is to provide you with a seamless music streaming experience that connects you with your favorite artists and genres.</p>
          <p>With a vast collection of songs and playlists, you can easily create your personalized music journey. Join us today and elevate your music experience with LvlUp!</p>
        </div>
      </section>

      <footer>
        <p>&copy; 2023 LvlUp Music</p>
      </footer>
    </div>
  );
}

export default App;
