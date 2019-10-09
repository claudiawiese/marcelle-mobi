<template>
<main>


   <div id="eval">
      <p class="bon border">BON</p>
      <p class="modere border">MODERE</p>
      <p class="sensible border">SENSIBLE</p>
      <p class="mauvais border">MAUVAIS</p>
      <p class="tres_mauvais border">TRES MAUVAIS</p>
      <p class="dangereux border">DANGEREUX</p>
    </div>
    <br>
    <input id="city" type="text" name="city">
    <input type="submit" name="envoyer" @click="api()">

<div id="nameCity"></div>
<div id="hour"> </div>
<div id="aqi" class="greeen"></div>
<div id="tauxAqi" class="greeen" ></div>

<div id="tableau" class="greeen" > </div>

<br>
<div id="test"> </div>
<br>


<div id="details"></div>
<br>

<div id="iaqiun"></div>
<div id="iaqideux"></div>
<div id="iaqitrois"></div>
<div id="iaqiquatre"></div>
<div id="iaqicinq"></div>
<div id="iaqisix"></div>
<br>
<div id="action" ></div>
<div id="titleCarte"></div>
<div id="carte"></div>
<br>
<div id="information"></div>
<br>
</main>
</template>
<script>
export default {
methods: {

api() {
var city = document.getElementById('city').value
document.getElementById('titleCarte').innerHTML = '<br><h2> Prévisions </h2>'
document.getElementById('carte').innerHTML = `<img src="${require("../assets/images/pollution.png")}">`
document.getElementById('details').innerHTML = '<h2>Détails des polluants</h2> <br> (NO2: Dioxyde d\'azote, S02 : Dioxyde de soufre, O3 : Ozone, PM10 : Particules de taille inférieure à 10 micromètres)'
document.getElementById('information').innerHTML = 'Plus d \'informations <a href="https://aqicn.org/here/fr/"> ici</a>'
let tableau = require("../assets/images/tableau.png")
document.getElementById('action').innerHTML = '<h2>Actions</h2> <br> <img   style="width:700px"src="'+ tableau+'"></div>'
fetch(`https://marcelle-mobi-api.herokuapp.com/air/quality_by_city?city=${city}&grant_token=code4marseillefrioul`).then(function(response) {
        return response.json();
    }).then(function(result) {
      nameCity.innerHTML += '<br> <h1>' + result.data.city.name + '</h1> <br>';
      document.getElementById('hour').innerHTML = '<h2>' + result.data.time.s + '</h2>';
      let aqi = result.data.aqi ;
      if(aqi >= 0 && aqi < 51) {
        let resultAqi = (300 - aqi) / 30;
        let resultAqiFixed = resultAqi.toFixed(1);
        document.getElementById('aqi').innerHTML =  '<br>' + resultAqiFixed + ' / 10 ' + ' Bon';
        document.getElementById('tableau').innerHTML = '<br>' + 'La qualité de l\'air est jugée satisfaisante, et la pollution de l\'air pose peu ou pas de risque.';
        document.getElementById('test').innerHTML = `<a href="https://www.marcelle.mobi/map"><img style="width:40px;"src="${require("../assets/images/velovert.jpg")}"></a> <b> Privilégiez le vélo </b>`;

      } else if (aqi > 50 && aqi < 101) {
        let resultAqi = (300 - aqi) / 30;
        document.getElementById('test').innerHTML = `<a href="https://www.marcelle.mobi/map"><img style="width:40px;"src="${require("../assets/images/velovert.jpg")}"></a> Privilégiez le vélo`;
        let resultAqiFixed = resultAqi.toFixed(1);
        document.getElementById('aqi').innerHTML = '<br>' + resultAqiFixed + ' / 10 ' + 'Modéré';
        document.getElementById('tableau').innerHTML = '<br>' + 'La qualité de l\'air est acceptable. Cependant, pour certains polluants, il peut y avoir un risque sur la santé pour un très petit nombre de personnes inhabituellement sensibles à la pollution atmosphérique.';

      } else if (aqi > 100 && aqi < 151) {
        let resultAqi = (300 - aqi) / 30;
        let resultAqiFixed = resultAqi.toFixed(1);
        document.getElementById('aqi').innerHTML =  '<br>' + resultAqiFixed + ' / 10 ' + 'Mauvais pour les personnes sensibles';
        document.getElementById('tableau').innerHTML = '<br>' + 'La qualité de l\'air est acceptable; Cependant, pour certains polluants, il peut y avoir un problème de santé modérée pour un très petit nombre de personnes qui sont particulièrement sensibles à la pollution de l\'air..';
        document.getElementById('test').innerHTML = `<a href="https://www.marcelle.mobi/map"><img style="width:40px;"src="${require("../assets/images/velovert.jpg")}"></a> Privilégiez le vélo`;

      } else if (aqi > 150 && aqi < 201) {
        let resultAqi = (300 - aqi) / 30;
        let resultAqiFixed = resultAqi.toFixed(1);
        document.getElementById('aqi').innerHTML =  '<br>' + resultAqiFixed + ' / 10 ' + ' Mauvais';
        document.getElementById('tableau').innerHTML = '<br>' + 'Tout le monde peut commencer à ressentir des effets sur la santé; les membres des groupes sensibles peuvent ressentir des effets de santé plus graves.';
        document.getElementById('test').innerHTML = '<a href="https://www.marcelle.mobi/map"><img style="width:40px;"src="../assets/images/velo.jpg"></a>';

      } else if (aqi > 200 && aqi < 301) {
        let resultAqi = (300 - aqi) / 30;
        let resultAqiFixed = resultAqi.toFixed(1);
        document.getElementById('aqi').innerHTML =  '<br>' + resultAqiFixed + ' / 10 ' + ' Très Mauvais';
        document.getElementById('tableau').innerHTML = '<br>' + 'Tout le monde peut commencer à ressentir des effets sur la santé; les membres des groupes sensibles peuvent ressentir des effets de santé plus graves.';
        document.getElementById('test').innerHTML = '<a href="https://www.marcelle.mobi/map"><img style="width:40px;"src="../assets/images/velo.jpg"></a>';

      } else if (aqi > 300) {
        let resultAqi = (300 - aqi) / 30;
        let resultAqiFixed = resultAqi.toFixed(1);
        document.getElementById('aqi').innerHTML =  '<br>' + resultAqiFixed + ' / 10 ' + ' Dangereux';
        document.getElementById('tableau').innerHTML = '<br>' + 'Alerte de santé: tout le monde peut ressentir des effets de santé plus graves.';
        document.getElementById('test').innerHTML = '<a href="https://www.marcelle.mobi/map"><img style="width:40px;"src="../assets/images/velo.jpg"></a>';
      }

      document.getElementById('tauxAqi').innerHTML = '<br>' + 'Taux de pollution dans l\'air = ' + result.data.aqi + ' / 300 ' ;
       let iaqiResult = result.data.iaqi;

     for (let oValue in iaqiResult)
       {
        if (oValue == 'o3' || oValue == 'no2' || oValue == 'so2' || oValue == 'pm10' || oValue == 'pm25') {
        console.log('test')
        if(iaqiResult[oValue].v >= 0 && iaqiResult[oValue].v < 50) {
        document.getElementById('iaqiun').innerHTML += 'taux de ' + oValue + ' = ' + iaqiResult[oValue].v + '<br>';
        }
        if(iaqiResult[oValue].v >= 50 && iaqiResult[oValue].v < 100) {
        document.getElementById('iaqideux').innerHTML += 'taux de ' + oValue + ' = ' + iaqiResult[oValue].v + '<br>';
        }
        if(iaqiResult[oValue].v >= 100 && iaqiResult[oValue].v < 150) {
        document.getElementById('iaqitrois').innerHTML += 'taux de ' + oValue + ' = ' + iaqiResult[oValue].v + '<br>';
        }
        if(iaqiResult[oValue].v >= 150 && iaqiResult[oValue].v < 200) {
        document.getElementById('iaqiquatres').innerHTML += 'taux de ' + oValue + ' = ' + iaqiResult[oValue].v + '<br>';
        }
        if(iaqiResult[oValue].v >= 200 && iaqiResult[oValue].v < 300) {
        document.getElementById('iaqicinq').innerHTML += 'taux de ' + oValue + ' = ' + iaqiResult[oValue].v + '<br>';
        }
        if(iaqiResult[oValue].v > 300) {
        document.getElementById('iaqisix').innerHTML += 'taux de ' + oValue + ' = ' + iaqiResult[oValue].v + '<br>';
        }
       }

       }

    }).catch(function(error) {

    });
}
},
  mounted() {
    var nameCity = document.getElementById('nameCity');

  }
}
</script>
<style>
*{
  padding: 0;
  margin: 0;
}

#eval:before, #eval:after {

}

body {
  background-color: white;
  font-family: 'Open Sans', cursive;
  font-weight: normal;
  font-size: 1em;
  text-align: center;
}

main {
  width: 60%;
  margin: 0 auto;
}


#eval{
  display: flex;
  margin: 5% auto 0 auto;
  justify-content: center;
  padding: 2%;
  position: relative;
}

#eval:before{

  position: absolute;
  background-color: green;
  width: 155px;
  height: 155px;
  top: -4%;
  left: -15%;

  padding: 55px 0 0 44px;
  transition: all 2s ease-in;
  font-size: 20px;
  font-weight: bold;
}

#eval:after{

  position: absolute;
  background-color: red;
  width: 155px;
  height: 155px;
  top: -4%;
  right: -16%;
  border-radius: 50%;
  padding: 55px 0 0 38px;
  transition: all 2s ease-in;
  font-size: 20px;
  font-weight: bold;
}

.bon {
  background-color: #83EF66 ;
}

.modere {
  background-color:#66EFBD ;
}

.sensible {
  background-color: #6696EF ;
}

.mauvais {
  background-color: #FFFF00  ;
}

.tres_mauvais {
  background-color: #FF4000 ;
}

.dangereux {
  background-color: #FF0000 ;
}

#eval p {
  width: 60%;
  padding: 2%;
  text-align: center;
  font-weight: bold;
  border-radius: 10px;
}

.border{
  border: 1px solid black;
  padding: 5px;
  margin-left: 10px;
}


/*---------------*/
/* MEDIA QUERIES */
/*---------------*/

@media screen and (max-width:1120px) {

  main {
    width: 95%;
  }

  #eval{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40%;
  }

  #eval:before{

    position: absolute;
    background-color: green;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    padding: 45px 0 0 39px;
    font-size: 14px;
    font-weight: bold;
    top: -40%;
    left: 39%;
  }

  #eval:after{

    position: absolute;
    background-color: red;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    padding: 45px 0 0 32px;
    font-size: 14px;
    font-weight: bold;
    top: 100%;
    left: 39%;
  }

}



.greeen {
  color: green;
}



#iaqiun
{
color: green;
}

#iaqideux
{
color : yellow;
}

#iaqitrois
{
color: orange;
}

#iaqiquatre
{
color: red;
}
#iaqicinq
{
color: purple;
}
#iaqisix
{
color: maroon;
}



.pasecolo {
background-image: url('../assets/images/velo.jpg');
background-position: 60%;
height: auto;
}



</style>
