const Businesses = require('../models/businessModel')

//Filter, sort and page

class APIfeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString} //queryString = req.query

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        //gte = greater + equal
        //gt = greater
        //lt = less
        //lte = less + equal
        //regex = character for String data

        this.query.find(JSON.parse(queryStr))

        return this;
    }
        
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this .queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const businessCtrl = {
    getBusinesses: async(req, res) =>{
        try {
            const features = new APIfeatures(Businesses.find(), req.query)
            .filtering().sorting().paginating()

            const businesses = await features.query

            res.json({
                status: 'success',
                result: businesses.length,
                businesses: businesses
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createBusiness: async(req, res) =>{
        try {
            const {business_id, title, price, address, description, content, images, category, menu, lat, lng} = req.body;
            if(!images/ !menu) return res.status(400).json({msg: "No image upload"})

            const business = await Businesses.findOne({business_id})
            if(business)
                return res.status(400).json({msg:"This business already exists"})

            const newBusiness = new Businesses({
                business_id, title: title.toLowerCase(), price, address, description, content, images, category, menu, lat, lng
            })

            await newBusiness.save()
            res.json({msg: "Created business"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteBusiness: async(req, res) =>{
        try {
            await Businesses.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a business"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateBusiness: async(req, res) =>{
        try {
            const {title, price, address, description, content, images, category, menu, lat, lng} = req.body;
            if(!images/ !menu) return res.status(400).json({msg: "No image upload"})

            await Businesses.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), price, address, description, content, images, category, menu, lat, lng
            })

            res.json({msg: "Updated a business"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = businessCtrl