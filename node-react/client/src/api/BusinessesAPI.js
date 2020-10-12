import {useState, useEffect} from 'react'
import axios from 'axios'

function BusinessesAPI() {
        const [businesses, setBusinesses] = useState([])
        const [callback, setCallback] = useState(false)
        const [category, setCategory] = useState('')
        const [sort, setSort] = useState('')
        const [search, setSearch] = useState('')
        const [page, setPage] = useState(1)
        const [result, setResult] = useState(0)

        // get user id
        // get only busineses belonging to user !



        useEffect(() =>{
            const getBusinesses = async () => {
                const res = await axios.get(`/api/businesses?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
                setBusinesses(res.data.businesses)
                setResult(res.data.result)
            }
            getBusinesses()
        },[callback, category, sort, search, page])

    return {
        businesses: [businesses, setBusinesses],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default BusinessesAPI
