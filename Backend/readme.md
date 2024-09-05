# to run the backend "npm run server"
# the backend server is running at port number 4000
# database username:kkausik11 and pass: 30071998

# 1. add a food item 'http://localhost:4000/api/food/add' -> post this endpoint will receive "name","description","price","category" as a string and also "image_file" that named as "image" in request object and in response it give us "success message" and a "message"

# 2. access the image that is within "uploads" folder, that is stored systimatically at the time of add image -> http://localhost:4000/images/file_name.extension

# 3. get all items at once(used at homepage)-> http://localhost:4000/api/food/list -> get -> in response we will get all items 

# 4. Remove a food_item -> http://localhost:4000/api/food/remove -> post -> this request will take the "_id" of a food item to remove the specific food -> in response it gives a "sucess message" and "message"

# 5. Register_a_user -> http://localhost:4000/api/user/register -> post -> this endpoint will receive "name","email","password" as string and in response it gives a "sucess message" and a "token" 
# if email already exist "user aleready exist"
# password should 8 chars long
# if not a valid email "email is not valid"

# 6. Login_user -> http://localhost:4000/api/user/login -> post -> request with "email","password"-> 
# in response it gives a "sucess message" and a "token"

# 7. ADD TO CART-> http://localhost:4000/api/cart/add -> post -> send login "token" in header and "itemId" in the body, get response "success message" and a "message"
# 8. Remove from Cart -> http://localhost:4000/api/cart/remove ->post -> send login "token" in header and "itemId" in the body, get response "success message" and a "message"
# 9. Get_all_the_cart_data_at_once -> http://localhost:4000/api/cart/get -> post -> send only the login "token" at the header setting key as "token:
# 10. Get_all_orders_of_specific_user ->
# 11. Fetch_all_orders_for_admin_panel ->
# 12. Update_order_status_For_admin ->
# 13. make an order -> http://localhost:4000/api/order/place -> post -> and pass the token in headers 
