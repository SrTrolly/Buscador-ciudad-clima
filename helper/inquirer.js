const inquirer = require("inquirer");
require("colors");

const preguntas=[
    {
        type:"list",
        name:"opcion",
        message:"¿Que desea hacer?",
        choices:[
            {
                value: 1,
                name:`${"1".green}.Buscar ciudad`
            },
            {
                value:2,
                name:`${"2".green}.historial`
            },
            {
                value:0,
                name:`${"0".green}.Salir`
            }
           
        ]
    }
]




const inquirerMenu=async()=>{
    console.clear();
    console.log("======================".green);
    console.log("Selecciona una opcion".white);
    console.log("======================\n".green);

    const {opcion}=await inquirer.prompt(preguntas);

    return opcion;
}

const pausa=async()=>{

    const question=[
        {
            type:"input",
            name:"enter",
            message:`Presione ${"enter".green} para continuar`
        }
    ]
    console.log("\n");
    await inquirer.prompt(question)
}

const leerInput= async(mensaje="")=>{
    const question=[
        {
            type:"input",
            name:"leerInput",
            message:mensaje,
            validate(value){
                if(value.length===0){
                    return "Por favor ingrese un valor"
                }
                return true;
            }
        }
    ];

    const {leerInput}= await inquirer.prompt(question);
    return leerInput;
}

const listarLugares= async(lugares=[])=>{
    const choices=lugares.map((lugar,i)=>{
        const contador=`${i+1}`.green;
        return{
            value:lugar.id,
            name:`${contador} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value:"0",
        name:"0".green+" Cancelar"
    });

    const preguntas=[
        {
            type:"list",
            name:"id",
            message:"Seleccione lugar:",
            choices:choices
        }
    ]

    const {id}=await inquirer.prompt(preguntas);
    return id;
    
}

const confirmar= async(mensaje) =>{
    const question=[
        {
            type:"confirm",
            name:"ok",
            message:mensaje
        }
    ];

    const {ok}= await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheck=async(tareas=[])=>{
    const choices= tareas.map((tarea,i)=>{
      const contador=`${i+1}`.green;
      
      return {
          value:tarea.id,
          name:`${contador} ${tarea.descripcion}`,
          checked:(tarea.completadoEn)?  true: false
      }
    });

    const pregunta=[
        {
            type:"checkbox",
            name:"ids",
            message:"Selecciones",
            choices:choices
        }
    ]

    const {ids}= await inquirer.prompt(pregunta)
    return ids;
}


module.exports={
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheck
}