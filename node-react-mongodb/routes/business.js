const router = require('express').Router()
const businessCtrl = require('../controllers/business_infoCtrl')


router.route('/business')
    .get(businessCtrl.getBusinesses)
    .post(businessCtrl.createBusiness)


router.route('/business/:id')
    .delete(businessCtrl.deleteBusiness)
    .put(businessCtrl.updateBusiness)



module.exports = router