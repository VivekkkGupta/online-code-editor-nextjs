import { LANGUAGES } from '@/constants/constants';
import axios from 'axios'

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
})

export const executeCode = async (language,sourceCode) => {

    try {
        const response = await API.post("/execute", {
            "language": language,
            "version": LANGUAGES[language].version,
            "files": [
                {
                    "content": sourceCode
                }
            ],
        })
        return response;
    } catch (error) {
        return error;
    }
}