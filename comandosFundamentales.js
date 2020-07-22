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
OPERADORES DE COMPARACIÓN
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
            "year": null,
            "director": "Quentin Tarantino"
        },
        {
            "_id": "tt0266697",
            "title": "Kill Bill: Vol. 1",
            "year": null,
            "director": "Quentin Tarantino"
        },
        {        
            "_id": "tt0110912",
            "title": "Pulp Fiction",
            "year": null,
            "director": "Quentin Tarantino"
        },
        {
            "_id": "tt1853728",
            "title": "Django Unchained",
            "year": null,
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

/*
OPERADORES DE ELEMENTOS
{   
    "$exists": "equal - igual",
    "db.peliculas.find({rated:{$exists:true/false}})": "Operador $exists -> Solo si existe o no el campo, muestra los registros en true muestra aunque sean null",
    "$type": "Muestra aquellos documentos, donde el campo tenga un determinado tipo de dato",
    "db.peliculas.find({title:{$type:'string'}})": "Tipos de datos admitidos ('string','int','double','long','object','array','undefined','objectId','bool','date','null','regex','dbPointer','javascript','symbol','timestamp','decimal','minKey','maxKey')",
}

OPERADORES LÓGICOS
{   
    • $or - Une las cláusulas con un OR lógico 
    { $or: [ { selector1 }, { selector2 }, ... ] }

    • $nor - Une cláusulas de consulta con un NOR lógico 
    { $nor: [ { selector1 }, { selector2 }, ... ] }
    
    • $and - Une cláusulas de consulta con un AND lógico 
    { $and: [ { selector1 }, { selector2 }, ... ] }
    campo: null (Muestra los que tienen null y los que no existen)
    campo: {$ne:null} (Muestra sólo los que existen)
    campo: {$exists:true} (Muestra los que sean null y los que existen)
    campo: {$exists:false} (Muestra los que no existe el campo)
    { $and: [{campo:null},{campo: {$exists:true}}] } (Muestra los que son null)
    db.peliculas.find({$and: [{director: 'Steven Spielberg'}, {runtime: {$gte: 120}}]},{_id:0,title:1,runtime:1,director:1})
    db.peliculas.find({$and: [{year: null}, {year: {$exists:true}}]},{_id:0,title:1,runtime:1,director:1})
    • $not - Invierte el efecto de una expresión de consulta.
    { campo: { $not: { selector } } }
}
*/
//Ejemplo OR:

    db.peliculas.find({$or: [{director: 'Steven Spielberg'}, {director:'Zack Snyder'}]},{_id:0,title:1,director:1})
    db.peliculas.find({$or: [{director: 'Steven Spielberg'}, {runtime: {$gte: 120}}]},{_id:0,title:1,runtime:1,director:1})
//Ejemplo NOR:
    db.peliculas.find({$nor: [{director: 'Steven Spielberg'}, {director:'Zack Snyder'}]},{_id:0,title:1,director:1})

//Ejemplo AND:
    db.peliculas.find({$and: [{director: 'Steven Spielberg'}, {runtime: {$gte: 120}}]},{_id:0,title:1,runtime:1,director:1})
    db.peliculas.find({$and: [{year: null}, {year: {$exists:true}}]},{_id:0,title:1,runtime:1,director:1})

/*
OPERADORES PARA VECTORES
{
    • $all - Solo documentos que contienen el campo vector con todos los valores
    { campo: {$all: [valor1, valor2, ...] } }
    - Pueden tener más valores, nunca menos
    - No tienen que estar en el mismo orden
    
    • $size - Solo documentos que contienen el campo vector con el tamaño indicado.
    { campo: { $size: 2 } } )
    - no acepta rangos de valores. 

    • $elemMatch - Solo Documentos que contienen un elemento del campo vector que coincide con todas las condiciones especificadas 
    { campo: { $elemMatch: { selector1 , selector2 , ... } } }
}
*/
//Ejemplo $all:
    db.peliculas.find({countries:{$all: ['USA','Spain']}},{_id:0,title:1,countries:1})
//Ejemplo $size:
    db.peliculas.find({countries:{$size: 2}},{_id:0,title:1,countries:1})
//Ejemplo $elemMatch:
    db.peliculas.insertOne({
        title:'prueba_vectores',
        year:2020,
        boxOffice: [
            {pais:"Mexico",ingreso:228.4},
            {pais:"España",ingreso:19.6},
            {pais:"Argentina",ingreso:33.9},
            {pais:"Colombia",ingreso:16.2},
            {pais:"Perú",ingreso:19.8}
        ]
    })
    db.peliculas.find({"boxOffice.pais":"España","boxOffice.ingreso":{$gt:20}}) // Checa el ingreso en general
    db.peliculas.find({boxOffice: {$elemMatch: {"pais":"España","ingreso":{$gt:20}}}}) // Checa el ingreso de España y no muestra nada
    db.peliculas.find({boxOffice: {$elemMatch: {"pais":"España","ingreso":{$gt:19}}}}) // Checa el ingreso de España y muestra el documento
/*
OPERADORES DE EVALUACIÓN
{
    • $regex  // Limita documentos de acuerdo a la expresión regular indicada
    {campo: { $regex: /pattern/ options } }
    / / para delimitar la expresión regular
    ^   significa comenzar desde el principio 
    .   comodín (cualquier carácter) 
    *   cualquier carácter varias veces
}
*/
db.peliculas.find({},{_id:0,title:1,"awards.text":1})
//Busca las peliculas en el campo texto del objeto awards que contengan "Won ...."
db.peliculas.find({"awards.text":{$regex: /^Won.* /}},{_id:0,title:1,"awards.text":1})
//Busca las peliculas en el campo texto del objeto awards que contengan "Won 1 Oscar...."
db.peliculas.find({"awards.text":{$regex: /^Won 1 Oscar.* /}},{_id:0,title:1,"awards.text":1})
//Busca las peliculas en el campo texto del objeto awards que contengan "won..." no aparecerá nada porque se diferencia las mayúsculas y minúsculas.
db.peliculas.find({"awards.text":{$regex: /^won .* /}},{_id:0,title:1,"awards.text":1})