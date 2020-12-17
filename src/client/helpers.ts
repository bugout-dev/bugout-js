export const handleError = (e: any) => {
    if (e.response) {
        return {
            ...e.response,
            status: e.response.status,
            body: {},
        }
    }

    return {}
}

export default {}
