const router = require('express').Router()
const businessCtrl = require('../controllers/businessCtrl')


router.route('/businesses')
    .get(businessCtrl.getBusinesses)
    .post(businessCtrl.createBusiness)


router.route('/businesses/:id')
    .delete(businessCtrl.deleteBusiness)
    .put(businessCtrl.updateBusiness)



module.exports = router