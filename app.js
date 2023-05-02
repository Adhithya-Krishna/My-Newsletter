const express = require('express');
const app = express();

const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
    apiKey: "dd9820cd16bf8bbd2bdead26067c8283-us17",
    server: "us17",
  });

//To add css to the web page using express
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
});




app.post("/",(req,res)=>{
    const fistName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;

    const subscriber ={
        fName:fistName,
        lName:lastName,
        email:email
    }

    const run = async () => {
        try{
            const response = await client.lists.addListMember("6ce93e0cdb", {
            email_address: subscriber.email,
            status: "subscribed",
            merge_fields:{
                FNAME: subscriber.fName,
                LNAME: subscriber.lName,
            }
            });
            res.sendFile(__dirname + "/sucess.html")
        }catch(err){
            console.log(err.status);
            res.sendFile(__dirname+"/failure.html");
        };
    };      

    run();
    
});

app.post("/failure.html",(req,res)=>{
    res.redirect("/");
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000...")
})

