// Cleans string by removing white spaces and making it lowercase.
const sanitazier = (content: string) => {
    return content
    .trim()
    .toLowerCase()
}

// Export function.
export default sanitazier;