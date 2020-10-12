import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    business_id: '',
    title: 'title',
    address: 'address',
    price: 100,
    description: '123 Fake Street',
    content: 'Content',
    category: '',
    lat: '123',
    lng: '123',
    user: '',
    _id: ''
}

function CreateBusiness() {
    const state = useContext(GlobalState)
    const [business, setBusiness] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [user] = state.userAPI.user
    const [images, setImages] = useState(false)
    const [menu, setMenu] = useState(false)
    const [loading, setLoading] = useState(false)

    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [businesses] = state.businessesAPI.businesses
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.businessesAPI.callback

    useEffect(() =>{
        if(param.id){
            setOnEdit(true)
            businesses.forEach(business => {
                if(business._id === param.id){
                    setBusiness(business)
                    setImages(business.images)
                    setMenu(business.menu)
                } 
            })
        }else{
            setOnEdit(false)
            setBusiness(initialState)
            setImages(false)
            setMenu(false)
        }
    }, [param.id, businesses])

    const handleUpload = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]

            if (!file) return alert("File not exist")

            if (file.size > 1024 * 1024) //1mb
                return alert("Size too large")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg')
                return alert("File format is not supported")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: { 'context-type': 'multipart/form-data', Authorization: token }
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleUploadMenu = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]

            if (!file) return alert("File not exist")

            if (file.size > 1024 * 1024) //1mb
                return alert("Size too large")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg')
                return alert("File format is not supported")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: { 'context-type': 'multipart/form-data', Authorization: token }
            })
            setLoading(false)
            setMenu(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async ()=> {
        try {
            if (!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id},{
                headers: {Authorization: token}
            })

            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroyMenu = async ()=> {
        try {
            if (!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: menu.public_id},{
                headers: {Authorization: token}
            })

            setLoading(false)
            setMenu(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setBusiness({...business, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if (!isAdmin) return alert("You're not an admin")
            if (!images/!menu) return alert("No Image Upload")

	    business.user = user._id
		console.log(business)

            if(onEdit){
                await axios.put(`/api/businesses/${business._id}`, {...business, images, menu},{
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/businesses', {...business, images, menu},{
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

    const styleUploadMenu = {
        display: menu ? "block" : "none"
    }

    return (
        <div className="create_business">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                {
                    loading ? <div id="file_img"><Loading /></div>

                        :<div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ''} alt="" />
                            <span onClick={handleDestroy}>X</span>
                        </div>
                }
            </div>
            <div className="upload">
                <input type="file" name="file" id="file_up_menu" onChange={handleUploadMenu} />
                {
                    loading ? <div id="file_img"><Loading /></div>

                        :<div id="file_img" style={styleUploadMenu}>
                            <img src={menu ? menu.url : ''} alt="" />
                            <span onClick={handleDestroyMenu}>X</span>
                        </div>
                }

            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="business_id">Business ID</label>
                    <input type="text" name="business_id" id="business_id" required
                        value={business.business_id} onChange={handleChangeInput} disabled={onEdit}/>
                </div>

                <div className="row">
                    <label htmlFor="title">Location Name</label>
                    <input type="text" name="title" id="title" required
                        value={business.title} onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" id="address" required
                        value={business.address} onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlFor="lat">Latitude</label>
                    <input type="text" name="lat" id="lat" required
                        value={business.lat} onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlFor="lng">Longitude</label>
                    <input type="text" name="lng" id="lng" required
                        value={business.lng} onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                        value={business.price} onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                        value={business.description} rows="5" onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                        value={business.content} rows="7" onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={business.category} onChange={handleChangeInput}>
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateBusiness
