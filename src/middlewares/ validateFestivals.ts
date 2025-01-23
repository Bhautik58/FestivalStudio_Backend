import { NextFunction, Request, Response } from "express";

const validateFestival = (req :Request, res: Response, next : NextFunction ) : void => {
    const { festival_name, date } = req.body;

    if(!festival_name || festival_name === ""){
        res.status(400).json({ error: 'festival name is required.' });
        return
    }

    if(!date || date === ""){
        res.status(400).json({ error: 'festival date is required.' });
        return
    }

    next();
}

export default validateFestival;