const router = require('express').Router()
const reviewCtrl = require('../controllers/reviewCtrl')
const auth = require('../middlewares/auth')


router.route('/reviews')
    .get(reviewCtrl.getReviews)
    .post(auth, reviewCtrl.createReview)


router.route('/reviews/:id')
    .delete(auth, reviewCtrl.deleteReview)



module.exports = router