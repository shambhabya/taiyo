import { Link, Route, Routes } from "react-router-dom";
import Contacts from "./pages/Contacts";
import Charts from "./pages/Charts";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white lg:flex">
      <div className="lg:w-52 bg-slate-800 flex justify-between lg:justify-normal lg:flex-col">
        <div className="p-4 text-center text-xl font-bold lg:border-b border-gray-700">
          Taiyo
        </div>

        <ul className="flex lg:flex-col">
          <li className="lg:border-b border-gray-700">
            <Link to="/" className="block p-4 hover:bg-gray-700">
              Contacts
            </Link>
          </li>
          <li className="lg:border-b border-gray-700">
            <Link to="/charts" className="block p-4 hover:bg-gray-700">
              Charts
            </Link>
          </li>
        </ul>
      </div>

      <main className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/charts" element={<Charts />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
