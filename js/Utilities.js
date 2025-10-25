//##############共用##############
function axiosError(error) {
    let errorMessage = '';
    if (axios.isaxiosError(error)) {
        if (error.response) {
            errorMessage = `${error.response.data.message} `;
        } else if (error.request) {
            errorMessage = `Request Error:', ${error.request}`;
        } else {
            errorMessage = 'Error';
        }
    } else {
        errorMessage = `${error}`;
    }

    if (errorMessage.length > 0) {
        Swal.fire({
            icon: "error",
            title: "錯誤...",
            text: errorMessage
            //footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
}

//https://israynotarray.com/javascript/20220514/1988711685/
//其實在在寫得更共用，但這樣會不好呼叫
////////////////GET//////////////
const getApi = async (array) => {
    try {
        const response = await Promise.all(array.map(x => axios.get(x.url, x.headers)));
        return response;
    } catch (error) {
        axiosError(error);
    }
}

///////////////POST//////////////
const postApi = async (array) => {
    try {
        console.log(array);
        const response = await Promise.all(array.map(x => axios.post(x.url, x.obj, x.headers)));
        return response;
    } catch (error) {
        axiosError(error);
    }
}

///////////////Patch//////////////
const patchApi = async (array) => {
    try {
        console.log(array);
        const response = await Promise.all(array.map(x => axios.patch(x.url, x.obj, x.headers)));
        return response;
    } catch (error) {
        axiosError(error);
    }
}

///////////////Put//////////////
const putApi = async (array) => {
    try {
        console.log(array);
        const response = await Promise.all(array.map(x => axios.put(x.url, x.obj, x.headers)));
        return response;
    } catch (error) {
        axiosError(error);
    }
}
 
///////////////Delete//////////////
const deleteApi = async (array) => {
    try {
        console.log(array);
        const response = await Promise.all(array.map(x => axios.delete(x.url,   x.headers)));
        return response;
    } catch (error) {
        axiosError(error);
    }
}