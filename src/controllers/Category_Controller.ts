import Category from "@/models/Categories_Schema";
import { NextFunction, Request, Response } from "express";
import FileUploadService from "@/services/FileUpload_Service";
import { ObjectId } from "mongodb";

const fileUploadService = new FileUploadService();

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    fileUploadService.uploadBase64(req, res, async (err) => {
        if (err) {
            console.error("File upload error:", err);
            return res.status(400).json({ message: err.message });
        }

        try {
            const { name, description, images } = req.body;

            const category = new Category({
                _id: new ObjectId(),
                name: name,
                description: description,
                image: images || []
            });

            await category.save();
            res.status(201).json({ message: 'Category created!', category });
        } catch (error) {
            console.error("Error saving category:", error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    });
};

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Fetch the category to check existing image
        const existingCategory = await Category.findById(req.params.id);
        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Delete existing image if a new one is uploaded
        if (req.body.images && req.body.images.length > 0 && existingCategory.image) {
            const oldImageKey = existingCategory.image.split('/').pop() || '';
            await fileUploadService.deleteImage(oldImageKey);
        }

        // Proceed with uploading new images
        fileUploadService.uploadBase64(req, res, async (err) => {
            if (err) {
                console.error("File upload error:", err);
                return res.status(400).json({ message: err.message });
            }

            const { name, description } = req.body;
            const image = req.body.images && req.body.images.length > 0 ? req.body.images[0] : existingCategory.image;

            const updatedCategory = await Category.findByIdAndUpdate(
                req.params.id,
                {
                    name,
                    description,
                    image
                },
                { new: true }
            );

            if (!updatedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.status(200).json({ message: 'Category updated!', updatedCategory });
        });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Delete image from S3 if it exists
        if (category.image) {
            const imageKey = category.image.split('/').pop() || '';
            await fileUploadService.deleteImage(imageKey);
        }

        res.status(200).json({ message: 'Category deleted!' });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
