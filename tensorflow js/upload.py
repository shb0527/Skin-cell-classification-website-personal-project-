# import os
# # os.getcwd()
# # collection = "C:/Users/user/Desktop/tensorflow js/images_for_assets_folder/parasite-removebg"
# # for i, filename in enumerate(os.listdir(collection)):
# #     os.rename("C:/Users/user/Desktop/tensorflow js/images_for_assets_folder/parasite-removebg/" + filename, "C:/Users/user/Desktop/tensorflow js/images_for_assets_folder/parasite-removebg/" + str(i) + ".jpg")


# from rembg import remove
# import cv2
# # input_path = 'C:/Users/user/Desktop/tensorflow js/images_for_assets_folder/Parasite/25.png'
# # output_path = 'C:/Users/user/Desktop/tensorflow js/images_for_assets_folder/removed_results/output.png'

# # input = cv2.imread(input_path)
# # output = remove(input)
# # cv2.imwrite(output_path, output)
# collection = "C:/Users/user/Desktop/tensorflow js/images_for_assets_folder/un_test"
# for i, file in enumerate(os.listdir(collection)):
#     output_path = 'C:/Users/user/Desktop/tensorflow js/images_for_assets_folder/uninfected_removed_results(test)/' +  str(i) + ".png"
  
#     input = cv2.imread(collection + '/'+file)
#     output = remove(input)
#     cv2.imwrite(output_path, output)


# from tensorflow.keras.preprocessing.image import ImageDataGenerator
# import tensorflow as tf
# train_datagen = ImageDataGenerator(rescale = 1./255)
# test_datagen = ImageDataGenerator(rescale = 1./255)
# import numpy as np
# from PIL import Image
# directory_train =  'C:/Users/user/Desktop/tensorflow js/images'

# # directory_valid = '../Suhyun/images2/ar3/birds/valid'
# # directory_test = '../Suhyun/images2/ar3/birds/test'
# train_dataset = train_datagen.flow_from_directory(batch_size=8,
#                                                  directory = directory_train,
#                                                  shuffle=True,
#                                                  target_size=(224, 224), 
#                                                  subset="training",
#                                                  class_mode='categorical')


# valid_dataset = train_datagen.flow_from_directory(batch_size=8,
#                                                  directory = directory_valid,
#                                                  shuffle=True,
#                                                  target_size=(224, 224), 
#                                                  subset="training",
#     
#                                              class_mode='categorical')
import os
import numpy as np
import cv2
import matplotlib.pyplot as plt
img = cv2.imread('C:/Users/user/Desktop/tensorflow js/images_for_assets_folder/Parasite/132.png')
# dft = cv2.dft(np.float32(img), flags=cv2.DFT_COMPLEX_OUTPUT)
# dft_shift = np.fft.fftshift(dft)

# magnitude_spectrum = 20 * np.log(cv2.magnitude(dft_shift[:, :, 0], dft_shift[:, :, 1]))

# plt.subplot(2, 2, 1), plt.imshow(img, cmap='gray')
# plt.title('Input Image'), plt.xticks([]), plt.yticks([])
# plt.subplot(2, 2, 2), plt.imshow(magnitude_spectrum, cmap='gray')
# plt.title('After FFT'), plt.xticks([]), plt.yticks([])
# plt.show()

# # Circular LPF mask, center circle is 1, remaining all zeros
# rows, cols = img.shape
# crow, ccol = int(rows / 2), int(cols / 2)

# mask = np.zeros((rows, cols, 2), np.uint8)
# r = 100
# center = [crow, ccol]
# x, y = np.ogrid[:rows, :cols]
# mask_area = (x - center[0]) ** 2 + (y - center[1]) ** 2 <= r*r
# mask[mask_area] = 1

# # apply mask and inverse DFT
# fshift = dft_shift * mask

# fshift_mask_mag = 2000 * np.log(cv2.magnitude(fshift[:, :, 0], fshift[:, :, 1]))

# f_ishift = np.fft.ifftshift(fshift)
# img_back = cv2.idft(f_ishift)
# img_back = cv2.magnitude(img_back[:, :, 0], img_back[:, :, 1])

# plt.subplot(2, 2, 1), plt.imshow(img, cmap='gray')
# plt.title('Input Image'), plt.xticks([]), plt.yticks([])
# plt.subplot(2, 2, 2), plt.imshow(magnitude_spectrum, cmap='gray')
# plt.title('After FFT'), plt.xticks([]), plt.yticks([])
# plt.subplot(2, 2, 3), plt.imshow(fshift_mask_mag, cmap='gray')
# plt.title('FFT + Mask'), plt.xticks([]), plt.yticks([])
# plt.subplot(2, 2, 4), plt.imshow(img_back, cmap='gray')
# plt.title('After FFT Inverse'), plt.xticks([]), plt.yticks([])
# plt.show()
# img_blur = cv2.GaussianBlur(img, (3,3),0)
# sobelx = cv2.Sobel(src=img_blur, ddepth = cv2.CV_64F, dx = 1, dy = 0, ksize = 5)
# print(sobelx.shape)
from PIL import Image
# output_path = 'C:/Users/user/Desktop/tensorflow js/sobel images/parasite_sobel/output2.png'

# # cv2.imwrite(output_path, sobelx)
# plt.subplot(2, 2, 1), plt.imshow(sobelx, cmap='gray')
collection = "C:/Users/user/Desktop/tensorflow js/images_for_assets_folder/Uninfected"
for i, file in enumerate(os.listdir(collection)):
    output_path = 'C:/Users/user/Desktop/tensorflow js/sobel images/Uninfected_sobel/' +  str(i) + ".png"
    input = cv2.imread(collection + '/'+file)
    img_blur = cv2.GaussianBlur(input, (3,3),0)
    sobelx = cv2.Sobel(src=img_blur, ddepth = cv2.CV_64F, dx = 1, dy = 0, ksize = 5)
    cv2.imwrite(output_path, sobelx)
  


# plt.show()