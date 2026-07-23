const pool = require("../config/db");

async function createCategory(name, type) {
    const result = await pool.query(
        `INSERT INTO categories(name,type)
         VALUES($1,$2)
         RETURNING *`,
        [name, type]
    );

    return result.rows[0];
}

async function getAllCategories() {
    const result = await pool.query(
        `SELECT * FROM categories
         ORDER BY id ASC`
    );

    return result.rows;
}

async function getCategoryById(id) {
    const result = await pool.query(
        `SELECT * FROM categories
         WHERE id=$1`,
        [id]
    );

    return result.rows[0];
}

async function updateCategory(id, name, type) {

    const result = await pool.query(
        `UPDATE categories
         SET
            name=$1,
            type=$2
         WHERE id=$3
         RETURNING *`,
        [name, type, id]
    );

    return result.rows[0];
}

async function deleteCategory(id) {

    await pool.query(
        `DELETE FROM categories
         WHERE id=$1`,
        [id]
    );

}

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};