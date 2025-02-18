import { MAX_FILE_UPLOAD } from "./Upload_Service_Constant";

export const i18n: Record<string, Record<string, string>> = {
	en: {

		USER_CREATE_SUCCESS: "Created user successfully",
		USER_CREATE_FAILED: "Created user failed!",
		USER_GET_DETAILS_SUCCESS: "Get details user successfully",
		USER_GET_DETAILS_FAILED: "Get details user failed!",
		USER_LOGIN_SUCCESS: "Login user successfully",
		USER_LOGIN_FAILED: "Login user failed!",
		USER_UPDATE_SUCCESS: "Update user successfully",
		USER_UPDATE_FAILED: "Update user failed!",
		USER_GET_ALL_SUCCESS: "Get all user successfully",
		USER_GET_ALL_FAILED: "Get all user failed!",
		USER_DELETE_SUCCESS: "Delete user successfully",
		USER_DELETE_FAILED: "Delete user failed!",
		USER_LOGOUT_SUCCESS: "Logout user successfully",
		USER_LOGOUT_FAILED: "Logout user failed!",

		//Address
		ADDRESS_CREATE_SUCCESS: "Created address successfully",
		ADDRESS_CREATE_FAILED: "Created address failed!",
		ADDRESS_GET_DETAILS_SUCCESS: "Get details address successfully",
		ADDRESS_GET_DETAILS_FAILED: "Get details address failed!",
		ADDRESS_UPDATE_SUCCESS: "Update address successfully",
		ADDRESS_UPDATE_FAILED: "Update address failed!",
		ADDRESS_GET_ALL_SUCCESS: "Get all address successfully",
		ADDRESS_GET_ALL_FAILED: "Get all address failed!",
		ADDRESS_DELETE_SUCCESS: "Delete address successfully",
		ADDRESS_DELETE_FAILED: "Delete address failed!",

		//Cart
		CART_CREATE_SUCCESS: "Created cart successfully",
		CART_CREATE_FAILED: "Created cart failed!",
		CART_GET_DETAILS_SUCCESS: "Get details cart successfully",
		CART_GET_DETAILS_FAILED: "Get details cart failed!",
		CART_UPDATE_SUCCESS: "Update cart successfully",
		CART_UPDATE_FAILED: "Update cart failed!",
		CART_GET_ALL_SUCCESS: "Get all cart successfully",
		CART_GET_ALL_FAILED: "Get all cart failed!",
		CART_DELETE_SUCCESS: "Delete cart successfully",
		CART_DELETE_FAILED: "Delete cart failed!",

		// Review
		REVIEW_CREATE_SUCCESS: "Review created successfully",
		REVIEW_CREATE_FAILED: "Failed to create review",
		REVIEW_UPDATE_SUCCESS: "Review updated successfully",
		REVIEW_UPDATE_FAILED: "Failed to update review",
		REVIEW_GET_ALL_SUCCESS: "Fetched all reviews and comments successfully",
		REVIEW_GET_ALL_FAILED: "Failed to fetch all reviews and comments",
		REVIEW_GET_BY_PRODUCT_SUCCESS: "Fetched reviews by product ID successfully",
		REVIEW_GET_BY_PRODUCT_FAILED: "Failed to fetch reviews by product ID",
		REVIEW_DELETE_SUCCESS: "Review deleted successfully",
		REVIEW_DELETE_FAILED: "Failed to delete review",

		// Comment
		COMMENT_CREATE_SUCCESS: "Comment added successfully",
		COMMENT_CREATE_FAILED: "Failed to add comment",
		COMMENT_UPDATE_SUCCESS: "Comment updated successfully",
		COMMENT_UPDATE_FAILED: "Failed to update comment",
		COMMENT_DELETE_SUCCESS: "Comment deleted or marked as deleted",
		COMMENT_DELETE_FAILED: "Failed to delete comment",
		COMMENT_NOT_FOUND: "Comment not found",
		UNAUTHORIZED_DELETE_COMMENT: "You are not authorized to delete this comment",

		// File Upload
		FILE_UPLOAD_SUCCESS: "File uploaded successfully",
		FILE_UPLOAD_FAILED: "File upload failed!",
		FILE_UPLOAD_NO_DATA: "No image data provided!",
		FILE_UPLOAD_LIMIT_EXCEEDED: `You can only upload up to ${MAX_FILE_UPLOAD} images!`,
		FILE_UPLOAD_INVALID_DATA: "Invalid image data!"
	},
	vi: {
		USER_CREATE_SUCCESS: "Tạo người dùng thành công",
		USER_CREATE_FAILED: "Tạo người dùng thất bại!",
		USER_GET_DETAILS_SUCCESS: "Lấy thông tin người dùng thành công",
		USER_GET_DETAILS_FAILED: "Lấy thông tin người dùng thất bại!",
		USER_LOGIN_SUCCESS: "Đăng nhập người dùng thành công",
		USER_LOGIN_FAILED: "Đăng nhập người dùng thất bại!",
		USER_UPDATE_SUCCESS: "Cập nhật người dùng thành công",
		USER_UPDATE_FAILED: "Cập nhật người dùng thất bại!",
		USER_GET_ALL_SUCCESS: "Lấy tất cả người dùng thành công",
		USER_GET_ALL_FAILED: "Lấy tất cả người dùng thất bại!",
		USER_DELETE_SUCCESS: "Xoá người dùng thành công",
		USER_DELETE_FAILED: "Xoá người dùng thất bại!",
		USER_LOGOUT_SUCCESS: "Đăng xuất thành công",
		USER_LOGOUT_FAILED: "Đăng xuất thất bại!",

		//Address
		ADDRESS_CREATE_SUCCESS: "Tạo địa chỉ thành công",
		ADDRESS_CREATE_FAILED: "Tạo địa chỉ thất bại!",
		ADDRESS_GET_DETAILS_SUCCESS: "Lấy thông tin địa chỉ thành công",
		ADDRESS_GET_DETAILS_FAILED: "Lấy thông tin địa chỉ thất bại!",
		ADDRESS_UPDATE_SUCCESS: "Cập nhật địa chỉ thành công",
		ADDRESS_UPDATE_FAILED: "Cập nhật địa chỉ thất bại!",
		ADDRESS_GET_ALL_SUCCESS: "Lấy tất cả địa chỉ thành công",
		ADDRESS_GET_ALL_FAILED: "Lấy tất cả địa chỉ thất bại!",
		ADDRESS_DELETE_SUCCESS: "Xoá địa chỉ thành công",
		ADDRESS_DELETE_FAILED: "Xoá địa chỉ thất bại!",

		//Cart
		CART_CREATE_SUCCESS: "Tạo giỏ hàng thành công",
		CART_CREATE_FAILED: "Tạo giỏ hàng thất bại!",
		CART_GET_DETAILS_SUCCESS: "Lấy thông tin giỏ hàng thành công",
		CART_GET_DETAILS_FAILED: "Lấy thông tin giỏ hàng thất bại!",
		CART_UPDATE_SUCCESS: "Cập nhật giỏ hàng thành công",
		CART_UPDATE_FAILED: "Cập nhật giỏ hàng thất bại!",
		CART_GET_ALL_SUCCESS: "Lấy tất cả giỏ hàng thành công",
		CART_GET_ALL_FAILED: "Lấy tất cả giỏ hàng thất bại!",
		CART_DELETE_SUCCESS: "Xoá giỏ hàng thành công",
		CART_DELETE_FAILED: "Xoá giỏ hàng thất bại!",

		// Review
		REVIEW_CREATE_SUCCESS: "Tạo đánh giá thành công",
		REVIEW_CREATE_FAILED: "Tạo đánh giá thất bại",
		REVIEW_UPDATE_SUCCESS: "Cập nhật đánh giá thành công",
		REVIEW_UPDATE_FAILED: "Cập nhật đánh giá thất bại",
		REVIEW_GET_ALL_SUCCESS: "Lấy tất cả đánh giá và bình luận thành công",
		REVIEW_GET_ALL_FAILED: "Lấy tất cả đánh giá và bình luận thất bại",
		REVIEW_GET_BY_PRODUCT_SUCCESS: "Lấy đánh giá theo ID sản phẩm thành công",
		REVIEW_GET_BY_PRODUCT_FAILED: "Lấy đánh giá theo ID sản phẩm thất bại",
		REVIEW_DELETE_SUCCESS: "Xoá đánh giá thành công",
		REVIEW_DELETE_FAILED: "Xoá đánh giá thất bại",

		// Comment
		COMMENT_CREATE_SUCCESS: "Thêm bình luận thành công",
		COMMENT_CREATE_FAILED: "Thêm bình luận thất bại",
		COMMENT_UPDATE_SUCCESS: "Cập nhật bình luận thành công",
		COMMENT_UPDATE_FAILED: "Cập nhật bình luận thất bại",
		COMMENT_DELETE_SUCCESS: "Xoá hoặc đánh dấu đã xoá bình luận",
		COMMENT_DELETE_FAILED: "Xoá bình luận thất bại",
		COMMENT_NOT_FOUND: "Không tìm thấy bình luận",
		UNAUTHORIZED_DELETE_COMMENT: "Bạn không có quyền xóa bình luận này",

		// File Upload
		FILE_UPLOAD_SUCCESS: "Tải lên tệp thành công",
		FILE_UPLOAD_FAILED: "Tải lên tệp thất bại!",
		FILE_UPLOAD_NO_DATA: "Không có dữ liệu hình ảnh!",
		FILE_UPLOAD_LIMIT_EXCEEDED: `Bạn chỉ có thể tải lên tối đa ${MAX_FILE_UPLOAD} hình ảnh!`,
		FILE_UPLOAD_INVALID_DATA: "Dữ liệu hình ảnh không hợp lệ!",
	},
};
