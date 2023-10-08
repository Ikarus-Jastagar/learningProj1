import axios from 'axios'

const baseURL = "http://localhost:8000/api/"

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

async function uploadTrialData(data){
    const res = await api.post("image_upload",data)
    return res.data
}
async function getImages(number){
    const res = await api.get("all_users_images/"+number)
    return res.data
}

export {
    uploadTrialData,
    getImages
}