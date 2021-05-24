function chart () {
    let I, E, R, L, L0, t, h, UL, tmax, tau;
    
            
            UL = 0;
            I = 0;
            t = 0;
            E =  Number(document.getElementById("E").value);  
            R = Number(document.getElementById("R").value);   
            L0 = Number(document.getElementById("L").value);   

    if (E == 0 || R == 0) {
        alert("Proszę podać dane");
    }
    else {
    
        L = L0 * Math.pow(10, -3);
        tau = L/R;
        tmax = 5 * tau;
        h = tau / 1000;
      
        var chart = new CanvasJS.Chart("chartContainer", {
            title: {
                text: "Napięcie UL w funkcji czasu",
                fontFamily: 'tahoma',
                fontSize: "28",
                

            },
            axisY: {
                title: "Napięcie UL [V]",
                labelFontSize: 20
            },
            axisX: {
                title: "Czas t [s]",
                labelFontSize: 20
            },
            data: [
                {
                    type: "spline",
                    dataPoints: [
                        { x: t, y: UL }
                    ]
                }
            ]
        });



        while (t < tmax) {

            UL = E * Math.exp(-t / tau);
            chart.options.data[0].dataPoints.push({ x: t, y: UL });
            t += h;

        }
        chart.render();

        //drugi wykres
        t = 0;
        
        var chart = new CanvasJS.Chart("chartContainer1", {
            title: {
                text: "Prąd IL w funkcji czasu",
                fontFamily: 'tahoma',
                
                fontSize: "28"


            },
            axisY: {
                title: "Natężenie prądu IL [mA]",
                labelFontSize: 20
            },
            axisX: {
                title: "Czas t [s]",
                labelFontSize: 20
            },
            data: [
                {
                    type: "spline",
                    color: "red",
                    dataPoints: [
                        { x: t, y: I }
                    ]
                }
            ]
        });



        while (t < tmax) {

            I = 1000 * (E / R) * (1 - Math.exp(-t / tau));
            chart.options.data[0].dataPoints.push({ x: t, y: I });
            t += h;

        }
        chart.render();
        

    }

}