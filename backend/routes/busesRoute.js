const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const Bus = require("../models/busModel")

router.post("/add-bus",async (req,res)=>{
    try {
        const existingBus = await Bus.findOne({number:req.body.number});
        if(existingBus){
            return res.status(200).send({
                success:false,
                message:"bus already exists"
            }) 
        }
        const newBus = new Bus(req.body);
        await newBus.save();
        return res.status(200).send({
            success:true,
            message:"Bus added successfully"
        })
        
    } catch (error) {
        res.status(500).send({success:false,message:error.message});
    }
});

router.post("/update-bus",authMiddleware,async(req,res)=>{
    try{
        await Bus.findByIdAndUpdate(req.body._id,req.body)
        return res.status(200).send({
            success:true,
            message:"Bus updated successfully"
        });
    }
    catch(error){
        res.status(500).send({success:false,message:error.message})
    }
})

router.post("/delete-bus",authMiddleware,async(req,res)=>{
    try {
        await Bus.findByIdAndDelete(req.body._id);
        return res.status(200).send({
            success:true,
            message:"bus deleted successfully"
        });
    } catch (error) {
        res.status(500).send({success:false,message:error.message});
    }
})



router.post("/get-all-buses",authMiddleware,async(req,res)=>{
    try {
        const buses = await Bus.find();
        return res.status(200).send({
            success:true,
            message:"Buses fetched successfully",
            data:buses
        })
        
    } catch (error) {
        res.status(500).send({success:false,message:error.message});
    }
});

module.exports = router;

