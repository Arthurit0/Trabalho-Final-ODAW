import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'

/* componentes */
import Navbar from './components/layout/Navbar'
import Message from './components/layout/Message'
import Container from './components/layout/Container'

/* pages */
import Home from './components/pages/Home'
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Profile from './components/pages/User/Profile'
import AddPet from './components/pages/Pet/AddPet'
import MyPets from './components/pages/Pet/MyPets'
import EditPet from './components/pages/Pet/EditPet'
import PetDetails from './components/pages/Pet/PetDetails'
import MyAdoptions from './components/pages/Pet/MyAdoptions'

/* contexts */
import { UserProvider } from './context/UserContext'
function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} > </Route>
            <Route path="/register" element={<Register />}> </Route>
            <Route path="/user/profile" element={<Profile />}></Route>
            <Route path="/pet/add" element={<AddPet />}></Route>
            <Route path="/pet/edit/:id" element={<EditPet />}></Route>
            <Route path="/pet/mypets" element={<MyPets />}></Route>
            <Route path="/pet/myadoptions" element={<MyAdoptions />}></Route>
            <Route path="/pet/:id" element={<PetDetails />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </Container>
      </UserProvider>
    </Router>
  )
}

export default App
