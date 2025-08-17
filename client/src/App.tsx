import React, {FC, useContext, useEffect} from 'react';
import {Context} from './index'
import {observer} from 'mobx-react-lite'
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import AppRouter from './components/AppRouter';
import {BrowserRouter} from "react-router-dom";



const App: FC = () => {
  const {userstore} = useContext(Context)
 
  useEffect(()=>{
    if(localStorage.getItem('token')){
      userstore.checkAuth()
    }
  },[])
 
  if(userstore.isLoading){
    return <div>Загрузка...</div>
  }

  
  return (

<BrowserRouter>
   <div className="app-root">
    <NavBar />
    <main className="app-content">
      <AppRouter />
    </main>
    <Footer />
  </div>
</BrowserRouter>
  
  );
}

export default observer(App);
