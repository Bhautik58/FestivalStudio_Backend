import express, { Request, Response } from 'express';
import { FestivalModel } from '../db/festivals.ts';

class FestivalController {

    createFestival = async (req: express.Request, res: express.Response): Promise<any> => {
        try {
            const { festival_name, date } = req.body;
            const newFestival = new FestivalModel({
                festival_name,
                date
            })
            await newFestival.save()
            return res.status(201).json({ message: 'Festival created successfully!' })
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }

    getAllFestivals = async (req: Request, res: Response): Promise<any> => {
        try {
            const festivals = await FestivalModel.find();
            console.log(festivals, 'festivals')
            return res.status(200).json({ data: festivals })
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }

    updateFestival = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;
            const { festival_name, date } = req.body;

            let updates: any = {};

            if (festival_name) {
                if (festival_name != '') {
                    updates['festival_name'] = festival_name;
                } else {
                    return res.send(400).json({ 'message': 'festival_name should not be an empty!' })
                }
            }

            if (date) {
                if (date != '') {
                    updates['date'] = date;
                } else {
                    return res.send(400).json({ 'message': 'date should not be an empty!' })
                }
            }

            const updatedFestival = await FestivalModel.findByIdAndUpdate(id, updates, { new: true })
            if (!updatedFestival) {
                return res.status(404).json({ error: 'Festival not found' });
            }

            return res.status(200).json({ message: 'Festival updated successfully!', data: updatedFestival });

        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }

    deleteFestival = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;

            const deletedFestival = await FestivalModel.findByIdAndDelete(id);
            if (!deletedFestival) {
                return res.status(404).json({ error: 'Festival not found' });
            }

            return res.status(200).json({ message: 'Festival deleted successfully!' });

        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }


}

export default new FestivalController();