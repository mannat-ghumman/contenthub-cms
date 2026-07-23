const pool = require("../config/db");


exports.getDashboardStats = async (req,res)=>{

    try{

        const blogs = await pool.query(
            `
            SELECT COUNT(*) 
            FROM blogs
            `
        );


        const videos = await pool.query(
            `
            SELECT COUNT(*)
            FROM videos
            `
        );


        const categories = await pool.query(
            `
            SELECT COUNT(*)
            FROM categories
            `
        );


        res.json({

            success:true,

            data:{

                blogs:Number(blogs.rows[0].count),

                videos:Number(videos.rows[0].count),

                categories:Number(categories.rows[0].count)

            }

        });


    }
    catch(err){

        console.log(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};