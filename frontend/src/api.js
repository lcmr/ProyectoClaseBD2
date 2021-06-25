const get_request = async (path) => {
    try {
        const res = await fetch(path)
        return await res.json()
    } catch (error) {
        console.log(error)
    }
}
const get_ranking = () => {
    return get_request("/getRanking")
}

export {
    get_ranking, get_request
}