import request from "../../services/request";

export const postMedia = (id, url) => {
    return async dispatch => {
        try {
            await request.post(`media`, {
                id: id,
                contentUrl : url.contentUrl,
            })
        } catch(e) {
            console.dir(e)
        }
    }
}