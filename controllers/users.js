const User = require('../models/user')
const bcryptjs = require('bcryptjs');

const usersGet = async(req, res) => {

    const { limit = 5, from = 0} = req.query; 
    /*const users = await User.find({state: true})
        .skip(Number(from))
        .limit(Number(limit));

    const total = await User.countDocuments({state: true});   */
    
    const [total, users] = await Promise.all([

        User.countDocuments({state: true}),
        User.find({state: true})
            .skip(Number(from))
            .limit(Number(limit))   

    ]);

    res.json({
        total,
        users
    });
}

const usersPost = async(req, res) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);

    //Guardad en base de datos
    await user.save();

    res.json({
        msg: 'usersPost',
        user
    });
}

const usersPut = async(req, res) => {
    
    const {id} = req.params
    const { _id, password, google, email, ...rest } = req.body

    if(password){
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest, { new: true });


    res.json({
        msg: 'usersPut',
        user
    });
}

const usersDelete = async(req, res) => {

    const { id } = req.params;

    //Borrar usuario fisicamente
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, { state: false }, { new: true });

    res.json({
        user
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
}