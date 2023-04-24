export const actionType={
    CURRENT_USER:"CURRENT USER",
    SET_PRODUCT:"SET PRODUCT",
    SELECT_PRODUCT:"SELECT PRODUCT",
    FAST_DELIVERY:"FAST DELIVERY",
    SEARCH_TEXT:"SEARCH TEXT",
    CATEGORIES:"CATEGORIES",
    SET_CATEGORY:"SET CATEGORY" 
}

export function currentUser(user){
    return{
        type:actionType.CURRENT_USER,
        payload:user
    }
}
export function setProduct(products){
    return{
        type:actionType.SET_PRODUCT,
        payload:products
    }
}
export function selectProduct(product){
    return{
        type:actionType.SELECT_PRODUCT,
        payload:product
    }
}
export function setCategories(category){
    return{
        type:actionType.CATEGORIES,
        payload:category
    }
}
export function setCategory(category){
    return{
        type:actionType.SET_CATEGORY,
        payload:category
    }
}
export function fastDeliveryy(fast){
    return{
        type:actionType.FAST_DELIVERY,
        payload:fast
    }
}
export function searchItem(search){
    return{
        type:actionType.SEARCH_TEXT,
        payload:search
    }
}