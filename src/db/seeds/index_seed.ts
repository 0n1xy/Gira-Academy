// import { createRandomAddress } from "@/db/seeds/Address_Seed";
// import { createRandomUser } from "@/db/seeds/user_seed";
// import Address from "@/models/Addresses_Schema";
// import Category from "@/models/Categories_Schema";
// import ProductsModel from "@/models/Products_Schema";
// import ShopsModel from "@/models/Shops_Schema";
// import User from "@/models/Users_Schema";
// import { createRandomCategories } from "./Categories_Seed";
// import { createRandomProducts } from "./products_seed";
// import { createRandomShops } from "./shops_seed";

// export async function randomUser(number: number) {
// 	const userArr = await Promise.all(
// 		Array.from({ length: number }).map(async () => {
// 			return createRandomUser();
// 		})
// 	);
// 	const shopArr = await Promise.all(
// 		Array.from({ length: number }).map(async () => {
// 			return createRandomShops();
// 		})
// 	);
// 	const categoryArr = await Promise.all(
// 		Array.from({ length: number }).map(async () => {
// 			return createRandomCategories();
// 		})
// 	);

// 	const USERID = userArr.map((users) => users._id);
// 	const CategoriesID = categoryArr.map((category) => category._id);

// 	const addressArr = USERID.map((id) => createRandomAddress(id));
// 	const productArr: any[] = [];
// 	shopArr.map((shop) => {
// 		CategoriesID.forEach((category) => {
// 			const product = createRandomProducts(shop._id, category);
// 			productArr.push(product);
// 		});
// 	});

// 	await ShopsModel.insertMany(shopArr);
// 	await User.insertMany(userArr);
// 	await Address.insertMany(addressArr);
// 	await Category.insertMany(categoryArr);
// 	await ProductsModel.insertMany(productArr);
// }

import { createRandomAddress } from "@/db/seeds/Address_Seed";
import { createRandomUser } from "@/db/seeds/user_seed";
import Address from "@/models/Addresses_Schema";
import Category from "@/models/Categories_Schema";
import ProductsModel from "@/models/Products_Schema";
import ShopsModel from "@/models/Shops_Schema";
import User from "@/models/Users_Schema";
import Review from "@/models/Review_Schema";
import Comment from "@/models/Comments_Schema";
import { createRandomCategories } from "./Categories_Seed";
import { createRandomProducts } from "./products_seed";
import { createRandomShops } from "./shops_seed";
import { createRandomReview } from "./Review_Seed";
import { createRandomComment } from "./Comment_seed";

export async function randomUser(number: number) {
	const userArr = await Promise.all(
		Array.from({ length: number }).map(async () => {
			return createRandomUser();
		})
	);
	const shopArr = await Promise.all(
		Array.from({ length: number }).map(async () => {
			return createRandomShops();
		})
	);
	const categoryArr = await Promise.all(
		Array.from({ length: number }).map(async () => {
			return createRandomCategories();
		})
	);

	const USERID = userArr.map((users) => users._id);
	const CategoriesID = categoryArr.map((category) => category._id);

	const addressArr = USERID.map((id) => createRandomAddress(id));
	const productArr: any[] = [];
	shopArr.map((shop) => {
		CategoriesID.forEach((category) => {
			const product = createRandomProducts(shop._id, category);
			productArr.push(product);
		});
	});

	await ShopsModel.insertMany(shopArr);
	await User.insertMany(userArr);
	await Address.insertMany(addressArr);
	await Category.insertMany(categoryArr);
	await ProductsModel.insertMany(productArr);

	// Generate reviews
	const reviewsArr = productArr.map((product) => {
		const review = createRandomReview();
		review.user_id = USERID[Math.floor(Math.random() * USERID.length)];
		review.product_id = product._id;
		return review;
	});

	await Review.insertMany(reviewsArr);

	// Generate comments
	const commentsArr: any[] = [];
	reviewsArr.forEach((review) => {
		// Generate level 2 comments (no parent_id)
		const commentLevel2_1 = createRandomComment(review._id, 2);
		const commentLevel2_2 = createRandomComment(review._id, 2);

		// Generate level 3 comments (children of level 2 comments)
		const commentLevel3_1 = createRandomComment(review._id, 3, commentLevel2_1._id);
		const commentLevel3_2 = createRandomComment(review._id, 3, commentLevel2_2._id);

		// Link level 3 comments to their parents
		commentLevel2_1.replies.push(commentLevel3_1._id);
		commentLevel2_2.replies.push(commentLevel3_2._id);

		// Link level 2 comments to the review
		review.comments.push(commentLevel2_1._id, commentLevel2_2._id);

		commentsArr.push(commentLevel2_1, commentLevel2_2, commentLevel3_1, commentLevel3_2);
	});

	await Comment.insertMany(commentsArr);
}
