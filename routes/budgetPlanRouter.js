const router = require("express").Router();
const auth = require("../middleware/auth");
const Plan = require("../models/budgetPlanModel");

router.post("/", auth, async (req, res) => {
  try{
    let { category, plannedAmount } = req.body;

    if (!category)
      return res.status(400).json({ msg: "Please provide category"});
    if (!plannedAmount)
      return res.status(400).json({ msg: "Please provide Planned amount"});

    const newPlan = new Plan({
      category,
      plannedAmount,
      userId: req.user,
    });
    const savedPlan = await newPlan.save();
    res.json(savedPlan);
    
  }catch (err) {
      res.status(500).json({ error: err.message });
  }
});

router.get("/all", auth, async (req, res) => {
  const plans = await Plan.find({ userId: req.user});
  if(!plans)
     return res.status(400).json({ msg: "not authorized"});
  res.json(plans)
  
})



module.exports = router;