const fechaBoda = new Date("2026-12-20T00:00:00").getTime();

setInterval(() => {
    const hoy = new Date().getTime();
    const diff = fechaBoda - hoy;

    document.getElementById("dias").innerHTML    = Math.floor(diff / (1000*60*60*24));
    document.getElementById("horas").innerHTML   = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    document.getElementById("minutos").innerHTML = Math.floor((diff%(1000*60*60))/(1000*60));
    document.getElementById("segundos").innerHTML= Math.floor((diff%(1000*60))/1000);

}, 1000);
