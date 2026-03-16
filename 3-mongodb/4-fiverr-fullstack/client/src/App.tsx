import type { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/header";
import Footer from "./components/footer";
import Search from "./pages/search";
import Detail from "./pages/detail";
import AddGig from "./pages/add-gig";
import MyGigs from "./pages/my-gigs";
import Protect from "./components/protect";

const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/search" element={<Search />} />
            <Route path="/detail/:id" element={<Detail />} />

            {/* Sadece satıcı hesapları bu sayfalara erişebilsin */}
            <Route element={<Protect />}>
              <Route path="/add-gig" element={<AddGig />} />
              <Route path="/my-gigs" element={<MyGigs />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
