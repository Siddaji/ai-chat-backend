import openAi from "openai";
import dotenv from "dotenv";
import express from "express";

const app=express();;
app.use(express.json());

dotenv.config();

const client = new openAi({
    apikey:process.env.OPENAI_API_KEY,
})

app.get("/",(req,res)=>{
    res.jsonvbb("Ai backend is running");

});

app.post("/chat",async(req,res)=>{
    try{
    const userMessage=req.body.message;

    const response=await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages:[{ role:"user",content:userMessage}],
    });

    res.json({
        reply:response.choices[0].message.content,
    });
}catch(error){
    res.status(500).json("error:Ai failed");
}
});

app.listen(5000,()=>{
    console.log("SErver is running on port 5000");
})

