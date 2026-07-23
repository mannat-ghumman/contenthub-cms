const pool = require("../config/db");

async function createVideo(video) {

    const result = await pool.query(

        `INSERT INTO videos
        (title,youtube_url,youtube_id,thumbnail,description,author_id,category_id)

        VALUES($1,$2,$3,$4,$5,$6,$7)

        RETURNING *`,

        [
            video.title,
            video.youtube_url,
            video.youtube_id,
            video.thumbnail,
            video.description,
            video.author_id,
            video.category_id
        ]

    );

    return result.rows[0];

}

async function getAllVideos() {

    const result = await pool.query(

        `SELECT

        videos.*,

        users.name AS author,

        categories.name AS category

        FROM videos

        LEFT JOIN users
        ON videos.author_id=users.id

        LEFT JOIN categories
        ON videos.category_id=categories.id

        ORDER BY videos.created_at DESC`

    );

    return result.rows;

}

async function getVideoById(id) {

    const result = await pool.query(

        "SELECT * FROM videos WHERE id=$1",

        [id]

    );

    return result.rows[0];

}

async function updateVideo(id, video) {

    const result = await pool.query(

        `UPDATE videos

        SET

        title=$1,

        youtube_url=$2,

        youtube_id=$3,

        thumbnail=$4,

        description=$5,

        category_id=$6,

        updated_at=NOW()

        WHERE id=$7

        RETURNING *`,

        [

            video.title,

            video.youtube_url,

            video.youtube_id,

            video.thumbnail,

            video.description,

            video.category_id,

            id

        ]

    );

    return result.rows[0];

}

async function deleteVideo(id) {

    await pool.query(

        "DELETE FROM videos WHERE id=$1",

        [id]

    );

}

module.exports = {

    createVideo,

    getAllVideos,

    getVideoById,

    updateVideo,

    deleteVideo

};