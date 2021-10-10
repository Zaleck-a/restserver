const Role = require('../models/role')
const User = require('../models/user')

const isRoleValid = async(role = '') => {
    const existRole = await Role.findOne({ role });
    if(!existRole){
        throw new Error(`El rol: ${ role } no esta registrado en la BD`)
    }
}

//Verificar si el correo existe
const existEmail = async( email = '' ) => {
    const isEmailValid = await User.findOne({ email });
    if ( isEmailValid ) {
        throw new Error(`El email:  ${ email } esta registrado`)
    }
    
}


const existId = async( id ) => {
    const isIdValid = await User.findById( id );
    if ( !isIdValid ) {
        throw new Error(`El id no existe ${ id }`)
    }
    
}


module.exports = {
    isRoleValid,
    existEmail,
    existId
}