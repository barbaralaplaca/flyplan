import axios from "axios";
import { toast } from "react-toastify";

  export const getAutoSuggest = async () => {
    try {
        
      const response = await axios.get(
        // process.env.REACT_APP_API_SEARCH_PRODUCTION!,
        process.env.REACT_APP_API_SEARCH_DEV!,
      );
      return response.data
    } catch (error: any) {
      toast.error("Sorry, there is an error. Please, try again later.");
      throw error;
    }
  };
  

