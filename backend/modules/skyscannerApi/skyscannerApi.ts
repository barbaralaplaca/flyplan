require("dotenv").config();
import axios from "axios";
import { manageResponse } from './skyscannerResponse'
import { InitialResponse, ManagedData } from './types'
import { Query } from "firebase/firestore";

export const skyscannerApiPost = async (input: Query) => {
  
  const optionsPost = {
    method: "POST",
    url: process.env.SKAPI_ASYNC,
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
      "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
    },
    data: input,
  };
  return await axios
    .request(optionsPost)
    .then((response: InitialResponse) => {
      const InitialData: ManagedData = {
        results: response.data.content.results,
        sessionToken: response.data.sessionToken,
        status: response.data.status,
      }
      return InitialData;
    })
}

export const skyscannerApi = async (input: Query) => {
  const data: ManagedData = await skyscannerApiPost(input)
  return manageResponse(data.results)
}

export const skyscannerApiGet = async (input: Query) => {
  const optionsGet = (response: string) => {
    const methodGet = {
      method: 'GET',
      url: `${process.env.SKAPI_ASYNC_GET}${response}`,
      headers: {
        "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
        "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
      }
    }
    return methodGet;
  };
  const data: ManagedData = await skyscannerApiPost(input)
  return await axios
    .request(optionsGet(data.sessionToken))
    .then((response: InitialResponse) => {
      const InitialData: ManagedData = {
        results: response.data.content.results,
        sessionToken: response.data.sessionToken,
        status: response.data.status,
      }
      return manageResponse(InitialData.results);
    })
}
