import { __getApiData, __postApiData } from "./index"

const __getCommenApiDataList = async ({
  lookup_type,
  parent_lookup_id,
  isShort,
}) => {
  // console.log("__getCommenApiDataList called with:", { lookup_type, parent_lookup_id, isShort });
  
  return __postApiData(`/api/v1/common/lookuplist`, {
    // lookupcodes: lookup_type.join(","),
     lookup_type: lookup_type.join(","),
    parent_lookup_id: parent_lookup_id || null,
  })
    .then(res => {
      // console.log("Raw API response:", res);
      // console.log(res, "res common/lookuplist.on common API")
      if (res.response && res.response.response_code == "200") {
        const list = res.data.map(item => ({
          id: item._id,
          name: item?.lookup_value,
          ...item,
        }))
        // console.log("Processed list:", list);
        return list
      }
      console.log("No valid response, returning empty array");
      return []
    })
    .catch(error => {
      console.error("Error in __getCommenApiDataList:", error);
      return []
    })
}
const __getAccidentTypeAndCauseList = async (data) => {
return __getApiData("/api/v1/Common/accident_lookup", data).then(res => {
    // console.log(res, "res accident_lookup.on common API")
    if (res.response && res.response.response_code == "200") {
      console.log("res", res?.data)
      return res?.data?.data
    }
    console.log("No valid response, returning empty array");
    return []
  }).catch(error => {
    console.error("Error in __getAccidentTypeAndCauseList:", error);
    return []
  })
}

// Accident Master API functions
const __getAccidentList = async (data) => {
  return __postApiData("/api/v1/admin/AccidentList", data).then(res => {
    if (res.response && res.response.response_code == "200") {
      return res.data
    }
    console.log("No valid response, returning empty array");
    return { list: [], total: 0, page: 1, limit: 10 }
  }).catch(error => {
    console.error("Error in __getAccidentList:", error);
    return { list: [], total: 0, page: 1, limit: 10 }
  })
}

const __saveAccident = async (formData) => {
  return __postApiData("/api/v1/admin/SaveAccident", formData, "form").then(res => {
    if (res.response && res.response.response_code == "200") {
      return res.data
    }
    console.log("Error saving accident:", res.response?.message);
    throw new Error(res.response?.message || "Failed to save accident")
  }).catch(error => {
    console.error("Error in __saveAccident:", error);
    throw error
  })
}

const __updateAccident = async (formData) => {
  return __postApiData("/api/v1/admin/UpdateAccident", formData, "form").then(res => {
    if (res.response && res.response.response_code == "200") {
      return res.data
    }
    console.log("Error updating accident:", res.response?.message);
    throw new Error(res.response?.message || "Failed to update accident")
  }).catch(error => {
    console.error("Error in __updateAccident:", error);
    throw error
  })
}

const __deleteAccident = async (data) => {
  return __postApiData("/api/v1/admin/DeleteAccident", data).then(res => {
    if (res.response && res.response.response_code == "200") {
      return res.data
    }
    console.log("Error deleting accident:", res.response?.message);
    throw new Error(res.response?.message || "Failed to delete accident")
  }).catch(error => {
    console.error("Error in __deleteAccident:", error);
    throw error
  })
}

const __getAccident = async (data) => {
  return __postApiData("/api/v1/admin/GetAccident", data).then(res => {
    if (res.response && res.response.response_code == "200") {
      return res.data
    }
    console.log("Error getting accident:", res.response?.message);
    throw new Error(res.response?.message || "Failed to get accident")
  }).catch(error => {
    console.error("Error in __getAccident:", error);
    throw error
  })
}

const __getAccidentStatistics = async (data) => {
  return __postApiData("/api/v1/admin/AccidentStatistics", data).then(res => {
    if (res.response && res.response.response_code == "200") {
      return res.data
    }
    console.log("Error getting accident statistics:", res.response?.message);
    throw new Error(res.response?.message || "Failed to get accident statistics")
  }).catch(error => {
    console.error("Error in __getAccidentStatistics:", error);
    throw error
  })
}

export { 
  __getCommenApiDataList, 
  __getAccidentTypeAndCauseList,
  __getAccidentList,
  __saveAccident,
  __updateAccident,
  __deleteAccident,
  __getAccident,
  __getAccidentStatistics
}
