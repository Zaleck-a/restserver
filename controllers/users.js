const usersGet = (req, res) => {

    const {apellido} = req.query

    res.json({
        msg: 'Hello World',
        apellido
    });
}

const usersPost = (req, res) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'usersPost',
        nombre,
        edad,
    });
}

const usersPut = (req, res) => {
    
    const {id} = req.params

    res.json({
        msg: 'usersPut',
        id
    });
}

const usersDelete = (req, res) => {
    res.json({
        msg: 'usersDelete'
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
}