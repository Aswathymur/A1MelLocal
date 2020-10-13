const Category = require('../models/categoryModel')
const Businesses = require('../models/businessModel')

const categoryCtrl = {
    getCategories: async(req, res) =>{
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory: async (req, res) =>{
        try {
            //if user have role = 1 --> admin
            //only admin can create, delete and update category
            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg:"This category already exist."})

            const newCategory = new Category({name})

            await newCategory.save()
            res.json({msg:"Created a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async (req, res) =>{
        try {
            const businesses = await Businesses.findOne({category: req.params.id})
            if(businesses) return res.status(400).json({
                msg: "Please delete all businesses with a relationship."
            })
            //if user have role = 1 --> admin
            //only admin can create, delete and update category
            await Category.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleted a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async (req, res) =>{
        try {
            //if user have role = 1 --> admin
            //only admin can create, delete and update category
            const {name} = req.body;
            await Category.findByIdAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = categoryCtrl