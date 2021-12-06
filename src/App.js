import './App.css';
import CartProvider from './context/CartContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import ItemDetailContainer from './containers/itemDetailContainer/ItemDetailContainer';
import ItemListContainer from './containers/itemListContainer/ItemListContainer';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <main className="App">
              <ItemListContainer greetings="Bienvenidos a Somos Wica" />
            </main>
          </Route>
          <Route exact path="/categoria/:categoryID">
            <ItemListContainer greetings="Bienvenidos a Somos Wica" />
          </Route>
          <Route exact path="/item/:itemID">
            <ItemDetailContainer />
          </Route>
          <Route exact path="/cart">
            <Cart />
					</Route>
          <Route exact path="/checkout">
            <Checkout />
					</Route>
        </Switch>
      </BrowserRouter>
    </CartProvider>
  );
}
export default App;
