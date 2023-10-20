import services.services as serve

def get_paged_images_for_n_page(page_number):
    images = serve.get_paged_images(page_number)
    print(images)
    return images