const pool = require("../config/db");

async function createBlog(blog) {

    const {
        title,
        slug,
        content,
        thumbnail,
        author_id,
        category_id,
        status
    } = blog;

    const result = await pool.query(

        `INSERT INTO blogs
        (title,slug,content,thumbnail,author_id,category_id,status)
        VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING *`,

        [
            title,
            slug,
            content,
            thumbnail,
            author_id,
            category_id,
            status
        ]

    );

    return result.rows[0];

}

async function getAllBlogs(search = "", limit = 10, offset = 0) {

    let query = `
        SELECT
            blogs.*,
            users.name AS author,
            categories.name AS category
        FROM blogs
        LEFT JOIN users
            ON blogs.author_id = users.id
        LEFT JOIN categories
            ON blogs.category_id = categories.id
        WHERE blogs.status='published'
    `;

    const values = [];

    if (search) {

        values.push(`%${search}%`);

        query += ` AND blogs.title ILIKE $${values.length}`;

    }

    values.push(limit);

    values.push(offset);

    query += `
        ORDER BY blogs.created_at DESC
        LIMIT $${values.length - 1}
        OFFSET $${values.length}
    `;

    const result = await pool.query(query, values);

    return result.rows;

}

async function getBlogBySlug(slug) {

    await pool.query(

        `UPDATE blogs
         SET views=views+1
         WHERE slug=$1`,

        [slug]

    );

    const result = await pool.query(

        `SELECT
            blogs.*,
            users.name AS author,
            categories.name AS category
        FROM blogs
        LEFT JOIN users
            ON blogs.author_id=users.id
        LEFT JOIN categories
            ON blogs.category_id=categories.id
        WHERE blogs.slug=$1`,

        [slug]

    );

    return result.rows[0];

}

async function getBlogById(id) {

    const result = await pool.query(

        `SELECT
            blogs.*,
            users.name AS author,
            categories.name AS category
        FROM blogs
        LEFT JOIN users
            ON blogs.author_id=users.id
        LEFT JOIN categories
            ON blogs.category_id=categories.id
        WHERE blogs.id=$1`,

        [id]

    );

    return result.rows[0];

}

async function updateBlog(id, blog) {

    const {

        title,

        slug,

        content,

        thumbnail,

        category_id,

        status

    } = blog;

    const result = await pool.query(

        `UPDATE blogs
        SET
            title=$1,
            slug=$2,
            content=$3,
            thumbnail=$4,
            category_id=$5,
            status=$6,
            updated_at=NOW()
        WHERE id=$7
        RETURNING *`,

        [

            title,

            slug,

            content,

            thumbnail,

            category_id,

            status,

            id

        ]

    );

    return result.rows[0];

}

async function deleteBlog(id) {

    await pool.query(

        `DELETE FROM blogs
         WHERE id=$1`,

        [id]

    );

}

module.exports = {

    createBlog,

    getAllBlogs,

    getBlogBySlug,

    getBlogById,

    updateBlog,

    deleteBlog

};