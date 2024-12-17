window.onload = function() {
    fetchClientes();
    fetchPlatos();
    fetchOrdenes();
    fetchCategorias();
    fetchMeseros();
};

function fetchClientes() {
    fetch('http://localhost:3000/clientes')
        .then(response => response.json())
        .then(data => {
            let clientesTable = document.querySelector("#clientesTable tbody");
            clientesTable.innerHTML = "";

            data.forEach(cliente => {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cliente.idcliente}</td>
                    <td>${cliente.nombrecliente}</td>
                    <td>${cliente.emailcliente}</td>
                    <td>${cliente.numerocliente}</td>
                    <td>${cliente.dnicliente}</td>
                    <td>
                        <button onclick="editarPlato('${plato.id}')">Editar</button>
                        <button onclick="eliminarPlato('${plato._id}')">Eliminar</button>
                    </td>
                `;
                clientesTable.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al obtener los clientes:', error);
        });
}
document.getElementById('formCliente').addEventListener('submit', function(event) {
    event.preventDefault();

    const idcliente = document.getElementById('idcliente').value;
    const nombrecliente = document.getElementById('nombrecliente').value;
    const emailcliente = document.getElementById('emailcliente').value;
    const numerocliente = document.getElementById('numerocliente').value;
    const dnicliente = document.getElementById('dnicliente').value;

    const clientes = {
        idcliente: idcliente,
        nombrecliente: nombrecliente,
        emailcliente: emailcliente,
        numerocliente: numerocliente,
        dnicliente: dnicliente
    };

    fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientes),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensaje').innerText = "Cliente agregado exitosamente";
        fetchClientes();
    })
    .catch(error => {
        document.getElementById('mensaje').innerText = "Error al agregar cliente";
        console.error('Error:', error);
    });
});





function fetchPlatos() {
    fetch('http://localhost:3000/platos')
        .then(response => response.json())
        .then(data => {
            let platosTable = document.querySelector("#platosTable tbody");
            platosTable.innerHTML = "";

            data.forEach(plato => {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td>${plato.id}</td>
                    <td>${plato.nombreplato}</td>
                    <td>${plato.ingredientes}</td>
                    <td>S/ ${plato.precio}</td>
                    <td>
                        <button onclick="editarPlato('${plato.id}')">Editar</button>
                        <button onclick="eliminarPlato('${plato._id}')">Eliminar</button>
                    </td>
                `;
                platosTable.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al obtener los platillos:', error);
        });
}

function agregarPlato(event) {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const nombreplato = document.getElementById('nombreplato').value;
    const ingredientes = document.getElementById('ingredientes').value;
    const precio = document.getElementById('precio').value;

    fetch('http://localhost:3000/platos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, nombreplato, ingredientes, precio })
    })
    .then(response => response.json())
    .then(() => {
        alert('Platillo agregado correctamente');
        fetchPlatos();
        document.getElementById('formPlato').reset();
    })
    .catch(error => console.error('Error al agregar el platillo:', error));
}

function eliminarPlato(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este platillo?')) {
        fetch(`http://localhost:3000/platos/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo eliminar el platillo');
            }
            return response.json();
        })
        .then(() => {
            alert('Platillo eliminado correctamente');
            fetchPlatos();
        })
        .catch(error => {
            console.error('Error al eliminar el platillo:', error);
            alert('Error al eliminar el platillo');
        });
    }
}

function editarPlato(id) {
    fetch(`http://localhost:3000/platos/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('id').value = data.id;
            document.getElementById('nombreplato').value = data.nombreplato;
            document.getElementById('ingredientes').value = data.ingredientes;
            document.getElementById('precio').value = data.precio;

            const form = document.getElementById('formPlato');
            form.onsubmit = function (event) {
                event.preventDefault();
                actualizarPlato(id);
            };
        })
        .catch(error => {
            console.error('Error al obtener los datos del platillo:', error);
        });
}

function actualizarPlato(id) {
    const nombreplato = document.getElementById('nombreplato').value;
    const ingredientes = document.getElementById('ingredientes').value;
    const precio = document.getElementById('precio').value;

    fetch(`http://localhost:3000/platos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombreplato: nombreplato,
            ingredientes: ingredientes,
            precio: precio
        }),
    })
    .then(response => response.json())
    .then(() => {
        alert('Platillo actualizado con éxito');
        fetchPlatos();
        document.getElementById('formPlato').reset();
        document.getElementById('formPlato').onsubmit = agregarPlato;
    })
    .catch(error => {
        console.error('Error al actualizar el platillo:', error);
        alert('Error al actualizar el platillo');
    });
}

document.getElementById('formPlato').onsubmit = agregarPlato;

fetchPlatos();






function fetchOrdenes() {
    fetch('http://localhost:3000/ordenes')
        .then(response => response.json())
        .then(data => {
            let ordenesTable = document.querySelector("#ordenesTable tbody");
            ordenesTable.innerHTML = "";

            data.forEach(orden => {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td>${orden.orden}</td>
                    <td>${orden.idmesa}</td>
                    <td>${orden.platos_solicitados}</td>
                    <td>${orden.cantidades}</td>
                    <td>
                        <button onclick="editarPlato('${orden._orden}')">Editar</button>
                        <button onclick="eliminarPlato('${orden._orden}')">Eliminar</button>
                    </td>
                `;
                ordenesTable.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al obtener las ordenes:', error);
        });
}

document.getElementById('formOrden').addEventListener('submit', function(event) {
    event.preventDefault();

    const orden = document.getElementById('orden').value;
    const idmesa = document.getElementById('idmesa').value;
    const platos_solicitados = document.getElementById('platos_solicitados').value;
    const cantidades = document.getElementById('cantidades').value;

    const ordenes = {
        orden: orden,
        idmesa: idmesa,
        platos_solicitados: platos_solicitados,
        cantidades: cantidades
    };

    fetch('http://localhost:3000/ordenes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ordenes),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensaje').innerText = "Orden agregada exitosamente";
        fetchOrdenes();
    })
    .catch(error => {
        document.getElementById('mensaje').innerText = "Error al agregar orden";
        console.error('Error:', error);
    });
});
function eliminarOrden(orden) {
    if (confirm('¿Estás seguro de que quieres eliminar este Orden?')) {
        fetch(`http://localhost:3000/platos/${orden}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo eliminar el Orden');
            }
            return response.json();
        })
        .then(() => {
            alert('Orden eliminado correctamente');
            fetchPlatos();
        })
        .catch(error => {
            console.error('Error al eliminar el Orden:', error);
            alert('Error al eliminar el Orden');
        });
    }
}




function fetchCategorias() {
    fetch('http://localhost:3000/categorias')
        .then(response => response.json())
        .then(data => {
            let categoriasTable = document.querySelector("#categoriasTable tbody");
            categoriasTable.innerHTML = "";

            data.forEach(categoria => {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td>${categoria.idcategoria}</td>
                    <td>${categoria.nombrecategoria}</td>
                    <td>${categoria.descripcion}</td>
                    <td>
                        <button onclick="editarPlato('${categoria._idcategoria}')">Editar</button>
                        <button onclick="eliminarPlato('${categoria._idcategoria}')">Eliminar</button>
                    </td>
                `;
                categoriasTable.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al obtener las categorias:', error);
        });
}

document.getElementById('formCategoria').addEventListener('submit', function(event) {
    event.preventDefault();

    const idcategoria = document.getElementById('idcategoria').value;
    const nombrecategoria = document.getElementById('nombrecategoria').value;
    const descripcion = document.getElementById('descripcion').value;

    const categorias = {
        idcategoria: idcategoria,
        nombrecategoria: nombrecategoria,
        descripcion: descripcion
    };

    fetch('http://localhost:3000/categorias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categorias),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensaje').innerText = "Categoria agregada exitosamente";
        fetchCategorias();
    })
    .catch(error => {
        document.getElementById('mensaje').innerText = "Error al agregar categoria";
        console.error('Error:', error);
    });
});





function fetchMeseros() {
    fetch('http://localhost:3000/meseros')
        .then(response => response.json())
        .then(data => {
            let meserosTable = document.querySelector("#meserosTable tbody");
            meserosTable.innerHTML = "";

            data.forEach(mesero => {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td>${mesero.idmesero}</td>
                    <td>${mesero.nombremesero}</td>
                    <td>${mesero.emailmesero}</td>
                    <td>${mesero.numeromesero}</td>
                    <td>
                        <button onclick="editarPlato('${mesero._idmesero}')">Editar</button>
                        <button onclick="eliminarPlato('${mesero._idmesero}')">Eliminar</button>
                    </td>
                `;
                meserosTable.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al obtener los meseros:', error);
        });
}

document.getElementById('formMesero').addEventListener('submit', function(event) {
    event.preventDefault();

    const idmesero = document.getElementById('idmesero').value;
    const nombremesero = document.getElementById('nombremesero').value;
    const emailmesero = document.getElementById('emailmesero').value;
    const numeromesero = document.getElementById('numeromesero').value;

    const meseros = {
        idmesero: idmesero,
        nombremesero: nombremesero,
        emailmesero: emailmesero,
        numeromesero: numeromesero
    };

    fetch('http://localhost:3000/meseros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(meseros),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensaje').innerText = "Mesero agregada exitosamente";
        fetchMeseros();
    })
    .catch(error => {
        document.getElementById('mensaje').innerText = "Error al agregar mesero";
        console.error('Error:', error);
    });
});