import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL+"/api/"

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

async function uploadTrialData(data){
    const res = await api.post("users",data)
    return res.data
}
async function getImages(data){
    const res = await api.get("images/"+data.page)
    return res.data
}


export {
    uploadTrialData,
    getImages
}