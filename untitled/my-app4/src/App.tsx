import { Route, Routes } from 'react-router';
import './App.css';
import Layout from './components/Layout.tsx';
import RequireAuth from './components/RequireAuth.tsx';
import Home from './pages/Home.tsx';
import Shop from './pages/Shop.tsx';
import Cart from './pages/Cart.tsx';
import Login from './pages/Login.tsx';
import Profile from './pages/Profile.tsx';
import HooksDemo from './pages/HooksDemo.tsx';
import MemoDemo from './pages/MemoDemo.tsx';
import NotFound from './pages/NotFound.tsx';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />

                {/* Только для вошедших — проверка берёт user из AuthContext */}
                <Route element={<RequireAuth />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>

                <Route path="/hooks" element={<HooksDemo />} />
                <Route path="/memo" element={<MemoDemo />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
