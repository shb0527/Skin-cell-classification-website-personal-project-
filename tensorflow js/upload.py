# file = ''
# iomyy
# cloudinary.uploader.unsigned_upload(file, upload_preset, **options

# https://pks2974.medium.com/file-api-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-729fa6a3a0ba
import os
file_path = 'C:/Users/user/Desktop/tensorflow js/images_for_assets_folder/Uninfected'
print(len(os.listdir(file_path)))
count = 0
for file in os.listdir(file_path):
    count += 1
print(count)