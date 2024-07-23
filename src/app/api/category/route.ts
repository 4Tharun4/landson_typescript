
import db from "@/lib/db";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";


export async function POST(request: Request) {



    try {
        const { name ,imageUrls } = await request.json();
        
        //query passing
            
            // Correct field name: isVerified
           
    
            
                const newcategory = await db.category.create({
                    data: {
                        name ,imageUrls
                    }
                });
                return new Response(JSON.stringify({
                    success: true,
                    message: "Category Created  Sucssfully."
                }), { status: 200 });
    
           
            }
            catch (error) {
                console.error('Error Crating  Product', error);
                return new Response(JSON.stringify({
                    success: false,
                    message: "Error registering user"
                }), { status: 500 });
            }
        
    } 


    export async function GET(request: any){
        try {
            const Categories = await db.category.findMany();
            return NextResponse.json(Categories);
        } catch (error) {
            console.log(error);
            return NextResponse.json({
                message:"Failed To Featch Dealers",
                error
            },{status:500})
        }
      }