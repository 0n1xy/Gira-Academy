import {  Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import   ShopsModel  from '@/models/Shops_Schema';
import { error } from 'console';
import {trimmedStr,isOnlyWhitespaceTrim,isNumeric} from '@/utils/string_ultil'

const currentFile = __filename;

export const getShopPage = (req: Request, res: Response): void => {
    res.send('hi');
};
export const viewShop = async (req: Request, res: Response)=> {
    const shop_id = req.params.id;
    try{
        const foundUser = await ShopsModel.findById(shop_id)
        if (!foundUser) {
            res.status(400).json({message: "Shop not found"});
            return;
        }
        res.status(200).json({foundUser})
    }catch(error){
        res.status(400).json({error: error, errorFilePath: currentFile});
        return; 
    }
   

};
export const updateShop = async (req: Request, res: Response) => {
    const shop_id = req.params.id;
    const name = req.body.name;
    const status = req.body.status;
    const logo_image = req.body.logo_image;
    const address = req.body.address;

    const ShopObjectId = new ObjectId(shop_id);

    await ShopsModel.findByIdAndUpdate({ _id: ShopObjectId },
        { $set: 
            {   
                name: name,
                address: address,
                status: status,
                logo_image: logo_image,
            }
        }
    )
    .then(updatedShop => {
        if (updatedShop) {
            res.status(200).json({message: "Update Shopp successfully"});
        } else {
            res.status(400).json({message: "Shop not found"});
        }
    })
    .catch(error => {
        res.status(400).json({error: error, errorFilePath: currentFile});
    });

};
export const createShop = async (req: Request, res: Response) => {
    const name = req.body.name;
    const image = req.body.logo_image;
    const address = req.body.address;
    const manager_id = String(req.body.manager_id);
    //convert to object id
    const ManagerObjectId = new ObjectId(manager_id);
    const email = req.body.email;

    const newShop = new ShopsModel({
        _id: new ObjectId(),
        manager_id: ManagerObjectId,
        email: email,
        name: name,
        address: address,
        status: 'Pending',
        logo_image: image,
    });


    try {
        const savedShop = await newShop.save();      
        res.status(200).json({message:"create shop successfully", data: savedShop})
      } catch (error) {
        res.status(400).json({error: error, erroFilePath: currentFile})
      }
}
export const deleteShop = (req:Request, res:Response) => {
    const shop_id = req.params.id;
    const ShopObjectId = new ObjectId(shop_id)
    ShopsModel.findByIdAndDelete(ShopObjectId)
       .then(deletedShop => {
            if (deletedShop) {
                res.status(200).json({message: "Delete Shop successfully"});
            } else {
                res.status(400).json({message: "Shop not found"});
            }
        })
       .catch(error => {
            res.status(400).json({error: error, errorFilePath: currentFile});
        });
}
export const searchShop = async (req:Request, res:Response) =>{
    const search = req.body.search;

    //remove spaces at the beginning and end of a string
    const trimmedSearch = trimmedStr(search)

    //remove spaces inside string
    const singleSpacedString = trimmedSearch.split(/\s+/).join(' '); 
    const searchRegExp = new RegExp(singleSpacedString,'i');

    let query = {};
    
    if(isOnlyWhitespaceTrim(singleSpacedString)) {
      query = {};
    }
    else if(isNumeric(singleSpacedString)){
        query = {
            $or: [             
              { price: parseInt(singleSpacedString)},
            ]
          };
    }else{
        query = {
            $or: [
                { name: searchRegExp },
                { status: searchRegExp },
                { address: searchRegExp },           
            ]
          };
    }
  

    const results = await ShopsModel.find(query);
    if(results && Object.keys(results).length > 0){
        res.status(200).json({message: "Search shop successfully", data: results});
    }else{
        res.status(200).json({message: "No data"});
    }
}