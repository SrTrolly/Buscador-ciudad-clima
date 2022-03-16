const axios = require('axios');


class Busquedas {
    historial=["Santiago","Bogota","Madrid"]

    constructor(){
        //todo: leer base de datos si existe
    }

    async ciudad(lugar=""){

        try{
        //peticion http 
        // console.log("Ciudad", lugar);
       const resp= await axios.get("https://reqres.in/api/users?page=2");
       console.log(resp.data);

        return []; // retornar los lugares

        } catch(error){
            console.log(error);
            return [];
        }
    }
}

module.exports=Busquedas