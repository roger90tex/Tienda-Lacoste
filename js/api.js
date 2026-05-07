const API_URL = "http://127.0.0.1:8000/api/products/";

let carrito = [];

async function obtenerProductos() {
    try {
        const respuesta = await axios.get(API_URL);
        mostrarProductos(respuesta.data);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    productos.forEach((producto, index) => {
        contenedor.innerHTML += `
            <section class="products__item">
                <img class="products__img" src="img/${index + 1}.png" alt="${producto.name}">
                <h2 class="products__title">${producto.name}</h2>
                <p class="products_price">$${producto.price}</p>
                <p>${producto.description}</p>
                <p>Stock: ${producto.stock}</p>
                <button class="btn-buy" onclick="agregarAlCarrito(${producto.id}, '${producto.name}', ${producto.price})">
                    Agregar al carrito
                </button>
            </section>
        `;
    });
}

function agregarAlCarrito(id, name, price) {
    const productoExistente = carrito.find(producto => producto.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            id,
            name,
            price: Number(price),
            cantidad: 1
        });
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    const cartItems = document.querySelector(".cart__items");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");
    const cartBadge = document.getElementById("cartBadge");

    cartItems.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(producto => {
        total += producto.price * producto.cantidad;
        cantidadTotal += producto.cantidad;

        cartItems.innerHTML += `
            <div class="cart__item">
                <p>${producto.name}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>$${producto.price}</p>

                <button class="btn-remove" onclick="eliminarDelCarrito(${producto.id})">
                    Eliminar
                </button>
            </div>
        `;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cantidadTotal;
    cartBadge.textContent = cantidadTotal;
}
function eliminarDelCarrito(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    actualizarCarrito();
}

async function realizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const total = carrito.reduce((acumulado, producto) => {
        return acumulado + producto.price * producto.cantidad;
    }, 0);

    try {
        await axios.post("http://127.0.0.1:8000/api/orders/", {
            total: total.toFixed(2)
        });

        alert("Compra realizada correctamente");

        carrito = [];
        actualizarCarrito();

    } catch (error) {
        console.error("Error al realizar la compra:", error);
        alert("Ocurrió un error al realizar la compra");
    }
}

obtenerProductos();