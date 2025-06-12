export const SQL_TARIFA_DIARIA = {
    FIND_ALL:
      "SELECT cod_parqueadero as codParqueadero, \
      cod_tipo_vehiculo as codTipoVehiculo, \
      valor_tarifa_diaria as valorTarifaDiaria \
      FROM tarifa_diaria",
  
    FIND_BY_PRIMARY_KEY:
      "SELECT cod_parqueadero as codParqueadero, \
      cod_tipo_vehiculo as codTipoVehiculo, \
      valor_tarifa_diaria as valorTarifaDiaria \
      FROM tarifa_diaria \
      WHERE cod_parqueadero = $1 AND cod_tipo_vehiculo = $2",
  
    FIND_BY_ID_PARQUEADERO:
      "SELECT cod_parqueadero as codParqueadero, \
      cod_tipo_vehiculo as codTipoVehiculo, \
      valor_tarifa_diaria as valorTarifaDiaria \
      FROM tarifa_diaria \
      WHERE cod_parqueadero = $1",
  
    FIND_BY_ID_TIPO_VEHICULO:
      "SELECT cod_parqueadero as codParqueadero, \
      cod_tipo_vehiculo as codTipoVehiculo, \
      valor_tarifa_diaria as valorTarifaDiaria \
      FROM tarifa_diaria \
      WHERE cod_tipo_vehiculo = $1",
  
    HOW_MANY:
      "SELECT COUNT(*) as cantidad \
      FROM tarifa_diaria \
      WHERE cod_parqueadero = $1 AND cod_tipo_vehiculo = $2",
  
    ADD:
      "INSERT INTO tarifa_diaria (cod_parqueadero, cod_tipo_vehiculo, valor_tarifa_diaria) \
      VALUES($1, $2, $3) \
      RETURNING cod_parqueadero as codParqueadero, \
                cod_tipo_vehiculo as codTipoVehiculo, \
                valor_tarifa_diaria as valorTarifaDiaria",
  
    DELETE:
      "DELETE FROM tarifa_diaria \
      WHERE cod_parqueadero = $1 AND cod_tipo_vehiculo = $2",
  
    UPDATE:
      "UPDATE tarifa_diaria \
      SET valor_tarifa_diaria = $3 \
      WHERE cod_parqueadero = $1 AND cod_tipo_vehiculo = $2 \
      RETURNING cod_parqueadero as codParqueadero, \
                cod_tipo_vehiculo as codTipoVehiculo, \
                valor_tarifa_diaria as valorTarifaDiaria",

    // Nuevas consultas para validaciones
    VERIFY_PARQUEADERO: "SELECT COUNT(*) as cantidad FROM parqueaderos WHERE cod_parqueadero = $1",
    
    VERIFY_TIPO_VEHICULO: "SELECT COUNT(*) as cantidad FROM tipos_vehiculos WHERE cod_tipo_vehiculo = $1"
};