import moment from "moment/moment"

export default (data) => {

    let dataPropietario__ = JSON.parse(data.dataPropietario);

return `
*****************************************
*Confirmación de llegada del Huesped*
*${data.user.nombre} ${data.user.apellido}*
*Departamento:* ${dataPropietario__.departamento}
*N° Documento :* ${data.user.numero_documento}
*Hora de Ingreso :* ${moment().format("DD/MM/YYYY HH:mm")}
`

}
