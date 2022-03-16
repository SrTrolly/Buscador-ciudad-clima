require("dotenv").config();
const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helper/inquirer");
const Busquedas = require("./models/busquedas");



const main = async()=>{
    const busquedas = new Busquedas ();
    let opt;   

    
    do{
        opt=await inquirerMenu();
        
        

        

        switch(opt){

            case 1: 
                //Mostrara mensaje 
                const termino=await leerInput("Ciudad: ")

                //Buscar lugares
                const lugares= await busquedas.ciudad(termino);

                //Seleccion el lugar 
                const id=await listarLugares(lugares);
                const lugarSel=lugares.find(lugar=> lugar.id==id);
                
                

                //Clima 
                const clima= await busquedas.clima(lugarSel.lat,lugarSel.lng)

                


                //Mostrar resultados
                console.log("\nInformacion de la ciudad\n".green)
                console.log("Ciudad: ", lugarSel.nombre)
                console.log("Lat: ", lugarSel.lat)
                console.log("Lng: ", lugarSel.lng)
                console.log("Temperatura: ", clima.temperatura)
                console.log("Minima: ", clima.minima)
                console.log("Maxima: ", clima.maxima)
                console.log("Como esta el clima: ", clima.descripcion)
            break;
            
        }

        if(opt!==0) await pausa();


    } while(opt!==0)
}

main();