import mongoose, { ConnectOptions, Document, Model } from "mongoose";

class ConnectDB {
	private connectionString: string;
	private options: ConnectOptions;

	constructor(connectionString?: string) {
		this.connectionString =
			connectionString ??
			(process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase");
		this.options = {
			serverSelectionTimeoutMS: 30000, // 30 giây
			socketTimeoutMS: 45000, // 45 giây
		};
	}

	async connect(): Promise<void> {
		try {
			await mongoose.connect(this.connectionString, this.options);
			console.log("Kết nối tới cơ sở dữ liệu thành công");
		} catch (err) {
			console.error("Lỗi kết nối cơ sở dữ liệu:", err);
			throw err;
		}
	}

	async disconnect(): Promise<void> {
		try {
			await mongoose.disconnect();
			console.log("Ngắt kết nối cơ sở dữ liệu thành công");
		} catch (err) {
			console.error("Lỗi ngắt kết nối cơ sở dữ liệu:", err);
			throw err;
		}
	}

	async insertMany<T extends Document>(
		model: Model<T>,
		documents: T[],
		retries = 3
	): Promise<void> {
		try {
			const result = await model.insertMany(documents);
			console.log(`${result.length} tài liệu đã được chèn thành công`);
		} catch (error) {
			if (retries > 0) {
				console.log(
					`Thử lại thao tác chèn. Số lần thử lại còn lại: ${retries}`
				);
				await this.insertMany(model, documents, retries - 1);
			} else {
				console.error("Lỗi khi chèn tài liệu:", error);
				throw error;
			}
		}
	}
}

export default ConnectDB;
