const Reviews = require('../models/reviewModel')

const reviewCtrl = {
    getReviews: async(req, res) =>{
        try {
            const reviews = await Reviews.find()
            res.json(reviews)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createReview: async(req, res) =>{
        try {
            const {author, business, comment, rating} = req.body;
            const newReview = new Reviews({
                author, business, comment, rating
            })

            await newReview.save()
            res.json({msg: "Created review"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteReview: async(req, res) =>{
        try {
            await Reviews.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a review"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = reviewCtrl
