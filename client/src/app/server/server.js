import axios from 'axios'

const baseURL = "http://localhost:8000"

async function uploadTrialData(data){
    const res = await axios.post(baseURL + "/api/image_upload",data)
    return res.data
}

export {
    uploadTrialData
}