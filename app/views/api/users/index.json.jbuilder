json.array! @users do |user| 
    json.partial! 'api/users/user', user: user
    json.photoUrl user.photo.attached? ? user.photo.url : nil
end