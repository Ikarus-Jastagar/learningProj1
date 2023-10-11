import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL+"/api/"

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

async function uploadTrialData(data){
    try{
        const res = await api.post("users",data)
        return res.data
    }catch(err){
        throw err
    }
}
async function getImages(data){
    const res = await api.get("images/"+data)
    return res.data
}


export {
    uploadTrialData,
    getImages
}