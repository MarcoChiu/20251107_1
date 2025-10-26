//##############共用function##############
//https://axios-http.com/zh/docs/handling_errors
const axiosError = (error) => {
    let title = '';
    let text = '';
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
            title = "Not Found";
            text = '找不到網頁，請檢查網址是否正確!!';
        } else if (error.code === "ERR_NETWORK") {
            title = 'NETWORK Error';
            text = "請檢查網路是否正常!!";
        } else if (error.response) {
            title = error.status;
            text = error.response.data.message;
        } else if (error.request) {
            title = 'Reques Error';
            text = error.request;
        } else {
            title = 'Axios configuration error';
            text = error.message;
        }
    } else {
        title = 'Unexpected Error';
        text = error.message;
    }

    if (title != '') {
        Swal.fire({
            icon: "error",
            title: title,
            text: text
        });
    }
}

//https://israynotarray.com/javascript/20220514/1988711685/
//其實在在寫得更共用，但這樣會不好呼叫
//20251027 try要包在外面層
////////////////GET//////////////
const getApi = async (array) => {
    //try {
    return response = await Promise.all(array.map(x => axios.get(x.url, x.headers)));
    //return response;
    //} catch (error) {
    //    axiosError(error);
    //}
}

///////////////POST//////////////
const postApi = async (array) => {
    //try {
    return response = await Promise.all(array.map(x => axios.post(x.url, x.obj, x.headers)));
    // return response;
    //} catch (error) {
    //     axiosError(error);
    // }
}

///////////////Patch//////////////
const patchApi = async (array) => {
    // try {
    return response = await Promise.all(array.map(x => axios.patch(x.url, x.obj, x.headers)));
    //     return response;
    // } catch (error) {
    //     axiosError(error);
    // }
}

///////////////Put//////////////
const putApi = async (array) => {
    // try {
    return response = await Promise.all(array.map(x => axios.put(x.url, x.obj, x.headers)));
    //     return response;
    // } catch (error) {
    //     axiosError(error);
    // }
}

///////////////Delete//////////////
const deleteApi = async (array) => {
    // try {
    return response = await Promise.all(array.map(x => axios.delete(x.url, x.headers)));
    //     return response;
    // } catch (error) {
    //     axiosError(error);
    // }
}