import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux'
import authService from './appWrite/auth';
import { login, logout } from './store/authSlice';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { Outlet } from 'react-router-dom';


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login({ user }))
        }
        else {
          dispatch(logout({ user }))
        }
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message)
      })
  }, [])


  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray 400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO :  {/* <Outlet /> */}
        </main>
        <Footer />

      </div>
    </div>
  )

    : null

}

export default App;
