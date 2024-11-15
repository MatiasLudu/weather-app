window.addEventListener('load', () => {
    document.getElementById('city').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            getWeather();
        }
    });

    document.querySelector('button').addEventListener('click', getWeather);
    
    const weatherAdvice = {
        "Soleado": "Es un buen día para salir. ¡Disfruta del sol!",
        "Despejado": "Cielo despejado, perfecto para salir. ¡Disfruta de la noche!",
        "Parcialmente nublado": "Puede que necesites un abrigo ligero por si refresca.",
        "Nublado": "Un día nublado, pero no olvides tu abrigo por si acaso.",
        "Cielo cubierto": "El cielo está completamente cubierto. ¡Lleva un abrigo en caso de que se enfríe!",
        "Lluvia": "Está lloviendo. Asegúrate de llevar ropa impermeable.",
        "Lluvia ligera": "Puede que llueva ligeramente. Mantén un abrigo a mano.",
        "Lluvia intensa": "Se espera lluvia intensa. ¡Prepárate con ropa impermeable y cuida tus pertenencias!",
        "Lluvia  moderada a intervalos": "Lluvia a intervalos. Mantente seco y alerta.",
        "Chubascos": "Hay chubascos. Lleva ropa adecuada para mantenerte seco.",
        "Tormentas eléctricas": "Se pronostican tormentas eléctricas. Mejor evita salir y mantente a salvo.",
        "Aguanieve moderada a intervalos en las aproximaciones": "Puede que haya aguanieve. Asegúrate de abrigarte bien y usar calzado adecuado.",
        "Nieve": "Está nevando. Asegúrate de abrigarte bien y usar calzado adecuado.",
        "Nieve ligera": "Puede que haya nieve ligera. Viste ropa abrigada.",
        "Nieve intensa": "Nieve intensa en camino. Mantente abrigado y ten cuidado al conducir.",
        "Nieve moderada a intervalos en las aproximaciones": "Puede que haya nieve ligera. Viste ropa abrigada.",
        "Neblina": "Hay niebla densa. Si conduces, asegúrate de tener precaución.",
        "Bruma": "Hay bruma. Mantén la visibilidad al conducir.",
        "Calina": "La visibilidad puede estar reducida. Conduce con cuidado.",
        "Polvo": "Puede haber polvo en el aire. Si eres alérgico, considera usar una mascarilla.",
        "Arena": "La arena puede estar volando. Cuida tus ojos y usa gafas de sol.",
        "Ventoso": "El viento es fuerte. Ten cuidado si usas sombrero o bufanda.",
        "Llovizna helada a intervalos en las aproximaciones": "Puede haber llovizna helada. Lleva ropa abrigada y cuidado al conducir.",
        "Cielos tormentosos en las aproximaciones": "Se aproxima una tormenta. Mantente a salvo y evita salir si es posible.",
        "Chubascos de nieve": "Hay chubascos de nieve. Abrígate bien y ten cuidado en la calle.",
        "Ventisca": "Se espera una ventisca. Mejor no salgas si no es necesario.",
        "Niebla moderada": "Hay niebla moderada. Ten cuidado al conducir.",
        "Niebla helada": "Niebla helada en el ambiente. Ten mucho cuidado al caminar o conducir.",
        "Llovizna a intervalos": "Llovizna a intervalos. Ten cuidado al caminar sobre superficies mojadas.",
        "Llovizna": "Hay llovizna constante. Asegúrate de llevar ropa adecuada.",
        "Llovizna helada": "Hay llovizna helada. Asegúrate de llevar ropa adecuada.",
        "Fuerte llovizna helada": "Llovizna helada intensa. Mantente abrigado y ten cuidado al moverte.",
        "Lluvias ligeras a intervalos": "Lluvias ligeras por momentos. Mantén un abrigo a mano.",
        "Ligeras lluvias": "Lluvias suaves. Prepárate para posibles cambios en el clima.",
        "Periodos de lluvia moderada": "Lluvia moderada a intervalos. Mantente seco y alerta.",
        "Lluvia moderada": "Está lloviendo moderadamente. Un buen abrigo impermeable es recomendable.",
        "Periodos de fuertes lluvias": "Lluvias intensas por momentos. Prepárate con ropa impermeable.",
        "Fuertes lluvias": "Fuertes lluvias. Asegúrate de llevar ropa impermeable.",
        "Ligeras lluvias heladas": "Lluvias heladas ligeras. Cuidado con el frío y las superficies resbaladizas.",
        "Lluvias heladas fuertes o moderadas": "Lluvias heladas moderadas a fuertes. Mantente abrigado y toma precauciones.",
        "Ligeras precipitaciones de aguanieve": "Ligeras precipitaciones de aguanieve. Abrígate bien y usa calzado adecuado.",
        "Aguanieve fuerte o moderada": "Aguanieve moderada a intensa. Usa ropa impermeable y abrigada.",
        "Nevadas ligeras a intervalos": "Nevadas ligeras por momentos. Abrígate adecuadamente.",
        "Nevadas ligeras": "Nevadas ligeras. Usa ropa abrigada y calzado adecuado.",
        "Nieve moderada a intervalos": "Nieve moderada por momentos. Lleva ropa de invierno.",
        "Nieve moderada": "Nieve moderada. Mantente abrigado y ten cuidado al conducir.",
        "Nevadas intensas": "Nevadas intensas. No salgas si no es necesario.",
        "Fuertes nevadas": "Se esperan fuertes nevadas. Mantente abrigado y toma precauciones.",
        "Granizo": "Granizo en la región. Mantente a cubierto para evitar lesiones.",
        "Ligeras precipitaciones": "Precipitaciones ligeras. Mantén un abrigo a mano por si acaso.",
        "Lluvias fuertes o moderadas": "Lluvias moderadas a intensas. Asegúrate de estar preparado para mojarte.",
        "Lluvias torrenciales": "Lluvias torrenciales. Evita salir si es posible.",
        "Ligeros chubascos de aguanieve": "Chubascos ligeros de aguanieve. Usa ropa impermeable.",
        "Chubascos de aguanieve fuertes o moderados": "Chubascos de aguanieve intensos. Mantente abrigado y usa calzado adecuado.",
        "Ligeras precipitaciones de nieve": "Ligeras precipitaciones de nieve. Abrígate bien.",
        "Chubascos de nieve fuertes o moderados": "Chubascos de nieve intensos. Usa ropa de invierno y ten cuidado.",
        "Ligeros chubascos acompañados de granizo": "Chubascos ligeros con granizo. Mantente a cubierto y cuida tu cabeza.",
        "Chubascos fuertes o moderados acompañados de granizo": "Chubascos intensos con granizo. Mantente a salvo bajo techo.",
        "Intervalos de lluvias ligeras con tormenta en la región": "Lluvias ligeras con tormenta en la zona. Ten cuidado con los relámpagos.",
        "Lluvias con tormenta fuertes o moderadas en la región": "Tormentas con lluvia intensa en la región. Mejor evita salir.",
        "Nieve moderada con tormenta en la región": "Nieve y tormenta en la zona. Mantente a cubierto y abrigado.",
        "Nieve moderada o fuertes nevadas con tormenta en la región": "Fuertes nevadas acompañadas de tormentas. Mejor no salgas de casa."
    }; 

    const weatherGifs = {

        "Lluvia ligera": "assets/img/lluvia-suave.png",
        "Llovizna a intervalos": "assets/img/lluvia-suave.png",
        "Llovizna": "assets/img/lluvia-suave.png",
        "Lluvias ligeras a intervalos": "assets/img/lluvia-suave.png",
        "Ligeras lluvias": "assets/img/lluvia-suave.png",
        "Ligeras lluvias heladas": "assets/img/lluvia-suave.png",
        "Ligeras precipitaciones": "assets/img/lluvia-suave.png",
        "Llovizna helada": "assets/img/lluvia-suave.png",
        "Llovizna helada a intervalos en las aproximaciones": "assets/img/lluvia-suave.png",
    
        "Lluvia moderada a intervalos": "assets/img/lluvia.png",
        "Lluvia  moderada a intervalos": "assets/img/lluvia.png",
        "Periodos de lluvia moderada": "assets/img/lluvia.png",
        "Lluvia moderada": "assets/img/lluvia.png",
        "Lluvias fuertes o moderadas": "assets/img/lluvia.png",
        "Lluvias heladas fuertes o moderadas": "assets/img/lluvia.png",
        "Intervalos de lluvias ligeras con tomenta en la región": "assets/img/lluvia.png",
    
        "Lluvia intensa": "assets/img/lluvia-intensa.png",
        "Chubascos": "assets/img/lluvia-intensa.png",
        "Fuerte llovizna helada": "assets/img/lluvia-intensa.png",
        "Periodos de fuertes lluvias": "assets/img/lluvia-intensa.png",
        "Fuertes lluvias": "assets/img/lluvia-intensa.png",
        "Lluvias torrenciales": "assets/img/lluvia-intensa.png",
        "Lluvias con tormenta fuertes o moderadas en la región": "assets/img/lluvia-intensa.png",
        "Cielos tormentosos en las aproximaciones": "assets/img/lluvia-intensa.png",
    
        "Tormentas eléctricas": "assets/img/tormenta.png",
        "Intervalos de lluvias ligeras con tormenta en la región": "assets/img/tormenta.png",
        "Lluvias con tormenta fuertes o moderadas en la región": "assets/img/tormenta.png",
        "Cielos tormentosos en las aproximaciones": "assets/img/tormenta.png",
    
        "Nieve": "assets/img/nieve.png",
        "Nieve ligera": "assets/img/nieve.png",
        "Nieve intensa": "assets/img/nieve.png",
        "Nieve moderada a intervalos en las aproximaciones": "assets/img/nieve.png",
        "Chubascos de nieve": "assets/img/nieve.png",
        "Ventisca": "assets/img/nieve.png",
        "Niebla helada": "assets/img/nieve.png",
        "Nevadas ligeras a intervalos": "assets/img/nieve.png",
        "Nevadas ligeras": "assets/img/nieve.png",
        "Nieve moderada a intervalos": "assets/img/nieve.png",
        "Nieve moderada": "assets/img/nieve.png",
        "Nevadas intensas": "assets/img/nieve.png",
        "Fuertes nevadas": "assets/img/nieve.png",
        "Ligeras precipitaciones de nieve": "assets/img/nieve.png",
        "Chubascos de nieve fuertes o moderados": "assets/img/nieve.png",
        "Nieve moderada con tormenta en la región": "assets/img/nieve.png",
        "Nieve moderada o fuertes nevadas con tormenta en la región": "assets/img/nieve.png",
    
        "Soleado": "assets/img/soleado.png",
    
        "Despejado": "assets/img/despejado.png",
    
        "Parcialmente nublado": "assets/img/nublado.png",
        "Nublado": "assets/img/nublado.png",
        "Cielo cubierto": "assets/img/nublado.png",
    
        "Niebla moderada": "assets/img/neblina.png",
        "Neblina": "assets/img/neblina.png",
        "Bruma": "assets/img/neblina.png",
    
        "Calina": "assets/img/arena.png",
        "Polvo": "assets/img/arena.png",
        "Arena": "assets/img/arena.png",
    
        "Ventoso": "assets/img/viento.png",
        
        "Chubascos ligeros de aguanieve": "assets/img/nieve-suave.png",
        "Chubascos de aguanieve fuertes o moderados": "assets/img/nieve-suave.png",
    
        "Ligeros chubascos acompañados de granizo": "assets/img/granizo.png",
        "Chubascos fuertes o moderados acompañados de granizo": "assets/img/granizo.png",
        "Granizo": "assets/img/granizo.png"
    
    };
    
    const windDirections = {
        "N": "N",
        "NNE": "NEN",
        "NE": "NE",
        "ENE": "ENE",
        "E": "E",
        "ESE": "ESE",
        "SE": "SE",
        "SSE": "SSE",
        "S": "S",
        "SSW": "SSO",
        "SW": "O",
        "WSW": "ONO",
        "NW": "NO",
        "NNW": "NON"
    };
    
    const apiKey = "14fe70e7f5a74bc8977202838242009"; // Coloca tu API key aquí

    function getWeather() {
        const city = document.getElementById('city').value;
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=2&aqi=no&alerts=no&lang=es`;

        //Ejemplo de petición, copiar.
        // https://api.weatherapi.com/v1/forecast.json?key=14fe70e7f5a74bc8977202838242009&q=Córdoba&days=2&aqi=no&alerts=no&lang=es
        

        fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultBox = document.getElementById('result');
            resultBox.style.display = 'block';
            const result3Box = document.getElementById('result3');
            result3Box.style.display = 'block';
            const result4Box = document.getElementById('result4');
            result4Box.style.display = 'block';
            const result2Box = document.getElementById('result2');
            const result6Box = document.getElementById('result6');
            const result5Box = document.getElementById('result5');

            document.getElementById("result2").classList.remove('result2__margin');

            if (window.innerWidth < 768){
                result6Box.style.display = 'none';
                result5Box.style.display = 'block';
            }else{
                result6Box.style.display = 'flex';
                result5Box.style.display = 'none';
            }

            const time = data.location.localtime;
            const temperature = data.current.temp_c;
            const description = data.current.condition.text;
            const suggestion = getClothingSuggestion(temperature);
            const humidity = data.current.humidity;
            const wind = data.current.wind_kph;
            const windDirection = data.current.wind_dir; 
            const windDirectionSpanish = windDirections[windDirection] || windDirection; 

            const maxTemp = data.forecast.forecastday[0].day.maxtemp_c;
            const minTemp = data.forecast.forecastday[0].day.mintemp_c;
            const willRain = data.forecast.forecastday[0].day.daily_will_it_rain;
            const chanceRain = data.forecast.forecastday[0].day.daily_chance_of_rain;

            const actualHour = parseInt(time.split(' ')[1].split(':')[0]);

            const isMobile = window.innerWidth < 768;

            let plus1temp, plus1rain, plus2temp, plus2rain, plus3temp, plus3rain;
            let plus1Hour, plus2Hour, plus3Hour;

            if (actualHour <= 20) {
                
                plus1Hour = actualHour + 1;
                plus2Hour = actualHour + 2;
                plus3Hour = actualHour + 3;
                
                plus1temp = data.forecast.forecastday[0].hour[plus1Hour].temp_c;
                plus1rain = data.forecast.forecastday[0].hour[plus1Hour].chance_of_rain;

                plus2temp = data.forecast.forecastday[0].hour[plus2Hour].temp_c;
                plus2rain = data.forecast.forecastday[0].hour[plus2Hour].chance_of_rain;

                plus3temp = data.forecast.forecastday[0].hour[plus3Hour].temp_c;
                plus3rain = data.forecast.forecastday[0].hour[plus3Hour].chance_of_rain;
            } else if (actualHour === 21) {
                
                plus1Hour = actualHour + 1;
                plus2Hour = actualHour + 2;
                plus3Hour = 0; 
                
                plus1temp = data.forecast.forecastday[0].hour[plus1Hour].temp_c;
                plus1rain = data.forecast.forecastday[0].hour[plus1Hour].chance_of_rain;

                plus2temp = data.forecast.forecastday[0].hour[plus2Hour].temp_c;
                plus2rain = data.forecast.forecastday[0].hour[plus2Hour].chance_of_rain;

                
                plus3temp = data.forecast.forecastday[1].hour[0].temp_c;
                plus3rain = data.forecast.forecastday[1].hour[0].chance_of_rain;
            } else if (actualHour === 22) {
                
                plus1Hour = actualHour + 1;
                plus2Hour = 0; 
                plus3Hour = 1; 
                
                plus1temp = data.forecast.forecastday[0].hour[plus1Hour].temp_c;
                plus1rain = data.forecast.forecastday[0].hour[plus1Hour].chance_of_rain;

                
                plus2temp = data.forecast.forecastday[1].hour[0].temp_c;
                plus2rain = data.forecast.forecastday[1].hour[0].chance_of_rain;

                plus3temp = data.forecast.forecastday[1].hour[1].temp_c;
                plus3rain = data.forecast.forecastday[1].hour[1].chance_of_rain;
            } else if (actualHour === 23) {
               
                plus1Hour = 0; 
                plus2Hour = 1; 
                plus3Hour = 2;

                plus1temp = data.forecast.forecastday[1].hour[0].temp_c;
                plus1rain = data.forecast.forecastday[1].hour[0].chance_of_rain;

                plus2temp = data.forecast.forecastday[1].hour[1].temp_c;
                plus2rain = data.forecast.forecastday[1].hour[1].chance_of_rain;

                plus3temp = data.forecast.forecastday[1].hour[2].temp_c;
                plus3rain = data.forecast.forecastday[1].hour[2].chance_of_rain;
            }

            document.getElementById('result5').innerHTML = isMobile
            ? `
                <details>
                    <summary>Clima en las Próximas horas:</summary>
                    <p class="suggestion__text">Próximas horas:</p>
                    <p>${plus1Hour}:00hs: ${plus1temp}° - ${plus1rain}% Lluvia</p>
                    <p>${plus2Hour}:00hs: ${plus2temp}° - ${plus2rain}% Lluvia</p>
                    <p>${plus3Hour}:00hs: ${plus3temp}° - ${plus3rain}% Lluvia</p>
                </details>
            `
            : `
                <p class="suggestion__text">Próximas horas:</p>
                <p>${plus1Hour}:00hs: ${plus1temp}° - ${plus1rain}% Lluvia</p>
                <p>${plus2Hour}:00hs: ${plus2temp}° - ${plus2rain}% Lluvia</p>
                <p>${plus3Hour}:00hs: ${plus3temp}° - ${plus3rain}% Lluvia</p>
            `;

            const date = time.split(" ")[0];
            const [year, month, day] = date.split("-");
            const formattedDate = `${day}/${month}`;

            const will = willRain === 0 ? "NO" : "SÍ";

            let rainMessage = '';
            if (chanceRain >= 0 && chanceRain <= 20) {
                rainMessage = "Muy improbable que llueva. En general, se considera que no lloverá.";
            } else if (chanceRain > 20 && chanceRain <= 40) {
                rainMessage = "Ligeramente improbable que llueva, aunque puede haber lluvias ligeras o esporádicas.";
            } else if (chanceRain > 40 && chanceRain <= 60) {
                rainMessage = "Zona de incertidumbre. Es un '50/50', donde puede o no llover.";
            } else if (chanceRain > 60 && chanceRain <= 80) {
                rainMessage = "Probabilidad elevada de que llueva. Es más seguro pensar que lloverá.";
            } else if (chanceRain > 80 && chanceRain <= 100) {
                rainMessage = "Muy probable que llueva. Se considera casi seguro que lloverá.";
            }
        
            document.getElementById('result3').innerHTML = isMobile
            ? `
                <details>
                    <summary>Pronóstico para hoy:</summary>
                    <p class="suggestion__text">Pronóstico para hoy: ${formattedDate}</p>
                    <p>Máxima: ${maxTemp}° - Mínima: ${minTemp}°</p>
                    <p>¿Se esperan lluvias para hoy?: ${will}</p>
                    <p>Chances que llueva: ${chanceRain}%</p>
                    <p>${rainMessage}</p>
                </details>
            `
            : `
                <p class="suggestion__text">Pronóstico para hoy ${formattedDate}</p>
                <div class="forecast__box">
                    <svg class="forecast__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 320 512"><path fill="#ddddddc5" d="M160 64c-26.5 0-48 21.5-48 48l0 164.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5L208 112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112l0 164.4c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6L48 112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3L144 208c0-8.8 7.2-16 16-16s16 7.2 16 16l0 114.7c18.6 6.6 32 24.4 32 45.3z"/></svg>
                    <p class="forecast__text">Máxima: ${maxTemp}° - Mínima: ${minTemp}°</p>
                </div>
                <div class="forecast__box">
                    <svg class="forecast__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 576 512"><path fill="#ddddddc5" d="M288 0c17.7 0 32 14.3 32 32l0 17.7C451.8 63.4 557.7 161 573.9 285.9c2 15.6-17.3 24.4-27.8 12.7C532.1 283 504.8 272 480 272c-38.7 0-71 27.5-78.4 64.1c-1.7 8.7-8.7 15.9-17.6 15.9s-15.8-7.2-17.6-15.9C359 299.5 326.7 272 288 272s-71 27.5-78.4 64.1c-1.7 8.7-8.7 15.9-17.6 15.9s-15.8-7.2-17.6-15.9C167 299.5 134.7 272 96 272c-24.8 0-52.1 11-66.1 26.7C19.4 310.4 .1 301.5 2.1 285.9C18.3 161 124.2 63.4 256 49.7L256 32c0-17.7 14.3-32 32-32zm0 304c12.3 0 23.5 4.6 32 12.2l0 114.3c0 45-36.5 81.4-81.4 81.4c-30.8 0-59-17.4-72.8-45l-2.3-4.7c-7.9-15.8-1.5-35 14.3-42.9s35-1.5 42.9 14.3l2.3 4.7c3 5.9 9 9.6 15.6 9.6c9.6 0 17.4-7.8 17.4-17.4l0-114.3c8.5-7.6 19.7-12.2 32-12.2z"/></svg>
                    <p class="forecast__text">Chances que llueva: ${chanceRain}%</p>
                </div>
                <p>${rainMessage}</p>
            `;

            const maxTemp2 = data.forecast.forecastday[1].day.maxtemp_c;
            const minTemp2 = data.forecast.forecastday[1].day.mintemp_c;
            const willRain2 = data.forecast.forecastday[1].day.daily_will_it_rain;
            const chanceRain2 = data.forecast.forecastday[1].day.daily_chance_of_rain;

            const time2 = data.forecast.forecastday[1].date;
            const [year2, month2, day2] = time2.split("-");
            const formattedDate2 = `${day2}/${month2}`;

            const will2 = willRain2 === 0 ? "NO" : "SÍ";

            let rainMessage2 = '';
            if (chanceRain2 >= 0 && chanceRain2 <= 20) {
                rainMessage2 = "Muy improbable que llueva. En general, se considera que no lloverá.";
            } else if (chanceRain2 > 20 && chanceRain2 <= 40) {
                rainMessage2 = "Ligeramente improbable que llueva, aunque puede haber lluvias ligeras o esporádicas.";
            } else if (chanceRain2 > 40 && chanceRain2 <= 60) {
                rainMessage2 = "Zona de incertidumbre. Es un '50/50', donde puede o no llover.";
            } else if (chanceRain2 > 60 && chanceRain2 <= 80) {
                rainMessage2 = "Probabilidad elevada de que llueva. Es más seguro pensar que lloverá.";
            } else if (chanceRain2 > 80 && chanceRain2 <= 100) {
                rainMessage2 = "Muy probable que llueva. Se considera casi seguro que lloverá.";
            }
        
            document.getElementById('result4').innerHTML = isMobile
            ? `
                <details>
                    <summary>Pronóstico para mañana:</summary>
                    <p class="suggestion__text">Pronóstico para mañana: ${formattedDate2}</p>
                    <p>Máxima: ${maxTemp2}° - Mínima: ${minTemp2}°</p>
                    <p>¿Se esperan lluvias para mañana?: ${will2}</p>
                    <p>Chances que llueva: ${chanceRain2}%</p>
                    <p>${rainMessage2}</p>
                </details>
            `
            : `
                <p class="suggestion__text">Pronóstico para mañana ${formattedDate2}</p>
                <div class="forecast__box">
                    <svg class="forecast__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 320 512"><path fill="#ddddddc5" d="M160 64c-26.5 0-48 21.5-48 48l0 164.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5L208 112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112l0 164.4c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6L48 112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3L144 208c0-8.8 7.2-16 16-16s16 7.2 16 16l0 114.7c18.6 6.6 32 24.4 32 45.3z"/></svg>
                    <p class="forecast__text">Máxima: ${maxTemp2}° - Mínima: ${minTemp2}°</p>
                </div>
                <div class="forecast__box">
                    <svg class="forecast__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 576 512"><path fill="#ddddddc5" d="M288 0c17.7 0 32 14.3 32 32l0 17.7C451.8 63.4 557.7 161 573.9 285.9c2 15.6-17.3 24.4-27.8 12.7C532.1 283 504.8 272 480 272c-38.7 0-71 27.5-78.4 64.1c-1.7 8.7-8.7 15.9-17.6 15.9s-15.8-7.2-17.6-15.9C359 299.5 326.7 272 288 272s-71 27.5-78.4 64.1c-1.7 8.7-8.7 15.9-17.6 15.9s-15.8-7.2-17.6-15.9C167 299.5 134.7 272 96 272c-24.8 0-52.1 11-66.1 26.7C19.4 310.4 .1 301.5 2.1 285.9C18.3 161 124.2 63.4 256 49.7L256 32c0-17.7 14.3-32 32-32zm0 304c12.3 0 23.5 4.6 32 12.2l0 114.3c0 45-36.5 81.4-81.4 81.4c-30.8 0-59-17.4-72.8-45l-2.3-4.7c-7.9-15.8-1.5-35 14.3-42.9s35-1.5 42.9 14.3l2.3 4.7c3 5.9 9 9.6 15.6 9.6c9.6 0 17.4-7.8 17.4-17.4l0-114.3c8.5-7.6 19.7-12.2 32-12.2z"/></svg>
                    <p class="forecast__text">Chances que llueva: ${chanceRain2}%</p>
                </div>
                <p>${rainMessage2}</p>
            `;

            const isDay = data.current.is_day; 
            const layout = document.querySelector('.layout');

            if (isDay === 1) { 
                layout.classList.remove('layout--night');
                resultBox.classList.remove('result--night');
                result3Box.classList.remove('result--night');
                result4Box.classList.remove('result--night');
                result2Box.classList.remove('result--night');
                result6Box.classList.remove('result--night');
            } else { 
                layout.classList.add('layout--night');
                resultBox.classList.add('result--night');
                result3Box.classList.add('result--night');
                result4Box.classList.add('result--night');
                result2Box.classList.add('result--night');
                result6Box.classList.add('result--night');
            }

            document.getElementById('icon__container').style.display = 'flex';

            const gifUrl = weatherGifs[description] || "assets/img/tierra.png";

            document.getElementById('icon__container').innerHTML = `
                <p><img id="main__icon" class="icon__weather" src="${gifUrl}" alt=""></p>
            `;

            const cityName = data.location.name;
            const countryName = data.location.country;

            document.getElementById('result').innerHTML = `
                <p>Hora en ${cityName}, ${countryName}: ${time.split(' ')[1]}</p>
                <p class="weather__temperature">${temperature}°</p>
                <p class="weather__description">${description}</p>

                <div class="wind__info">
                    <svg class="wind__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="#ddddddc5" d="M184 184a32 32 0 0 1-32 32c-13.7 0-26.95-8.93-31.5-21.22a8 8 0 0 1 15-5.56C137.74 195.27 145 200 152 200a16 16 0 0 0 0-32H40a8 8 0 0 1 0-16h112a32 32 0 0 1 32 32m-64-80a32 32 0 0 0 0-64c-13.7 0-26.95 8.93-31.5 21.22a8 8 0 0 0 15 5.56C105.74 60.73 113 56 120 56a16 16 0 0 1 0 32H24a8 8 0 0 0 0 16Zm88-32c-13.7 0-26.95 8.93-31.5 21.22a8 8 0 0 0 15 5.56C193.74 92.73 201 88 208 88a16 16 0 0 1 0 32H32a8 8 0 0 0 0 16h176a32 32 0 0 0 0-64"/></svg>
                    <p class="margin">Viento: </p>
                    <p> ${windDirectionSpanish} ${wind} Km/h</p>
                </div>
                <div class="humidity__info">
                    <svg class="humidity__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ddddddc5" d="M12 21.5q-3.325 0-5.663-2.3T4 13.6q0-1.575.613-3.012T6.35 8.05l4.25-4.175q.3-.275.663-.425T12 3.3t.738.15t.662.425l4.25 4.175q1.125 1.1 1.738 2.538T20 13.6q0 3.3-2.337 5.6T12 21.5m0-2q2.5 0 4.25-1.713T18 13.6q0-1.175-.45-2.237T16.25 9.5L12 5.3L7.75 9.5q-.85.8-1.3 1.863T6 13.6q0 2.475 1.75 4.188T12 19.5"/></svg>
                    <p class="margin">Humedad: </p>
                    <p> ${humidity}%</p>
                </div>
            `;

            document.getElementById('result2').innerHTML = `
                <p class="suggestion__text">Sugerencia de ropa</p>
                <p>${suggestion}</p>
            `;
            
            const precipAmountMm = data.current.precip_mm; 
            
            const rainConditions = [
                "Lluvia ligera",
                "Llovizna a intervalos",
                "Llovizna",
                "Lluvias ligeras a intervalos",
                "Ligeras lluvias",
                "Ligeras lluvias heladas",
                "Ligeras precipitaciones",
                "Llovizna helada",
                "Llovizna helada a intervalos en las aproximaciones",
                "Lluvia moderada a intervalos",
                "Lluvia moderada",
                "Periodos de lluvia moderada",
                "Lluvias fuertes o moderadas",
                "Lluvias heladas fuertes o moderadas",
                "Intervalos de lluvias ligeras con tormenta en la región",
                "Lluvia intensa",
                "Chubascos",
                "Fuerte llovizna helada",
                "Periodos de fuertes lluvias",
                "Fuertes lluvias",
                "Lluvias torrenciales",
                "Lluvias con tormenta fuertes o moderadas en la región",
                "Cielos tormentosos en las aproximaciones",
                "Tormentas eléctricas",
                "Intervalos de lluvias ligeras con tormenta en la región",
                "Nieve moderada con tormenta en la región",
                "Nieve moderada o fuertes nevadas con tormenta en la región",
                "Granizo",
                "Ligeros chubascos acompañados de granizo",
                "Chubascos fuertes o moderados acompañados de granizo",
            ];
                   
            if (rainConditions.includes(description)) {
                document.getElementById('result2').innerHTML += `
                    <p>¡Ha habido o hay precipitaciones! Considera llevar un paraguas.</p>
                `;
            } else if (precipAmountMm > 0) {
                document.getElementById('result2').innerHTML += `
                    <p>¡Ha habido precipitaciones! Considera llevar un paraguas.</p>
                `;
            } else {
                document.getElementById('result2').innerHTML += `
                    <p>No se registran precipitaciones.</p>
                `;
            }

            const currentTime = data.location.localtime;
            const currentHour = parseInt(currentTime.split(" ")[1].split(":")[0], 10); 

            let rainHtml = ``;
            let rainFound = false;

            for (let i = currentHour; i < 24; i++) {
                const rainChance = data.forecast.forecastday[0].hour[i].chance_of_rain;
                
                
                if (rainChance > 0) {
                    rainHtml += `<p class="rainHour">${i}:00hs <br> <img class="icon__rain" src="assets/img/lluvia.png" alt=""> <br>${rainChance}%</p>`;
                    rainFound = true;
                }
            }
  
            if (!rainFound) {

                const description0 =  data.forecast.forecastday[0].hour[0].condition.text;
                const description2 =  data.forecast.forecastday[0].hour[2].condition.text;
                const description4 =  data.forecast.forecastday[0].hour[4].condition.text;
                const description6 =  data.forecast.forecastday[0].hour[6].condition.text;
                const description8 =  data.forecast.forecastday[0].hour[8].condition.text;
                const description10 =  data.forecast.forecastday[0].hour[10].condition.text;
                const description12 =  data.forecast.forecastday[0].hour[12].condition.text;
                const description14 =  data.forecast.forecastday[0].hour[14].condition.text;
                const description16 =  data.forecast.forecastday[0].hour[16].condition.text;
                const description18 =  data.forecast.forecastday[0].hour[18].condition.text;
                const description20 =  data.forecast.forecastday[0].hour[20].condition.text;
                const description22 =  data.forecast.forecastday[0].hour[22].condition.text;

                const gifUrl0 = weatherGifs[description0] || "assets/img/tierra.png";
                const gifUrl2 = weatherGifs[description2] || "assets/img/tierra.png";
                const gifUrl4 = weatherGifs[description4] || "assets/img/tierra.png";
                const gifUrl6 = weatherGifs[description6] || "assets/img/tierra.png";
                const gifUrl8 = weatherGifs[description8] || "assets/img/tierra.png";
                const gifUrl10 = weatherGifs[description10] || "assets/img/tierra.png";
                const gifUrl12 = weatherGifs[description12] || "assets/img/tierra.png";
                const gifUrl14 = weatherGifs[description14] || "assets/img/tierra.png";
                const gifUrl16 = weatherGifs[description16] || "assets/img/tierra.png";
                const gifUrl18 = weatherGifs[description18] || "assets/img/tierra.png";
                const gifUrl20 = weatherGifs[description20] || "assets/img/tierra.png";
                const gifUrl22 = weatherGifs[description22] || "assets/img/tierra.png";

                const temp0 = data.forecast.forecastday[0].hour[0].temp_c;
                const temp2 = data.forecast.forecastday[0].hour[2].temp_c;
                const temp4 = data.forecast.forecastday[0].hour[4].temp_c;
                const temp6 = data.forecast.forecastday[0].hour[6].temp_c;
                const temp8 = data.forecast.forecastday[0].hour[8].temp_c;
                const temp10 = data.forecast.forecastday[0].hour[10].temp_c;
                const temp12 = data.forecast.forecastday[0].hour[12].temp_c;
                const temp14 = data.forecast.forecastday[0].hour[14].temp_c;
                const temp16 = data.forecast.forecastday[0].hour[16].temp_c;
                const temp18 = data.forecast.forecastday[0].hour[18].temp_c;
                const temp20 = data.forecast.forecastday[0].hour[20].temp_c;
                const temp22 = data.forecast.forecastday[0].hour[22].temp_c;

                rainHtml += `<p class="forecastHour">00:00hs <br> <img class="icon__forecast" src="${gifUrl0}" alt=""> <br>${temp0}°</p>`;
                rainHtml += `<p class="forecastHour">02:00hs <br> <img class="icon__forecast" src="${gifUrl2}" alt=""> <br>${temp2}°</p>`;
                rainHtml += `<p class="forecastHour">04:00hs <br> <img class="icon__forecast" src="${gifUrl4}" alt=""> <br>${temp4}°</p>`;
                rainHtml += `<p class="forecastHour">06:00hs <br> <img class="icon__forecast" src="${gifUrl6}" alt=""> <br>${temp6}°</p>`;
                rainHtml += `<p class="forecastHour">08:00hs <br> <img class="icon__forecast" src="${gifUrl8}" alt=""> <br>${temp8}°</p>`;
                rainHtml += `<p class="forecastHour">10:00hs <br> <img class="icon__forecast" src="${gifUrl10}" alt=""> <br>${temp10}°</p>`;
                rainHtml += `<p class="forecastHour">12:00hs <br> <img class="icon__forecast" src="${gifUrl12}" alt=""> <br>${temp12}°</p>`;
                rainHtml += `<p class="forecastHour">14:00hs <br> <img class="icon__forecast" src="${gifUrl14}" alt=""> <br>${temp14}°</p>`;
                rainHtml += `<p class="forecastHour">16:00hs <br> <img class="icon__forecast" src="${gifUrl16}" alt=""> <br>${temp16}°</p>`;
                rainHtml += `<p class="forecastHour">18:00hs <br> <img class="icon__forecast" src="${gifUrl18}" alt=""> <br>${temp18}°</p>`;
                rainHtml += `<p class="forecastHour">20:00hs <br> <img class="icon__forecast" src="${gifUrl20}" alt=""> <br>${temp20}°</p>`;
                rainHtml += `<p class="forecastHour">22:00hs <br> <img class="icon__forecast" src="${gifUrl20}" alt=""> <br>${temp22}°</p>`;
                
                document.getElementById("result6").innerHTML = `
                <p class="suggestion__text">Pronóstico del día</p>
                <div id="result6b">
                </div>
                `;
            }else{
                document.getElementById("result6").innerHTML = `
                <p class="suggestion__text">Probabilidad de lluvia para hoy</p>
                <div id="result6b">
                </div>
                `
            }
           
            document.getElementById("result6b").innerHTML = rainHtml;
            
            const advice = getAdvice(temperature, description); 
            document.getElementById('result2').innerHTML += `<p>${advice}</p>`;
        })
        .catch(error => {
            document.getElementById('icon__container').style.display = 'none';
            document.getElementById('result2').innerHTML = 'Error al obtener los datos del clima. Por favor, ingresá tu ciudad.';
            const resultBox = document.getElementById('result');
            resultBox.style.display = 'none';
            const result3Box = document.getElementById('result3');
            result3Box.style.display = 'none';
            const result4Box = document.getElementById('result4');
            result4Box.style.display = 'none';
            const result6Box = document.getElementById('result6');
            result6Box.style.display = 'none';
            const result5Box = document.getElementById('result5');
            result5Box.style.display = 'none';
            console.error(error);

            if (window.innerWidth < 768){
                document.getElementById("result2").classList.add('result2__margin');
            }
        });

    }
    
    function getAdvice(temperature, weatherCondition) {
        if (weatherCondition === "parcialmente nublado" || weatherCondition === "nublado") { 
            if (temperature > 20) {
                return "Está nublado, pero hace calor. ¡No necesitas abrigo!";
            } else {
                return "Un día nublado. Lleva un abrigo por si refresca.";
            }
        } else if (weatherCondition === "soleado"){
            if (temperature > 25){
                return "Hace calor, lleva un sombrero y protector solar.";
            } else {
                return "Es un buen día para salir. ¡Disfruta del sol!";
            }
        } else {
            return weatherAdvice[weatherCondition] || "";
        }

        
    }

    function getClothingSuggestion(temp) {
        if (temp < -10) {
            return 'Ropa térmica, abrigo muy pesado, bufanda, gorro, guantes y botas.';
        } else if (temp < 0) {
            return 'Abrigo grueso, suéter, bufanda, guantes y gorro. Botas abrigadas.';
        } else if (temp < 5) {
            return 'Abrigo pesado, bufanda, gorro, guantes y zapatos resistentes al frío.';
        } else if (temp < 10) {
            return 'Abrigo pesado, bufanda y guantes. Considera una capa adicional debajo.';
        } else if (temp < 15) {
            return 'Chaqueta de entretiempo o suéter grueso. Podrías necesitar una bufanda ligera.';
        } else if (temp < 20) {
            return 'Chaqueta ligera, suéter o cardigan. Ropa de manga larga es adecuada.';
        } else if (temp < 25) {
            return 'Ropa casual ligera, como una camiseta de manga larga o camisa. Pantalones ligeros.';
        } else if (temp < 30) {
            return 'Camiseta de manga corta y pantalones cortos o falda. Ropa cómoda para el calor.';
        } else if (temp < 35) {
            return 'Ropa muy ligera, como camiseta sin mangas y shorts. Gafas de sol y protector solar recomendados.';
        } else if (temp < 40) {
            return 'Ropa fresca y de colores claros. Mantente hidratado, usa gorra o sombrero.';
        } else {
            return 'Ropa mínima, busca sombra y mantente hidratado. Evita la exposición prolongada al sol.';
        }
    }
    
});
