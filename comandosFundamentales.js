/* "show dbs": "Mostrar bases de datos"
"use 'name DB'": "Crear una nueva BD o para moverse a una BD existente"
"db": "Saber en qué base de datos estoy"
"db.dropDatabase()": "Eliminar BD en la que se esté posicionado"
"db.products.insert({'name': 'laptop})": "Crea la colección products si está no existe e inserta el registro mencionado"
"db.createCollection('products')": "Crea una nueva colección llamada products"
"db.products.drop()": "Elimina la colección indicada"
"db.products.find({filter},{projections})": "Muestra documentos/ registros dependiendo del filtro y proyecciones"
"db.products.find().pretty()": "Muestra los registros de una manera más ordenada"
"db.products.find().count()": "Retorna la cantidad de filas encontradas"
"db.products.find().limit(numRows)":"Retorna registros según el límite designado"
"db.products.find().forEach(products =>  print('Product Name:' + products.name))":"Imprime los resultados indicados, con un forEach"
"db.products.update({filter},{$set/$unset/$rename/$min/$max/$inc:{field: 'newData'}},{options})": "Actualiza campos de acuerdo al filtro al tipo de actualización desginado por el operador (campos)"
"db.products.update({filter},{$addToSet/$push/$pop/$pull//$pullAll:{field: 'newData'}},{options})": "Actualiza campos de acuerdo al filtro al tipo de actualización desginado por el operador (vectores)"
"db.products.remove({filter})": "Elimina registros de acuerdo al filtro (si no hay filtro borra todo)"
"db.peliculas.find({'year': {$gte: 1985, $lt:1990}})":"Busca películas del rango 1985 - 1989"
{   
    "$eq": "equal - igual",
    "$gt": "greater than / mayor que",
    "$gte": "greater than equal - mayor o igual que ",
    "$lt": "low than - menor que",
    "$lte": "low than equal - menor o igual que",
    "$ne": "not equal - distinto",
    "$in": "in - dentro de (poner en formato array: {$in: ['impresoras']})",
    "$nin": "not in - no dentro de (poner en formato array)"
}
*/
db.articulos.find()
db.articulos.find({"rubro": {$nin:["impresora"]}})
db.articulos.find({"rubro": {$ne:"impresora"}})
db.articulos.find({"rubro": {$in:["mouse"]}})
db.articulos.find({"rubro": {$eq:"mouse"}})
db.articulos.find({"precio": {$gte: 5000}})
db.articulos.find({"rubro": {$eq:"impresora"},"precio":{$gte:3500}})
db.articulos.find({"stock":{$gte:0,$lte:4}})

db.peliculas.insertMany(
    [
        {        
            "_id": "tt0110912",
            "title": "Pulp Fiction",
            "year": 1994,
            "director": "Quentin Tarantino"
        },
        {
            "_id": "tt0266697",
            "title": "Kill Bill: Vol. 1",
            "year": 2003,
            "director": "Quentin Tarantino"
        },
        {        
            "_id": "tt0110912",
            "title": "Pulp Fiction",
            "year": 1994,
            "director": "Quentin Tarantino"
        },
        {
            "_id": "tt1853728",
            "title": "Django Unchained",
            "year": 2012,
            "director": "Quentin Tarantino"
        }
    ],
    {
        "ordered": true
    }
)

db.peliculas.updateOne({title:"The Martian"},{$addToSet: {
    actors: "Uma Thurman"
}});

db.peliculas.updateOne({title:"The Martian"},{$push: {
    reviews:{
        rating: 4.5,
        reviewer: "César Arellano",
        text: "The best movie of the year"
    }
}});

db.peliculas.updateOne({title:"The Martian"},{$pop: {
    reviews: -1
}});

db.peliculas.updateOne({title:"The Martian"},{$set: 
    {
        contador: [1,2,3,4,5]
    }
});
db.peliculas.updateOne({title:"The Martian"},{$pop: 
    {
        contador: -1
    }
});
// "-1": "Elimina el primer elemento del vector", "1": "Para eliminar el último elemento"
// "$pull: numero/cadena / $pull: {$gte: numero}": "Elemento en especifico (no es la posición del arreglo)"
db.peliculas.updateOne({title:"The Martian"},{$pull: 
    {
        contador: 2
    }
});

db.peliculas.updateOne({title:"The Martian"},{$pull: 
    {
        contador: {$gte: 3}
    }
});

db.peliculas.updateOne({title:"The Martian"},{$pullAll: 
    {
        contador: [7,8]
    }
})
/* "$pullAll": "Elimina todos los elementos del array que se le indiquen (Aunque haya datos repetidos)"
"$each": "Modificador, modifica los operadores $push y $addToSet para agregar varios elementos para las actualizaciones de un vector"
"{ $push { <field>: { $each [ <v1>,<v2>, ...] } } }": "Modificador, modifica los operadores $push y $sddToSet para agregar varios elementos para las actualizaciones de un vector",
"$position: number": "Modificador para insertar en una determinada posición"
*/
db.peliculas.updateOne(
    {title: "The Martian"},
    {$push: {
        contador: {
            $each:[7,8,9],
            $position: 1
        }
    }
})

db.peliculas.updateMany({rated:null},{$unset: {rated: ""}})
/*
"db.peliculas.find({rated:{$exists:true/false}})": "Operador $exists -> Solo si existe o no el campo, muestra los registros"
"db.peliculas.updateOne({title:'The Martian'},{$push: {contador: 1223}},{upsert:true})": "Upsert = Update + Insert: true, podrá crear el documento aunque no exista"
"db.peliculas.replaceOne(filter,replacement,options)": "Reemplaza documentos, no puede contener operadores de actualización"
*/
db.peliculas.replaceOne(
    {title: "Django Unchained"}, 
    {
        "title":"Django Unchained",
        "director":"Quentin Tarantino",
        "cast": ["Jamie Foxx","Christoph Waltz","Leonardo  DiCaprio","Kerry Washington"]
    }
)
// Con variables
let filter = {title: "Django Unchained"}
let doc = {
    "title":"Django Unchained",
    "director":"Quentin Tarantino",
    "cast": ["Jamie Foxx","Christoph Waltz","Leonardo  DiCaprio","Kerry Washington","César Arellano"]
}
db.peliculas.replaceOne(filter,doc)

let findAll = db.peliculas.find().pretty()

// DELETE ONE
db.peliculas.deleteOne({_id: "tt0110912"})
db.peliculas.deleteOne({title: "Django Unchained"})

// DELETE MANY AND REMOVE
db.peliculas.deleteMany({director: "Quentin Tarantino"})
db.peliculas.remove({director: "Quentin Tarantino"})