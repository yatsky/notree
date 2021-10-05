export const deletePage = (appVal, setAppVal, pageId, setCurrentPage) => {
    const {[pageId]: t, ...temp} = appVal
    setAppVal(temp)
    // hardcode it to be the first page after page's been removed
    // will need a better solution
    const remainingKeys = Object.keys(temp)
    if (remainingKeys.length > 0){
        const nextPage = remainingKeys[0]
        setCurrentPage(nextPage)
    }
}