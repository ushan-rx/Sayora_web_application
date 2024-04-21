const router = require("express").Router();
let treatment = require("../models/treatment.model");

router.route("/add").post((req,res)=>{

    const name = req.body.name
    const description = req.body.description
    const price = req.body.price

    const newtre = new treatment({
        name,
        description,
        price
    })

    newtre.save().then(()=>{
        res.json("Medicine Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{

    treatment.find().then((treatments)=>{
        res.json(treatments)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:id").put(async(req,res)=>{

    let treID = req.params.id;
    const {name, description, price} = req.body;

    const updatetre = {
        name,
        description,
        price
    }

    const update = await treatment.findOneAndUpdate(treID, updatetre).then(()=>{
        res.status(200).send({status: "Medicine updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating the medicine", error: err.message});
    })
    
})

router.route("/delete/:id").delete(async(req,res)=>{
    let treID = req.params.id;

    await treatment.findOneAndDelete(treID).then(()=>{
        res.status(200).send({status: "Medicine deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error while deleting the medicine",  error: err.message});
    })
})

router.route("/:id").get(async(req,res)=>{
    let treID = req.params.id;
    const treat = await treatment.findById(treID).then((treatment)=>{
        res.status(200).send({status: "Medicine fetched", treatment})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error in fetching", error: err.message});
    })
})

router.route("/treat/:id").get(async(req,res)=>{
    let treID = req.params.id;
    const treat = await treatment.find({treatment: treID}).then((treatment)=>{
        res.status(200).send({status: "Medicine fetched", treatment})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error in fetching", error: err.message});
    })
})

module.exports = router;