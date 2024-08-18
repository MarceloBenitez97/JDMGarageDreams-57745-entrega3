const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productos = [
    {   
        id: "auto-1",
        titulo: "Nissan 350z Z33",
        precio: 50000,
        img: "../img/350z.jpg"  
    },
    {   
        id: "auto-2",
        titulo: "Honda Civic Type R", 
        precio: 15000,
        img: "./img/honda-civic-destacados.jpg"   
    },
    {   
        id: "auto-3",
        titulo: "Toyota Supra MK4",
        precio: 150000,
        img: "./img/supra2.jpg"  
    },
    {   
        id: "auto-4",
        titulo: "Nissan Skyline GT-R R34",
        precio: 200000,
        img: "./img/skyline-index.jpg"  
    },
    {   
        id: "auto-5",
        titulo: "Subaru Impreza 22B STI", 
        precio: 500000,
        img: "./img/subaru-sti-destacados.jpg"   
    },
    {   
        id: "auto-6",
        titulo: "Mitsubishi Lancer Evo IX",
        precio: 32000,
        img: "./img/lancer.jpg"  
    },
    {   
        id: "auto-7",
        titulo: "Nissan Skyline GT-R Hakosuka",
        precio: 240000,
        img: "./img/nissan-hakosuka.jpg"  
    },
    {   
        id: "auto-8",
        titulo: "Mazda RX-7 Spirit-R" , 
        precio: 100000,
        img: "./img/rx7-catalogo.jpg"   
    },
    {   
        id: "auto-9",
        titulo: "Lexus LC 500 Luxury",
        precio: 140000,
        img: "./img/lexus-lc500.jpg"  
    },
];

const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const irAlCarrito = document.querySelector("#ir-al-carrito");



productos.forEach((producto) => {
    let div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
    <img class="producto-img" src="${producto.img}" alt="">
    <h3>${producto.titulo}</h3>
    <p>$${producto.precio}</p>
    
    `;

    let button = document.createElement("button");
    button.classList.add("producto-btn");
    button.innerText = "Agregar al carrito";
    button.addEventListener("click", () => {
        agregarAlCarrito(producto);
        
    })
    
    div.append(button);
    contenedorProductos.append(div);
})


const agregarAlCarrito = (producto) => {
    let productoEnCarrito = carrito.find((item) => item.id === producto.id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }

    actualizarCarrito();

    Toastify({
        text: "¡ " + producto.titulo + " agregado !",
        avatar: producto.img,
        duration: 3000,
        close: true,
        className: "toast-agregar",
        style: {
          background: "#ff3c00",
          color: "#f2ebd9"
        },
      }).showToast();
}




function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
        vaciarCarrito.classList.add("d-none");
        irAlCarrito.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");
        vaciarCarrito.classList.remove("d-none");
        irAlCarrito.classList.remove("d-none");

        carritoProductos.innerHTML = "";

        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <h3>${producto.titulo}</h3>
                <p>$${producto.precio}</p>
                <p>${producto.cantidad}</p>
                <p>$${producto.cantidad * producto.precio}</p>

            `;

         let button = document.createElement("button");
         button.classList.add("carrito-producto-btn");
         button.innerText = "❌";
         button.addEventListener("click", () => {
            borrarDelCarrito(producto);
         })   

           div.append(button); 
           carritoProductos.append(div);    
        })
    }


    actualizarTotal();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

actualizarCarrito();

function borrarDelCarrito(producto) {
    const indice = carrito.findIndex((item) => item.id === producto.id);
    carrito.splice(indice,1);
    actualizarCarrito(); 
    
}

function actualizarTotal() {
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = "$" + total;
}

vaciarCarrito.addEventListener("click", () => {
    const cantidadTotal = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    Swal.fire({
        title: "¿Seguro queres vaciar el carrito?",
        text: "¡Se van a borrar " + cantidadTotal + " productos del carrito.!",
        icon: "warning",
        showDenyButton: true,
        denyButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Si!"
      }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0;
            actualizarCarrito ();
            
          Swal.fire({
            title: "¡Listo!",
            text: "¡Se han borrado " + cantidadTotal + " productos del carrito.!",
            icon: "success"
          });
        }
      });
    



})