import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL+"/api/v1/"

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

async function getBlogsData() {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_BLOGS_API);
      if (!res) {
        throw new Error("Failed to fetch data");
      }
      return res.data;
    } catch (error) {
      console.log("Unable to fetch Blog :(\n due to", error.message);
    }
  }

export {
    uploadTrialData,
    getImages,
    getBlogsData
}