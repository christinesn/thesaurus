function convertItTags (input) {
    return input.replace(/\{it\}/g, "<em>").replace(/\{\/it\}/g, "</em>")
}

export default convertItTags