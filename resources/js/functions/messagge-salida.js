import moment from "moment/moment"
export default (data, horaSalida) => {

    let dataPropietario__ = JSON.parse(data.dataPropietario);

return `
*Confirmación de salida del huesped*

*${data.user.nombre} ${data.user.apellido}*

*Departamento:* ${dataPropietario__.departamento}
*N° Documento :* ${data.user.numero_documento}
*Hora de Salida :* ${moment(horaSalida).format("DD/MM/YYYY HH:mm")}
`

}
