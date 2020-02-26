var app = new Vue({
    el: '#app',
    data: {
      weather: [],
      message: 'Hello Vue!',
      text: ''
    },
    methods: {
        async search(){
            id = await this.getLocationId(this.text)
            await this.getWeather(id)
            console.log("teste")
        },
        saveWeather(id){
            localStorage.setItem('weather', id)
        },
        checkSaved(){
            let id = localStorage.getItem('weather');
            if(id){
                this.weather = this.getWeather(id)
            }    
        },
        async getLocationId(query){
            try {
                const url = encodeURI(`${$accuweatherConfig.citySearchBaseUrl}?apikey=${$accuweatherConfig.apiKey}&q=${query}`)
                const response = await axios.get(url);
                return response.data[0].Key
            } catch (error) {
                
            }
        },
        async getWeather(id){
            try {
                const response = await axios.get(`${$accuweatherConfig.forecastBaseUrl}/${id}?apikey=${$accuweatherConfig.apiKey}&q=${id}`);
                this.weather = response.data.DailyForecasts
            } catch (error) {
                this.weather = []
            }
        }
    },

    async mounted(){
        this.checkSaved()
        console.log($accuweatherConfig)
        let a = await this.getLocationId("Niterói")
        console.log(a)
    }

  })