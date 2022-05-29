const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();  //преобразовываем promise (then)  в формат json 
};

const getResource = async (url) => { // get запрос // получаем инфо для карточек
    const res = await fetch(url);
    if (!res.ok) {  // если что-то пошло не так, те не ок
        throw new Error(`Could not fetch ${url}, status: ${res.status}`); // конструируем новый объект ошибки 
    }
    
    return await res.json();  //преобразовываем promise (then)  в формат json 
};

export {postData};
export {getResource};