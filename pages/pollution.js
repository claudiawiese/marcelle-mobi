
var nameCity = document.getElementById('nameCity');



fetch("http://marcelle-mobi-api.herokuapp.com/air/quality_by_coordinates?lat=43.3&lng=5.4&grant_token=code4marseillefrioul").then(function(response) {
        return response.json();
    }).then(function(result) {
    	nameCity.innerHTML += result.data.city.name + '<br>';
    	document.getElementById('hour').innerHTML = result.data.time.s;
    	let aqi = result.data.aqi ;
    	if(aqi >= 0 && aqi < 51) {
    		let resultAqi = (300 - aqi) / 30; 
    		let resultAqiFixed = resultAqi.toFixed(1);
    		document.getElementById('aqi').innerHTML =  '<br>' + resultAqiFixed + ' / 10 ' + ' Bon';
    	} else if (aqi > 50 && aqi < 101) {
    		let resultAqi = (300 - aqi) / 30; 
    		let resultAqiFixed = resultAqi.toFixed(1);
    		document.getElementById('aqi').innerHTML = '<br>' + resultAqiFixed + ' / 10 ' + 'Modéré';
    	} else if (aqi > 100 && aqi < 151) {
    		let resultAqi = (300 - aqi) / 30; 
    		let resultAqiFixed = resultAqi.toFixed(1);
    		document.getElementById('aqi').innerHTML =  '<br>' + resultAqiFixed + ' / 10 ' + 'Mauvais pour les personnes sensibles';
    	} else if (aqi > 150 && aqi < 201) {
    		let resultAqi = (300 - aqi) / 30; 
    		let resultAqiFixed = resultAqi.toFixed(1);
    		document.getElementById('aqi').innerHTML =  '<br>' + resultAqiFixed + ' / 10 ' + ' Mauvais';
    	} else if (aqi > 200 && aqi < 301) {
    		let resultAqi = (300 - aqi) / 30; 
    		let resultAqiFixed = resultAqi.toFixed(1);
    		document.getElementById('aqi').innerHTML =  '<br>' + resultAqiFixed + ' / 10 ' + ' Très Mauvais';
    	} else if (aqi > 300) {
    		let resultAqi = (300 - aqi) / 30; 
    		let resultAqiFixed = resultAqi.toFixed(1);
    		document.getElementById('aqi').innerHTML =  '<br>' + resultAqiFixed + ' / 10 ' + ' Dangereux';
    	}
    		
    	document.getElementById('tauxAqi').innerHTML = '<br>' + 'Taux de pollution dans l\'air = ' + result.data.aqi + ' / 300 ' ;
       let iaqiResult = result.data.iaqi;
	   for (let oValue in iaqiResult)
       {
       	document.getElementById('iaqi').innerHTML += 'taux de ' + oValue + ' = ' + iaqiResult[oValue].v + '<br>';
       }

    }).catch(function(error) {
       
    });

