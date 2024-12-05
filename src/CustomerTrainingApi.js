export function deleteTraining(url) {
    return fetch(url, { method: "DELETE"})
    .then(response => {
        if (!response.ok)
        throw new Error("Error in delete: " + response.statusText);

        return response.json();
    })
}

export function deleteCustomer(url) {
    return fetch(url, { method: "DELETE"})
    .then(response => {
        if (!response.ok)
        throw new Error("Error in delete: " + response.statusText);

        return response.json();
    })
}