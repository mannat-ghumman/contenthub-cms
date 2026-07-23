import {useEffect,useState} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {useAuth} from "../context/AuthContext";

import {getDashboardStats} from "../services/dashboardService";


export default function Dashboard(){

    const {user}=useAuth();


    const [stats,setStats]=useState({

        blogs:0,

        videos:0,

        categories:0

    });


    useEffect(()=>{


        loadStats();


    },[]);



    async function loadStats(){

        try{

            const data=await getDashboardStats();

            setStats(data);

        }

        catch(err){

            console.log(err);

        }

    }



    return(

        <DashboardLayout>


            <h1 className="text-4xl font-bold">

                Welcome, {user?.name} 👋

            </h1>


            <p className="text-gray-500 mt-2">

                Here's an overview of your CMS.

            </p>



            <div className="grid md:grid-cols-3 gap-6 mt-10">


                <div className="bg-white rounded-xl shadow p-8">

                    <h2 className="text-gray-500 text-xl">

                        Blogs

                    </h2>

                    <p className="text-5xl text-blue-600 font-bold mt-5">

                        {stats.blogs}

                    </p>

                </div>



                <div className="bg-white rounded-xl shadow p-8">

                    <h2 className="text-gray-500 text-xl">

                        Videos

                    </h2>

                    <p className="text-5xl text-green-600 font-bold mt-5">

                        {stats.videos}

                    </p>

                </div>



                <div className="bg-white rounded-xl shadow p-8">

                    <h2 className="text-gray-500 text-xl">

                        Categories

                    </h2>

                    <p className="text-5xl text-purple-600 font-bold mt-5">

                        {stats.categories}

                    </p>

                </div>


            </div>



        </DashboardLayout>

    );

}