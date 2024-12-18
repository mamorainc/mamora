import { Router } from "express";

const actionRouter = Router();

actionRouter.get('/', (req, res) => {

    res.status(200).json({
        message:"Success"
    })
})

export default actionRouter;
