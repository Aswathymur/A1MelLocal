const router = require('express').Router()
const menuCtrl = require('../controllers/menuCtrl')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')

router.route('/menu')
    .get(menuCtrl.getMenus)
    .post(menuCtrl.createMenu)

router.route('/menu/:id')
    .delete(menuCtrl.deleteMenu)
    .put(menuCtrl.updateMenu)

module.exports = router