export enum Permissions {
    // Permission Resources
    LIST_ALL_PERMISSIONS = "permission.list_all",
    GET_PERMISSION = "permission.get",
    ADD_PERMISSION = "permission.add",
    EDIT_PERMISSION = "permission.edit",
    EDIT_MANY_PERMISSIONS = "permission.edit_many",
    CHANGE_STATUS_PERMISSION = "permission.change_status",
    DELETE_PERMISSION = "permission.delete",
    DELETE_MANY_PERMISSIONS = "permission.delete_many",

    // Role Resources
    LIST_ALL_ROLES = "role.list_all",
    GET_ROLE = "role.get",
    ADD_ROLE = "role.add",
    EDIT_ROLE = "role.edit",
    EDIT_MANY_ROLES = "role.edit_many",
    CHANGE_STATUS_ROLE = "role.change_status",
    DELETE_ROLE = "role.delete",
    DELETE_MANY_ROLES = "role.delete_many",

    // User Resources
    LIST_ALL_USERS = "user.list_all",
    GET_USER = "user.get",
    ADD_USER = "user.add",
    EDIT_USER = "user.edit",
    EDIT_MANY_USERS = "user.edit_many",
    CHANGE_STATUS_USER = "user.change_status",

    // Access History Resources
    LIST_ALL_ACCESS_HISTORY = "access_history.list_all",
    
    // Banner Resources
    LIST_ALL_BANNERS = "banner.list_all",
    GET_BANNER = "banner.get",
    ADD_BANNER = "banner.add",
    EDIT_BANNER = "banner.edit",
    DELETE_BANNER = "banner.delete",
    CHANGE_STATUS_BANNER = "banner.change_status",
    
    // Product Resources
    LIST_ALL_PRODUCTS = "product.list_all",
    GET_PRODUCT = "product.get",
    ADD_PRODUCT = "product.add",
    EDIT_PRODUCT = "product.edit", 
    DELETE_PRODUCT = "product.delete",
    CHANGE_STATUS_PRODUCT = "product.change_status",
    
    // Cart Resources
    LIST_ALL_CARTS = "cart.list_all",
    GET_CART = "cart.get",
    ADD_CART_ITEM = "cart.add_item",
    EDIT_CART_ITEM = "cart.edit_item",
    REMOVE_CART_ITEM = "cart.remove_item",
    CLEAR_CART = "cart.clear",
    
    // Discount Resources
    LIST_ALL_DISCOUNTS = "discount.list_all",
    GET_DISCOUNT = "discount.get",
    ADD_DISCOUNT = "discount.add",
    EDIT_DISCOUNT = "discount.edit",
    DELETE_DISCOUNT = "discount.delete",
    CHANGE_STATUS_DISCOUNT = "discount.change_status",
    APPLY_DISCOUNT = "discount.apply",
}