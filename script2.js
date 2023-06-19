const showContentCheckbox = document.getElementById("checkbox1");
const additionalContent = document.getElementById("hidden");
const boton = document.getElementById("BotonCalcular")
const costosMantenimiento = []
var valorFacturaVehiculo = 0
var porcentajeDepreciacion = 0
const ctx = document.getElementById('myChart');
var mantenimientoAcumulado = []
var ultimosCostos = []
var suma = 0;

boton.addEventListener('click', function(event){
    event.preventDefault();
})


showContentCheckbox.addEventListener('change', function(){

    if(this.checked){
        additionalContent.style.display = 'block';
    } else {
        additionalContent.style.display = 'none'
    }

})

function obtenerCostosMantenimiento(){

    valorFac = document.getElementById("input12").value
    valorFacturaVehiculo = valorFac
    porcentajeDepreciacion = document.getElementById("input11").value
    let tipo = document.getElementById("titulo").textContent
    console.log(tipo)
    let years = []
    let valorVehiculoPorAnio = []
    
    
    for (let i = 1; i < 11; i++) {
        years.push(`Año ${i}`)
        
    }


    if (tipo.includes("Taxis")) {
        
        for (let i = 1; i <= 11; i++) {
            
            let costo = document.getElementById(`input${i}`).value

            costosMantenimiento.push(parseInt(costo))
            console.log(`mantenimiento en el año ${i}: ${costosMantenimiento[i-1]}`);
            valorVehiculoPorAnio.push(i)
            
        }

    } 

    valorVehiculoPorAnio[0] = valorFacturaVehiculo -(valorFacturaVehiculo * porcentajeDepreciacion)/100
    


    console.log(valorVehiculoPorAnio[0])

    
    for (let i = 1; i < costosMantenimiento.length; i++) {
    
        valorVehiculoPorAnio[i] = valorVehiculoPorAnio[i-1] - (valorVehiculoPorAnio[i-1]*porcentajeDepreciacion)/100

    
    }


    mantenimientoAcumulado.push(costosMantenimiento[0])


    for (let i = 1; i < 11; i++) {
        
        mantenimientoAcumulado[i] = (mantenimientoAcumulado[i-1] + costosMantenimiento[i])

    }

    console.log(mantenimientoAcumulado);


    const data = {
        labels: years,
        datasets: [{
          label: 'Costos mantenimiento',
          data: costosMantenimiento,
          backgroundColor: 'blue', // Color de las barras
          borderColor: 'rgba(54, 162, 235, 1)', // Color del borde de las barras
          borderWidth: 2 // Ancho del borde de las barras
        },
        {
            label: 'Costo depreciado del vehiculo',
            data: valorVehiculoPorAnio,
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 2
        },
        {
            label: 'Mantenimiento acumulado',
            data: mantenimientoAcumulado,
            backgroundColor: 'pink',
            borderColor: 'pink',
            borderWidth: 2
        }

        ]
      };


      new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            plugins: {
                scales: {

                    y: {
                        beginAtZero: true,
                        max: valorFac + 100000,
                        min: 0,
                    }
                },
                annotation: {
                    annotations: [{
                        type: 'line',
                        mode: 'vertical',
                        scaleID: 'x',
                        value: 6, // Valor en el eje x donde quieres colocar la línea o marcador
                        borderColor: 'purple',
                        borderWidth: 7,
                        label: {
                            content: 'Años marcados',
                            enabled: true,
                            position: 'top'
                        }
                    },

                    {
                        type: 'label',
                        borderColor: 'purple',
                        borderRadius: 7,
                        borderWidth: 1,
                        content: ['Año', 'limite', 'por ley'],
                        position: {
                            x: 'end',
                            y: 'end'
                        },
                        xValue: 'Año 7',
                        yValue: (ctx) =>(ctx, 'Año 10')
                    }
                    ]
                }
            }
        }
        }
      );

      
      document.getElementById("resultados").innerHTML += `<div> Valor del vehiculo depreciado (por años): <br /> año 1: $${valorVehiculoPorAnio[0]} 
      <br /> año 2: $${valorVehiculoPorAnio[1]}
      <br /> año 3: $${valorVehiculoPorAnio[2]}
      <br /> año 4: $${valorVehiculoPorAnio[3]} 
      <br /> año 5: $${valorVehiculoPorAnio[4]} 
      <br /> año 6: $${valorVehiculoPorAnio[5]} 
      <br /> año 7: $${valorVehiculoPorAnio[6]}
      <br /> año 8: $${valorVehiculoPorAnio[7]} 
      <br /> año 9: $${valorVehiculoPorAnio[8]}  
      <br /> año 10: $${valorVehiculoPorAnio[9]} <br/> </div> 
      <div>
      
      
      <p> Valor final del vehiculo (depreciado): $${suma+valorVehiculoPorAnio[9]} </p>
      </div`

}

