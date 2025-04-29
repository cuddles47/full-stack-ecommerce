user =
{
    "_id": ObjectId(),
    "user_name": "string",  // Unique
    "password": "hashed string",
    "status": true,
    "detail_user": {
        "user_code": "string",
        "name": "string",
        "avatar": "string",
        "birth_day": "YYYY-MM-DD",
        "address": "string",
        "gender": "string"
    },
    "refresh_token": "string",
    "roles": [ObjectId()],
    "created_at": ISODate(),
    "updated_at": ISODate(),
    "created_by": ObjectId(),
    "updated_by": ObjectId()
}

roles =
{
    "_id": ObjectId(),
    "name": "string",
    "description": "string",
    "grant_all": boolean,
    "status": boolean,
    "permission_array": [ObjectId()],
    "created_at": ISODate(),
    "updated_at": ISODate(),
    "created_by": ObjectId(),
    "updated_by": ObjectId()
}
permissions = {
    "_id": ObjectId(),
    "permission_name": "string",
    "description": "string",
    "status": boolean,
    "created_at": ISODate(),
    "updated_at": ISODate(),
    "created_by": ObjectId(),
    "updated_by": ObjectId()
}
activity_logs = {
    "_id": ObjectId(),
    "user_name": "string",
    "http_method": "string",
    "function_name": "string",
    "api": "string",
    "ip_address": "string",
    "device_name": "string",
    "device_model": "string",
    "device_type": "string",
    "os_name": "string",
    "os_ver": "string",
    "os_type": "string",
    "browser_name": "string",
    "browser_ver": "string",
    "browser_type": "string",
    "miscellany": {
        "status": "string",
        "request_body": "string",
        "message": "string"
    }
}