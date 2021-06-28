const get_request = async (path) => {
    try {
        const res = await fetch(path,{
            credentials: 'include',
        })
        return await res.json()
    } catch (error) {
        console.log(error)
    }
}
const get_ranking = () => {
    return get_request("http://localhost:5000/getRanking")
}

export {
    get_ranking, get_request
}