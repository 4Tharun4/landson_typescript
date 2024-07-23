
import db from "@/lib/db";
import bcrypt from 'bcrypt';


export async function POST(request: Request) {



    try {
        const { DealerPrice, Description, Price, SellingPrice, Title, imageUrls } = await request.json();
        
        //query passing
            
            // Correct field name: isVerified
           
    
            
                const newproduct = await db.products.create({
                    data: {
                        DealerPrice, Description, Price, SellingPrice, Title, imageUrls
                    }
                });
    
                
    
    
    
               
    
                return new Response(JSON.stringify({
                    success: true,
                    message: "Product Updated Sucssfuly."
                }), { status: 200 });
    
           
            }
            catch (error) {
                console.error('Error registering user', error);
                return new Response(JSON.stringify({
                    success: false,
                    message: "Error registering user"
                }), { status: 500 });
            }
        
    } 