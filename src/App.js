import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Order from "./pages/Order";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Search from "./component/Search";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
import Post from "./pages/Post";
import Skin from "./pages/Post/Skin";

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <Search />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Collection" element={<Collection />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/PlaceOrder" element={<PlaceOrder />} />
        <Route path="/Product/:ProductId" element={<Product />} />
        <Route path="/Post" element={<Post />} />
        <Route path="/Post/skin" element={<Skin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
