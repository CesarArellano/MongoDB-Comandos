db.libros.insertMany([
    {
        codigo: 1,  
        nombre: 'El aleph',
        autor: 'Borges',
        editoriales: ['Planeta','Siglo XXI']
    },
    {
        codigo: 2,
        nombre: 'Martin Fierro',
        autor: 'Jose Hernandez',
        editoriales: ['Planeta']
    }
])
db.libros.insertMany(
    [
        {
            codigo: 3,  
            nombre: 'Aprenda PHP',
            autor: 'Mario Molina',
            editoriales: ['Planeta']
        },
        {
            codigo: 4,  
            nombre: 'Java en 10 minutos',
            autor: 'Barros Sergio',
            editoriales: ['Planeta','Siglo XXI']
        }
    ]
)
db.clientes.insertOne(
    {
        _id: 1,  
        nombre: 'Lopez Marcos',
        domicilio: 'Colon 111',
        provincia: 'Cordoba'
    }
)
db.clientes.insertOne(
    {
        _id: 1,  
        nombre: 'Perez Ana',
        domicilio: 'San Martin 222',
        provincia: 'Santa Fe'
    }
)
db.clientes.insertMany(
    [
        {
            _id: 2,  
            nombre: 'Perez Ana',
            domicilio: 'San Martin 222',
            provincia: 'Santa Fe'
        },
        {
            _id: 3,  
            nombre: 'César Arellano',
            domicilio: 'Santa fe',
            provincia: 'Santa Fe'
        },

    ]
)
db.clientes.insertOne(
    {
        _id: 2,  
        nombre: 'Perez Ana',
        domicilio: 'San Martin 222',
        provincia: 'Santa Fe'
    }
)
db.clientes.find()
/*
use local
show collections
use test 
show collections
*/

db.usuarios.insertMany(
    [
        {
            _id: 1,  
            username: 'admin',
            password: 'admin'
        },
        {
            _id: 2,  
            username: 'CesarArellano',
            password: '12345'
        },

    ]
)
db.posts.insertOne(
    {
        titulo: 'C (lenguaje de programación)',
        cuerpo: 'C es un lenguaje de programación originalmente desarrollado por Dennis Ritchie entre 1969 y 1972 en los Laboratorios Bell,2? como evolución del anterior lenguaje B, a su vez basado en BCPL',
        autor: 'Marcos Mariano',
        tema: ['programación', 'lenguaje']
    }
)

// use base1
db.libros.drop()

db.libros.insertOne(
    {
        _id: 1,  
        titulo: 'El aleph',
        autor: 'Borges',
        editorial: ['Siglo XXI','Planeta'],
        precio: 20,
        cantidad: 50 
    }
)
db.libros.insertOne(
    {
        _id: 2,  
        titulo: 'Martin Fierro',
        autor: 'Jose Hernandez',
        editorial: ['Siglo XXI'],
        precio: 50,
        cantidad: 12
    }
)
db.libros.insertOne(
    {
        _id: 3,  
        titulo: 'Aprenda PHP',
        autor: 'Mario Molina',
        editorial: ['Siglo XXI','Planeta'],
        precio: 50,
        cantidad: 20
    }
)
db.libros.insertOne(
    {
        _id: 4,  
        titulo: 'Java en 10 minutos',
        editorial: ['Siglo XXI'],
        precio: 45,
        cantidad: 1 
    }
)

db.libros.find()