import { useEffect, useState } from "react";
import axios from "axios";
import "../css/storeStylest.css";

const API_URL = "http://127.0.0.1:8000/api/products/";

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((respuesta) => {
        setProductos(respuesta.data);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (indexEliminar) => {
    const nuevoCarrito = carrito.filter((_, index) => index !== indexEliminar);
    setCarrito(nuevoCarrito);
  };

  const total = carrito.reduce(
    (acumulado, producto) => acumulado + Number(producto.price),
    0
  );

  return (
    <>
      <header className="header">
        <span
          className="header__icon"
          role="button"
          aria-label="Abrir menu"
          onClick={() => setMenuAbierto(true)}
        >
          <img
            src="/img/menu_24dp_FILL0_wght400_GRAD0_opsz24.svg"
            alt="Icono de menú"
            className="header__image"
          />
        </span>

        <section
          className={`header__nav-container ${menuAbierto ? "" : "hidden"}`}
          aria-hidden={!menuAbierto}
        >
          <nav className="header__nav">
            <a className="header__link" href="#">Home</a>
            <a className="header__link" href="#">Productos</a>

            <div
              className="header__icon"
              role="button"
              aria-label="Cerrar menú"
              onClick={() => setMenuAbierto(false)}
            >
              <img
                className="header__image1"
                src="/img/close_24dp_FILL0_wght400_GRAD0_opsz24.svg"
                alt="Icono cerrar"
              />
            </div>
          </nav>
        </section>

        <img
          src="/img/LACOSTE_logo-removebg-preview.png"
          alt="Logo Lacoste"
          className="header__logo"
        />

        <span
          className="header__icon"
          role="button"
          aria-label="Abrir carrito"
          onClick={() => setCarritoAbierto(true)}
        >
          <img
            src="/img/shopping-bag.svg"
            alt="Icono de carrito"
            className="header__image"
          />
          <span className="cart__badge">{carrito.length}</span>
        </span>

        <article className={`cart ${carritoAbierto ? "" : "hidden"}`}>
          <section className="cart__header">
            <h2 className="cart__title">CARRITO</h2>

            <div
              className="header__icon"
              role="button"
              aria-label="Cerrar carrito"
              onClick={() => setCarritoAbierto(false)}
            >
              <img
                className="header__image2"
                src="/img/x.svg"
                alt="Icono cerrar"
              />
            </div>
          </section>

          <div className="cart__items">
            {carrito.map((producto, index) => (
              <section className="cart__item" key={`${producto.id}-${index}`}>
                <h3 className="cart__item-title">{producto.name}</h3>
                <p className="cart__item-price">${Number(producto.price).toFixed(2)}</p>

                <span
                  className="cart__item-remove"
                  onClick={() => eliminarDelCarrito(index)}
                >
                  <img
                    src="/img/delete_24dp_FILL0_wght400_GRAD0_opsz24.svg"
                    alt="Eliminar artículo"
                    className="cart__item-remove-icon"
                  />
                </span>
              </section>
            ))}
          </div>

          <p className="cart__total">
            Total: ${total.toFixed(2)}
          </p>

          <p className="cart__item-count">
            Artículos en el carrito: {carrito.length}
          </p>

          <button className="btn-buy">
            COMPRAR
          </button>
        </article>
      </header>

      <main>
        <article className="products" aria-label="Catálogo de productos">
          {productos.map((producto) => (
            <section className="products__item" key={producto.id}>
              <img
                className="products__img"
                src={`/img/${producto.id}.png`}
                alt={producto.name}
              />

              <h2 className="products__title">{producto.name}</h2>

              <p className="products_price">
                ${Number(producto.price).toFixed(2)}
              </p>

              <button
                className="btn-buy"
                onClick={() => agregarAlCarrito(producto)}
              >
                Agregar al carrito
              </button>
            </section>
          ))}
        </article>
      </main>

      <footer className="footer">
        <div className="footer__logo">
          <img
            className="footer__logo-image"
            src="/img/LACOSTE_logo-removebg-preview.png"
            alt="Logo Lacoste"
            width="100px"
          />
        </div>

        <nav className="footer__nav">
          <a className="footer__link" href="#">Home</a>
          <a className="footer__link" href="#">Productos</a>
        </nav>
      </footer>
    </>
  );
}

export default App;
