const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
};

export default delay;

export function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}