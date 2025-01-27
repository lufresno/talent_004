// Elementos del DOM
const filtroGenero = document.getElementById('filtro-genero');
const buscarTitulo = document.getElementById('buscar-titulo');
const botonOrdenarAsc = document.getElementById('ordenar-asc');
const botonOrdenarDesc = document.getElementById('ordenar-desc');
const botonBuscar = document.getElementById('buscar-boton');
const contenedorPeliculas = document.getElementById('contenedor-peliculas');

// Cargar JSON
fetch('peliculas.json')
    .then(response => response.json())
    .then(data => {
        window.peliculas = data;
        cargarPeliculas(data);
        cargarGeneros(data);
    });

// Cargar todas las películas
function cargarPeliculas(data) {
    contenedorPeliculas.innerHTML = data.map(pelicula => `
        <div class="tarjeta">
            <img src="${pelicula.imagen}" alt="${pelicula.titulo}">
            <div class="info">
                <h3>${pelicula.titulo}</h3>
                <p><strong>Año:</strong> ${pelicula.año}</p>
                <p><strong>Género:</strong> ${pelicula.genero}</p>
            </div>
        </div>
    `).join('');
}

// Cargar géneros en el select
function cargarGeneros(data) {
    const generos = [...new Set(data.map(pelicula => pelicula.genero))];
    generos.forEach(genero => {
        const option = document.createElement('option');
        option.value = genero;
        option.textContent = genero;
        filtroGenero.appendChild(option);
    });
}

// Filtrar películas por género
filtroGenero.addEventListener('change', () => {
    const genero = filtroGenero.value;
    const filtradas = genero ? window.peliculas.filter(p => p.genero === genero) : window.peliculas;
    cargarPeliculas(filtradas);
});

// Buscar por título
botonBuscar.addEventListener('click', () => {
    const titulo = buscarTitulo.value.toLowerCase();
    const filtradas = window.peliculas.filter(p => p.titulo.toLowerCase().includes(titulo));
    cargarPeliculas(filtradas);
});

// Función para ordenar las películas por año ascendente
botonOrdenarAsc.addEventListener('click', () => {
    const peliculasOrdenadas = [...window.peliculas].sort((a, b) => a.año - b.año);
    cargarPeliculas(peliculasOrdenadas);
});

// Función para ordenar las películas por año descendente
botonOrdenarDesc.addEventListener('click', () => {
    const peliculasOrdenadas = [...window.peliculas].sort((a, b) => b.año - a.año);
    cargarPeliculas(peliculasOrdenadas);
});
