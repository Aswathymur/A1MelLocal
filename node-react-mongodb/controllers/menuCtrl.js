const Menus = require('../models/menuModel')

const menuCtrl = {
    getMenus: async(req, res) =>{
        try {
            const menus = await Menus.find()
            res.json(menus)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createMenu: async (req, res) =>{
        try {
            const {menu_id, name, price, belong, description, images} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const menu = await Menus.findOne({menu_id})
            if(menu)
                return res.status(400).json({msg:"This menu already exists"})

            const newMenu = new Menus({
                menu_id, name: name.toLowerCase(), price, belong, description, images
            })

            await newMenu.save()
            res.json({msg: "Created menu"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteMenu: async (req, res) =>{
        try {
            //if user have role = 1 --> admin
            //only admin can create, delete and update menu
            await Menu.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleted a menu"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateMenu: async (req, res) =>{
        try {
            //if user have role = 1 --> admin
            //only admin can create, delete and update menu
            const {name} = req.body;
            await Menu.findByIdAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a menu"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = menuCtrl