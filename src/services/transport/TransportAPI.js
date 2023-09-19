import axios from "axios"
import constants from "@/constants.js"

export default axios.create({
    baseURL: constants.DEV.API.TRANSPORT.PROXY_PATH
})