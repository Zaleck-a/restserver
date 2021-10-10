const { Router } = require('express');
const { check } = require('express-validator');


const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users');
const { isRoleValid, existEmail, existId } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');
const router = Router();


router.get('/', usersGet );

router.post('/', [
    check('name', 'El nombre no es valido').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({min: 6}),
    check('email', 'El correo no es valido').isEmail(),
    // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('email').custom( existEmail ),
    check('role').custom( isRoleValid ),
    validateFields
], usersPost);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existId ),
    check('role').custom( isRoleValid ),
    validateFields
],usersPut);

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existId ),
    validateFields
],usersDelete );

module.exports = router;