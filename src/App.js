import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { React, useEffect, useState } from 'react';
import { NavBar } from './components/NavBar';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
// pages
import { AuthPage } from './Pages/AuthPage';
import { ChatPage } from './Pages/ChatPage';


function App() {

  const [userName, setUserName] = useState("");
  const [isLogged, setIsLogged] = useState(null);

  // keep data when a page is refreshed in the browser
  useEffect(() => {
    const storedUserName = localStorage.getItem('username');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('username', userName);
  }, [userName]);


  return (
    <Router>
      <div className='MainApp'>
        <NavBar />

        <div className='switchPaths'>
          <Switch>

            <Route path="/auth">
              <AuthPage 
              userName={userName} setUserName={setUserName}
              setIsLogged={setIsLogged}
              />

              {/* if the user is logged is redirected to the chat page*/}
              {isLogged ? 
                <Route exact path="/auth">
                  <Redirect to="/chat" />
                </Route>: 
                                <Route exact path="/chat">
                                <Redirect to="/auth" />
                              </Route>
              }
            </Route>

            <Route path="/chat">
              <ChatPage
              userName={userName} setIsLogged={setIsLogged}
              />
            </Route>

          </Switch>
        </div>


      </div>
    </Router>
  );
};


export default App;
