module.exports.formateo = function generarTabla(ranking, bancos) {
    let j = 1;
    for (let i = 0; i < ranking.length; i++) {
        const element = ranking[i];
        element.posicion = j;
        j++;
        if (j == bancos.length + 1) {
            j = 1;
        }
        console.log(element);
    }
};