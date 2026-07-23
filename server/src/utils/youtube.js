function extractVideoId(url) {

    const regExp =
        /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;

    const match = url.match(regExp);

    return match && match[1].length === 11
        ? match[1]
        : null;
}

function getThumbnail(videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

module.exports = {
    extractVideoId,
    getThumbnail
};