import ProductsModel from "@/models/Products_Schema";
import { NextFunction, Request, Response, } from "express";
import { ObjectId } from "mongodb";
import FileUploadService from "@/services/FileUpload_Service";
import {trimmedStr,isOnlyWhitespaceTrim,isNumeric} from '@/utils/string_ultil'

const fileUploadService = new FileUploadService();

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    fileUploadService.uploadBase64(req, res, async (err) => {
        if (err) {
            console.error("File upload error:", err);
            return res.status(400).json({ message: err.message });
        }

        try {
            const { categoryId, shopId, productName, description, colors, sizes, price, quantity, images } = req.body; // Get the image URL from the processed data

            const product = new ProductsModel({
                _id: new ObjectId(),
                category_id: categoryId,
                shop_id: shopId,
                product_name: productName,
                description: description,
                colors: colors,
                sizes: sizes,
                price: parseFloat(price),
                quantity: parseInt(quantity, 10),
                images: images || [] // Add image URL to the product
            });

            await product.save(); // Save the product instance
            res.status(201).json({ message: 'Product created!', product });
        } catch (error) {
            console.error("Error saving product:", error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    });
};

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await ProductsModel.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await ProductsModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Fetch the product to check existing images
        const existingProduct = await ProductsModel.findById(req.params.id);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete existing images if they exist
        if (existingProduct.images && existingProduct.images.length > 0) {
            const imageKeys = existingProduct.images.map((url: string) => {
                const urlParts = url.split('/');
                return urlParts[urlParts.length - 1]; // Assuming the key is the last part of the URL
            });

            // Delete images from S3
            await Promise.all(imageKeys.map((imageKey: string) => fileUploadService.deleteImage(imageKey)));
        }

        // Proceed with uploading new images
        fileUploadService.uploadBase64(req, res, async (err) => {
            if (err) {
                console.error("File upload error:", err);
                return res.status(400).json({ message: err.message });
            }

            // Get the updated information including new images
            const { categoryId, shopId, productName, description, colors, sizes, price, quantity } = req.body;
            const images = req.body.images || []; // New image URLs

            // Update the product
            const updatedProduct = await ProductsModel.findByIdAndUpdate(
                req.params.id,
                {
                    category_id: new ObjectId(categoryId),
                    shop_id: new ObjectId(shopId),
                    product_name: productName,
                    description: description,
                    colors: colors,
                    sizes: sizes,
                    price: parseFloat(price),
                    quantity: parseInt(quantity, 10),
                    images: images
                },
                { new: true }
            );

            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json({ message: 'Product updated!', updatedProduct });
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await ProductsModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Extract the keys from the image URLs
        const imageKeys = product.images.map((url: string) => {
            const urlParts = url.split('/');
            return urlParts[urlParts.length - 1]; // Assuming the key is the last part of the URL
        });

        // Use Promise.all to delete images concurrently
        const deleteImagePromises = imageKeys.map((imageKey: string) => fileUploadService.deleteImage(imageKey));
        await Promise.all(deleteImagePromises);

        res.status(200).json({ message: 'Product deleted!' });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};



export const searchProduct = async (req: Request, res:Response) => {
    const search = String(req.body.search);

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
              { product_name: searchRegExp },
              { description: searchRegExp },             
            ]
          };
    }
  

    const results = await ProductsModel.find(query);
    if(results && Object.keys(results).length > 0){
        res.status(200).json({message: "Search Product successfully", data: results});
    }else{
        res.status(200).json({message: "No search"});
    }
}
