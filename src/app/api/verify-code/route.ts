import db from "@/lib/db";

export async function POST(request:Request){
    try {
        const {UserName,Code}= await request.json();
        const decoded = decodeURIComponent(UserName);
        const user =  await db.userAccounts.findFirst({
           where:{
            UserName:decoded
           }


        })

        if(!user){
            return new Response(JSON.stringify({
                success:false,
                message: "No user Found to Verfiy "
            }), { status: 500 });
        }
            const isCodevaid = user.VerifyCode===Code;
            const Iscodenotexpried = new Date(user.VerifyCodeExpairy)> new Date()
        if(isCodevaid && Iscodenotexpried){
       await db.userAccounts.update({
        where:{
            id:user.id
        },
        data:{
            isVerfied:true
        }
    

       })
       return Response.json({
        success:true,
        message:"Verified sucssfully"

       },{status:200})
        }else if(!Iscodenotexpried){
            return Response.json({
                success:false,
                message:"Verification code Expried"
        
               },{status:400})
        }else{
            return Response.json({
                success:false,
                message:"Code Is Broken "
        
               },{status:400})
        }
    } catch (error) {
        console.error('Error Verfiy user', error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error Verfiy user"
        }), { status: 500 });
        
    }
}