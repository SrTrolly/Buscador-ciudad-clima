const axios = require('axios');


class Busquedas {
    historial = ["Santiago", "Bogota", "Madrid"]

    constructor() {
        //todo: leer base de datos si existe
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
            console.log(resp.data);
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
}

module.exports = Busquedas