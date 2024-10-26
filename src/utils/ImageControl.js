const ImageControl = async (url) => {
    try {
        const response = await fetch(url);
        if(!response.ok){
            return false; 
        }
    
        const blob = await response.blob();                                 // ios
        const contentType = response.headers.get('content-type') || '';     // android
        return blob.type.startsWith('image/') || contentType.startsWith('image/'); 
    } 
    catch(error){
        return false; 
    }
};

export default ImageControl;