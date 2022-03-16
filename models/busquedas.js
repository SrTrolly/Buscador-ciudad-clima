const axios = require('axios');
const fs=require("fs")


class Busquedas {
    historial = []
    dbPath="./db/database.json";

    constructor() {
        //todo: leer base de datos si existe
        this.leerDB();
    }

    get historialMayuscula(){
        return this.historial.map(lugar=>{
            let palabras=lugar.split(" ");
            palabras=palabras.map(p=>p[0].toUpperCase()+p.substring(1));

            return palabras.join(" ");
        })
    }

    get paramsMapbox() {
        return {
            "access_token": process.env.MAPBOX_KEY,
            "limit": 5,
            "language": "es"
        }
    }

    get paramsOpenWeather(){
        return {
            "appid":process.env.OPENWEATHER_KEY,
            "units":"metric",
            "lang":"es"
        }
    }

    async ciudad(lugar = "") {

        try {
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await intance.get();
            return resp.data.features.map(lugar=>({
                id:lugar.id,
                nombre:lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

            

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async clima(lat, lon){
        try{
            const instance=axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params:{...this.paramsOpenWeather, lat,lon}
            });
            const resp= await instance.get();
            const {weather,main}=resp.data

            return {
                descripcion:weather[0].description,
                temperatura:main.temp,
                minima:main.temp_min,
                maxima:main.temp_max
            }
            
        } catch(error){
            console.log(error);
            return [];
        }
    }

    agregarHistorial(lugar=""){

        if(this.historial.includes(lugar.toLocaleLowerCase)){
            return;
        }

        this.historial.unshift(lugar.toLocaleLowerCase());

        //Grabar en la base de datos

        this.guardarDB();


    }

    guardarDB(){
        const payload={
            historial:this.historial
        }
        fs.writeFileSync(this.dbPath,JSON.stringify(payload));
    }

    leerDB(){
        if(!fs.existsSync(this.dbPath)){
            return;
        }

        const info=fs.readFileSync(this.dbPath,{encoding:"utf-8"});
        const data=JSON.parse(info);

        this.historial=data.historial;
    }
}

module.exports = Busquedas